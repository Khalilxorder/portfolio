import { createClient } from '@jsr/supabase__supabase-js';

export const config = { runtime: 'edge' };

declare const process: {
  env: Record<string, string | undefined>;
};

const BUCKET = 'project-images';

function admin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase server env vars missing');
  return createClient(url, key, { auth: { persistSession: false } });
}

function json(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) },
  });
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'method not allowed' }, { status: 405 });
  }

  const form = await request.formData();
  const file = form.get('file');
  const projectId = form.get('project_id');

  if (!(file instanceof File)) {
    return json({ error: 'file required' }, { status: 400 });
  }
  if (typeof projectId !== 'string' || !projectId) {
    return json({ error: 'project_id required' }, { status: 400 });
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'png';
  const safeExt = /^[a-z0-9]{1,5}$/.test(ext) ? ext : 'png';
  const path = `${projectId}-${Date.now()}.${safeExt}`;

  const supabase = admin();
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: true });

  if (uploadError) return json({ error: uploadError.message }, { status: 500 });

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  const publicUrl = data.publicUrl;

  const { error: updateError } = await supabase
    .from('projects')
    .update({ image_url: publicUrl })
    .eq('id', projectId);
  if (updateError) return json({ error: updateError.message }, { status: 500 });

  return json({ url: publicUrl });
}
