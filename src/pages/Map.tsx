import React, { useEffect, useState } from 'react';

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

type Status = { kind: 'idle' | 'saving' | 'saved' | 'error'; text?: string };

const EMPTY_ROW = (): ProjectRow => ({
  id: '',
  title: '',
  description: '',
  image_url: null,
  year: new Date().getFullYear().toString(),
  url: '',
  category: 'commercial',
  published: false,
  position: 0,
});

export default function Map() {
  const [rows, setRows] = useState<ProjectRow[] | null>(null);
  const [draftRow, setDraftRow] = useState<ProjectRow>(EMPTY_ROW());
  const [status, setStatus] = useState<Record<string, Status>>({});
  const [loadError, setLoadError] = useState<string | null>(null);
  const [publishStatus, setPublishStatus] = useState<Status>({ kind: 'idle' });

  useEffect(() => {
    fetch('/api/admin/projects')
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return (await r.json()) as { projects: ProjectRow[] };
      })
      .then((body) => setRows(body.projects))
      .catch((e) => setLoadError(String(e?.message ?? e)));
  }, []);

  function setStatusFor(id: string, next: Status) {
    setStatus((prev) => ({ ...prev, [id]: next }));
    if (next.kind === 'saved') {
      setTimeout(() => setStatus((prev) => ({ ...prev, [id]: { kind: 'idle' } })), 1500);
    }
  }

  function patchRow(id: string, patch: Partial<ProjectRow>) {
    setRows((prev) => prev?.map((r) => (r.id === id ? { ...r, ...patch } : r)) ?? prev);
  }

  async function saveRow(row: ProjectRow): Promise<boolean> {
    setStatusFor(row.id, { kind: 'saving' });
    try {
      const resp = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project: row }),
      });
      if (!resp.ok) throw new Error(await resp.text());
      setStatusFor(row.id, { kind: 'saved' });
      return true;
    } catch (e: unknown) {
      setStatusFor(row.id, { kind: 'error', text: String((e as Error)?.message ?? e) });
      return false;
    }
  }

  async function deleteRow(id: string) {
    if (!confirm('Delete this project?')) return;
    const resp = await fetch(`/api/admin/projects?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    if (resp.ok) {
      setRows((prev) => prev?.filter((r) => r.id !== id) ?? prev);
    }
  }

  async function uploadImage(id: string, file: File) {
    setStatusFor(id, { kind: 'saving' });
    const form = new FormData();
    form.append('file', file);
    form.append('project_id', id);
    try {
      const resp = await fetch('/api/admin/upload', { method: 'POST', body: form });
      if (!resp.ok) throw new Error(await resp.text());
      const body = (await resp.json()) as { url: string };
      patchRow(id, { image_url: body.url });
      setStatusFor(id, { kind: 'saved' });
    } catch (e: unknown) {
      setStatusFor(id, { kind: 'error', text: String((e as Error)?.message ?? e) });
    }
  }

  async function addRow() {
    if (!draftRow.id || !draftRow.title) {
      alert('id and title are required');
      return;
    }
    const saved = await saveRow(draftRow);
    if (!saved) return;
    setRows((prev) => (prev ? [...prev, draftRow] : [draftRow]));
    setDraftRow(EMPTY_ROW());
  }

  async function publish() {
    if (!rows) return;
    if (!confirm('Publish to GitHub? This commits projects.ts and triggers a Vercel rebuild.')) return;
    setPublishStatus({ kind: 'saving' });
    try {
      const saveResults = await Promise.all(rows.map((row) => saveRow(row)));
      if (saveResults.some((ok) => !ok)) {
        throw new Error('One or more projects failed to save before publishing.');
      }
      const resp = await fetch('/api/admin/publish', { method: 'POST' });
      if (!resp.ok) throw new Error(await resp.text());
      const body = (await resp.json()) as { count: number; commit_url?: string };
      setPublishStatus({
        kind: 'saved',
        text: `${body.count} published${body.commit_url ? ` - ${body.commit_url}` : ''}`,
      });
    } catch (e: unknown) {
      setPublishStatus({ kind: 'error', text: String((e as Error)?.message ?? e) });
    }
  }

  if (loadError) {
    return (
      <main className="map-shell">
        <h1>Project Map</h1>
        <p className="map-error">Failed to load: {loadError}</p>
      </main>
    );
  }

  if (!rows) {
    return (
      <main className="map-shell">
        <h1>Project Map</h1>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="map-shell">
      <header className="map-header">
        <h1>Project Map</h1>
        <div className="map-header-actions">
          <button
            type="button"
            className="map-publish"
            onClick={publish}
            disabled={publishStatus.kind === 'saving'}
          >
            {publishStatus.kind === 'saving' ? 'Publishing...' : 'Publish to GitHub'}
          </button>
          <a href="/">Back to public site</a>
        </div>
      </header>

      <p className="map-hint">
        Edits are saved when you click <strong>Save</strong>. Toggle <strong>Published</strong> per
        project, then click <strong>Publish to GitHub</strong> to update the public site and trigger
        a Vercel rebuild.
      </p>

      {publishStatus.kind !== 'idle' && (
        <p className={`map-status map-status-${publishStatus.kind}`}>
          {publishStatus.kind === 'saving' && 'Committing...'}
          {publishStatus.kind === 'saved' && publishStatus.text}
          {publishStatus.kind === 'error' && `Publish failed: ${publishStatus.text}`}
        </p>
      )}

      <div className="map-list">
        {rows.map((row) => {
          const rowStatus = status[row.id] ?? { kind: 'idle' as const };
          return (
            <article key={row.id} className={`map-row${row.published ? '' : ' is-draft'}`}>
              <div className="map-row-head">
                <span className="map-id">{row.id}</span>
                <label className="map-pub">
                  <input
                    type="checkbox"
                    checked={row.published}
                    onChange={(e) => patchRow(row.id, { published: e.target.checked })}
                  />
                  Published
                </label>
              </div>

              <div className="map-grid">
                <label>
                  Title
                  <input
                    value={row.title}
                    onChange={(e) => patchRow(row.id, { title: e.target.value })}
                  />
                </label>
                <label>
                  Year
                  <input
                    value={row.year}
                    onChange={(e) => patchRow(row.id, { year: e.target.value })}
                  />
                </label>
                <label>
                  Category
                  <select
                    value={row.category}
                    onChange={(e) => patchRow(row.id, { category: e.target.value as Category })}
                  >
                    <option value="scientific">scientific</option>
                    <option value="commercial">commercial</option>
                  </select>
                </label>
                <label>
                  Position
                  <input
                    type="number"
                    value={row.position}
                    onChange={(e) => patchRow(row.id, { position: Number(e.target.value) })}
                  />
                </label>
                <label className="map-grid-wide">
                  URL
                  <input
                    value={row.url}
                    onChange={(e) => patchRow(row.id, { url: e.target.value })}
                  />
                </label>
                <label className="map-grid-wide">
                  Description
                  <textarea
                    rows={2}
                    value={row.description}
                    onChange={(e) => patchRow(row.id, { description: e.target.value })}
                  />
                </label>
                <label className="map-grid-wide">
                  Image URL
                  <input
                    value={row.image_url ?? ''}
                    onChange={(e) => patchRow(row.id, { image_url: e.target.value || null })}
                    placeholder="https://... or upload below"
                  />
                </label>
                <label className="map-grid-wide">
                  Upload image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadImage(row.id, f);
                    }}
                  />
                </label>
              </div>

              <div className="map-row-actions">
                <button type="button" onClick={() => saveRow(row)}>Save</button>
                <button type="button" className="map-danger" onClick={() => deleteRow(row.id)}>
                  Delete
                </button>
                <span className={`map-status map-status-${rowStatus.kind}`}>
                  {rowStatus.kind === 'saving' && 'Saving...'}
                  {rowStatus.kind === 'saved' && 'Saved'}
                  {rowStatus.kind === 'error' && `Error: ${rowStatus.text}`}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      <section className="map-add">
        <h2>Add new project</h2>
        <div className="map-grid">
          <label>
            ID (slug)
            <input
              value={draftRow.id}
              onChange={(e) => setDraftRow({ ...draftRow, id: e.target.value })}
              placeholder="e.g. new-thing"
            />
          </label>
          <label>
            Title
            <input
              value={draftRow.title}
              onChange={(e) => setDraftRow({ ...draftRow, title: e.target.value })}
            />
          </label>
          <label>
            Year
            <input
              value={draftRow.year}
              onChange={(e) => setDraftRow({ ...draftRow, year: e.target.value })}
            />
          </label>
          <label>
            Category
            <select
              value={draftRow.category}
              onChange={(e) => setDraftRow({ ...draftRow, category: e.target.value as Category })}
            >
              <option value="scientific">scientific</option>
              <option value="commercial">commercial</option>
            </select>
          </label>
          <label className="map-grid-wide">
            URL
            <input
              value={draftRow.url}
              onChange={(e) => setDraftRow({ ...draftRow, url: e.target.value })}
            />
          </label>
          <label className="map-grid-wide">
            Description
            <textarea
              rows={2}
              value={draftRow.description}
              onChange={(e) => setDraftRow({ ...draftRow, description: e.target.value })}
            />
          </label>
        </div>
        <button type="button" onClick={addRow}>Add</button>
      </section>
    </main>
  );
}
