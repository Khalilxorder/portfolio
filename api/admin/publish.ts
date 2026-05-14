import { createClient } from '@jsr/supabase__supabase-js';

export const config = { runtime: 'edge' };

declare const process: {
  env: Record<string, string | undefined>;
};

type Category = 'scientific' | 'commercial';

interface ProjectRow {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  year: string;
  url: string;
  category: Category;
  published: boolean;
  position: number;
}

const KNOWN_COVER_IMPORTS: Record<string, string> = {
  'explore': 'exploreCover',
  'big-five-prediction': 'bigFivePredictionCover',
  'student-apartment': 'studentApartmentAiCover',
  'csai-voice-agent': 'csaiVoiceAgentCover',
  'scholarship-search': 'scholarshipSearchCover',
  'self': 'selfCover',
  'working-memory-test': 'memoryTestCover',
  'binary-deconstructor': 'binaryDeconstructorCover',
};

const CATEGORY_RANK: Record<Category, number> = {
  scientific: 0,
  commercial: 1,
};

const IMPORT_LINES = `import exploreCover from '../assets/project-shots/explore-cover.svg';
import bigFivePredictionCover from '../assets/project-shots/big-five-prediction.svg';
import studentApartmentAiCover from '../assets/project-shots/student-apartment-ai.svg';
import csaiVoiceAgentCover from '../assets/project-shots/csai-voice-agent.svg';
import scholarshipSearchCover from '../assets/project-shots/scholarship-search.svg';
import selfCover from '../assets/project-shots/self-cover.svg';
import memoryTestCover from '../assets/project-shots/memory-test.svg';
import binaryDeconstructorCover from '../assets/project-shots/binary-deconstructor.svg';`;

function esc(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r/g, '').replace(/\n/g, '\\n');
}

function renderFile(projects: ProjectRow[]): string {
  const sorted = [...projects].sort((a, b) => {
    const categoryDelta = CATEGORY_RANK[a.category] - CATEGORY_RANK[b.category];
    if (categoryDelta !== 0) return categoryDelta;
    return a.position - b.position;
  });

  const items = sorted
    .map((p) => {
      const cover = KNOWN_COVER_IMPORTS[p.id];
      const imageExpr = p.image_url
        ? `'${esc(p.image_url)}'`
        : cover ?? `''`;
      return `  {
    id: '${esc(p.id)}',
    title: '${esc(p.title)}',
    description: '${esc(p.description)}',
    image: ${imageExpr},
    year: '${esc(p.year)}',
    url: '${esc(p.url)}',
    category: '${p.category}',
  },`;
    })
    .join('\n');

  return `${IMPORT_LINES}

export type ProjectCategory = 'scientific' | 'commercial';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  year: string;
  url: string;
  category: ProjectCategory;
}

export const projects: Project[] = [
${items}
];

export const categoryLabels: Record<ProjectCategory, string> = {
  scientific: 'Scientific',
  commercial: 'Commercial',
};
`;
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

function b64encode(s: string): string {
  // btoa requires latin-1; use TextEncoder + Uint8Array for utf-8 safety.
  const bytes = new TextEncoder().encode(s);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'method not allowed' }, { status: 405 });
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const branch = process.env.GITHUB_BRANCH ?? 'main';
  const path = process.env.GITHUB_FILE_PATH ?? 'src/data/projects.ts';

  if (!token || !owner || !repo) {
    return json(
      { error: 'GITHUB_TOKEN, GITHUB_REPO_OWNER, GITHUB_REPO_NAME required' },
      { status: 503 },
    );
  }

  const supabase = admin();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('category', { ascending: true })
    .order('position', { ascending: true });

  if (error) return json({ error: error.message }, { status: 500 });

  const fileContent = renderFile((data ?? []) as ProjectRow[]);

  const ghBase = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const ghHeaders = {
    Authorization: `Bearer ${token}`,
    'User-Agent': 'portfolio-map-publisher',
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  const getResp = await fetch(`${ghBase}?ref=${encodeURIComponent(branch)}`, {
    headers: ghHeaders,
  });

  let sha: string | undefined;
  if (getResp.status === 200) {
    const file = (await getResp.json()) as { sha: string };
    sha = file.sha;
  } else if (getResp.status !== 404) {
    return json(
      { error: `github GET failed: ${getResp.status} ${await getResp.text()}` },
      { status: 502 },
    );
  }

  const putResp = await fetch(ghBase, {
    method: 'PUT',
    headers: { ...ghHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `portfolio: publish from /map (${data?.length ?? 0} projects)`,
      content: b64encode(fileContent),
      branch,
      sha,
    }),
  });

  if (!putResp.ok) {
    return json(
      { error: `github PUT failed: ${putResp.status} ${await putResp.text()}` },
      { status: 502 },
    );
  }

  const commit = (await putResp.json()) as { commit?: { sha?: string; html_url?: string } };
  return json({
    ok: true,
    count: data?.length ?? 0,
    commit_sha: commit.commit?.sha,
    commit_url: commit.commit?.html_url,
  });
}
