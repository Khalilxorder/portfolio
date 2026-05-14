# Project Map (/map) Setup Guide

The portfolio now has a private editor at `/map`.

It is protected by one password, reads and writes projects to Supabase, uploads project images to Supabase Storage, and has a **Publish to GitHub** button. Publishing regenerates `src/data/projects.ts`, commits it through the GitHub API, and lets Vercel rebuild the public portfolio.

## Files Added Or Changed

- `portfolio/supabase/schema.sql` - DB table, storage bucket, RLS policy, seed data.
- `portfolio/middleware.ts` - Vercel Routing Middleware, basic auth for `/map` and `/api/admin/*`.
- `portfolio/api/admin/projects.ts` - Edge function: GET, PUT, DELETE projects.
- `portfolio/api/admin/upload.ts` - Edge function: upload image to Supabase Storage.
- `portfolio/api/admin/publish.ts` - Edge function: read published projects and commit `src/data/projects.ts` through GitHub.
- `portfolio/src/pages/Home.tsx` - public portfolio view.
- `portfolio/src/pages/Map.tsx` - private editor UI plus Publish button.
- `portfolio/src/App.tsx` - URL switch: `/map*` renders Map, everything else renders Home.
- `portfolio/vercel.json` - rewrite `/map*` to `index.html`.
- `portfolio/src/styles/globals.css` - `/map` editor styles.

## One-Time Setup

### 1. Supabase

1. Create a Supabase project at https://supabase.com.
2. Open the SQL editor.
3. Run all of `portfolio/supabase/schema.sql`.
4. Verify Storage has a public bucket named `project-images`.

### 2. Vercel Environment Variables

In the portfolio Vercel project, add:

| Name | Value | Notes |
|---|---|---|
| `SUPABASE_URL` | Supabase project URL | Server-only |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Server-only, never expose |
| `MAP_PASSWORD` | Your private `/map` password | Username can be anything |
| `GITHUB_TOKEN` | GitHub token | Fine-grained token is best |
| `GITHUB_REPO_OWNER` | `Khalilxorder` | Adjust if repo owner differs |
| `GITHUB_REPO_NAME` | `portfolio` | Adjust if repo name differs |
| `GITHUB_BRANCH` | `main` | Optional, defaults to `main` |
| `GITHUB_FILE_PATH` | `src/data/projects.ts` | Optional, defaults to this |

Create the GitHub token at https://github.com/settings/tokens. Prefer a fine-grained token scoped only to the portfolio repo with **Contents: read and write**.

Do not add `VITE_SUPABASE_*`; the public portfolio does not read Supabase in the browser.

## Deploy

```powershell
git add -A
git commit -m "portfolio: add project map editor and publish flow"
git push origin main
```

Vercel should rebuild automatically after the push.

## Using /map

1. Visit `https://<your-portfolio>.vercel.app/map`.
2. Enter any username and the `MAP_PASSWORD`.
3. Edit project text, URL, category, date, position, published state, or image.
4. Click **Save** on a project to persist it to Supabase.
5. Click **Publish to GitHub** to save all visible rows, commit only `published=true` rows to `src/data/projects.ts`, and trigger Vercel rebuild.

Drafts stay in Supabase and are not committed to the public portfolio.

## Publish Behavior

The publish endpoint:

1. Reads `published=true` projects from Supabase.
2. Sorts Scientific first, then Commercial, each by `position`.
3. Regenerates `src/data/projects.ts`.
4. Preserves local SVG cover imports for the original known projects.
5. Uses `image_url` for uploaded/new projects.
6. Gets the existing GitHub file SHA.
7. Commits the new file with `portfolio: publish from /map (N projects)`.

## Test Plan

1. `/` loads the public portfolio with Scientific and Commercial sections.
2. `/map` prompts for password.
3. Wrong password returns 401.
4. Correct password loads the editor.
5. Editing a project and clicking Save persists after reload.
6. Uploading an image writes a Supabase Storage URL back to that project.
7. Toggling Published off and clicking Publish removes it from the public site after Vercel rebuilds.
8. Adding a draft with `published=false` keeps it private.
9. Adding a project with `published=true` and an `image_url` publishes it on the next publish.

## Notes

- If `@jsr/supabase__supabase-js` fails in Vercel Edge Functions, switch the API imports to `@supabase/supabase-js` and add that package.
- Edge `request.formData()` has upload size limits. For large screenshots, use smaller images or switch upload to a Node runtime/signed upload flow later.
- The generated public file contains only published projects. `/map` remains the full source of truth.
