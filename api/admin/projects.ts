import { createClient } from '@jsr/supabase__supabase-js';

export const config = { runtime: 'edge' };

declare const process: {
  env: Record<string, string | undefined>;
};

type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  year: string;
  url: string;
  category: 'scientific' | 'commercial';
  published: boolean;
  position: number;
};

const CATEGORY_RANK: Record<Project['category'], number> = {
  scientific: 0,
  commercial: 1,
};

function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const categoryDelta = CATEGORY_RANK[a.category] - CATEGORY_RANK[b.category];
    if (categoryDelta !== 0) return categoryDelta;
    return a.position - b.position;
  });
}

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
  const supabase = admin();

  if (request.method === 'GET') {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('category', { ascending: true })
      .order('position', { ascending: true });
    if (error) return json({ error: error.message }, { status: 500 });
    return json({ projects: sortProjects((data ?? []) as Project[]) });
  }

  if (request.method === 'PUT') {
    const body = (await request.json()) as { project: Partial<Project> & { id: string } };
    if (!body.project?.id) return json({ error: 'id required' }, { status: 400 });
    const { data, error } = await supabase
      .from('projects')
      .upsert(body.project, { onConflict: 'id' })
      .select()
      .single();
    if (error) return json({ error: error.message }, { status: 500 });
    return json({ project: data });
  }

  if (request.method === 'DELETE') {
    const id = new URL(request.url).searchParams.get('id');
    if (!id) return json({ error: 'id required' }, { status: 400 });
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) return json({ error: error.message }, { status: 500 });
    return json({ ok: true });
  }

  return json({ error: 'method not allowed' }, { status: 405 });
}
