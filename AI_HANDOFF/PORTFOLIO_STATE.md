# Portfolio State

## Repository

GitHub repo:

`Khalilxorder/portfolio`

Branch updated:

`main`

Local app folder:

`C:\Users\khali\Documents\Codex\2026-05-11\take-my-portfolio-from-github-redesigna\portfolio`

## Current Project List

The grid is split into two sections, **Scientific** and **Commercial**, rendered as labeled rows.

### Scientific

1. Big Five Prediction, 2026
   - Link: `https://github.com/Khalilxorder/bigfive`
   - Description: The thesis project: predicting Big Five trait signals from written text with interpretable NLP.

2. SELF, 2024
   - Link: `https://my-bigfive-app.vercel.app/`
   - Description: A self-discovery platform with Big Five, cognitive, and narrative assessments - moving toward psyche mapping and life-event reorganization against ideal capacity.
   - Note: this is the live site formerly shown under the older Big Five assessment card. The site is already branded SELF.

3. Neural Memory Test, 2024
   - Link: `https://w-mtest.vercel.app/`
   - Description: A working-memory test with direct controls, scoring, and repeatable trials.

4. Binary Deconstructor, 2024
   - Link: `https://frontend-psi-three-13.vercel.app/`
   - Description: Audio deconstruction (stems, MIDI, tempo, chords). The live site runs in demo mode; full processing requires a local Python backend.

### Commercial

5. eXplore, 2026
   - Link: `/explore.html`
   - Description: Priority alerts and a focused feed for important AI releases and Iran/Qatar developments.

6. CSAI Voice Agent, 2026
   - Link: `/csai.html`
   - Description: A multilingual customer service voice agent with model-fit routing and monthly cost planning.

7. Scholarship Search Engine, 2024
   - Link: `https://scholarship-search.vercel.app/`
   - Description: A focused search workspace for discovering scholarships and comparing fit quickly.

8. Student Apartment, 2024
   - Link: `/student-apartment.html`
   - Description: AI-assisted owner uploads and student matching from video, photos, categories, and natural language.

## Removed

- `Your Food Now`
- private Drive link for eXplore
- blocked old Student Apartment Vercel link
- remote screenshot services:
  - `image.thum.io`
  - `screenshot.11ty.dev`

## Portfolio Files That Matter Most

- `src/App.tsx`
- `src/data/projects.ts`
- `src/styles/globals.css`
- `src/index.css`
- `index.html`
- `vercel.json`
- `public/csai.html`
- `public/explore.html`
- `public/student-apartment.html`
- `public/og-image.svg`
- `src/assets/project-shots/*.svg`

## Local Visual Assets

The portfolio imports local expressive SVG visuals instead of screenshot services:

- `explore-cover.svg`
- `csai-voice-agent.svg`
- `scholarship-search.svg`
- `self-cover.svg` (replaces the removed older assessment cover)
- `big-five-prediction.svg`
- `student-apartment-ai.svg`
- `memory-test.svg`
- `binary-deconstructor.svg`

## Current Behavior

- Cards are `<a>` links and the whole card is clickable.
- Cards open directly, not through a separate button.
- Internal project pages are static pages in `public`.
- The portfolio has Open Graph/Twitter metadata and a local share image.
- `vercel.json` no longer has the old catch-all rewrite that blocked static pages.

## Private Project Map

The portfolio now also has a private `/map` editor scaffold.

- Public `/` remains the quiet portfolio shown to the world.
- Private `/map` is the internal project map for drafts, editing text, toggling `published`, uploading images, and publishing the public list.
- `/map` is protected by basic auth through `middleware.ts`.
- Project data persists to Supabase through Vercel functions under `api/admin`.
- Images upload to Supabase Storage.
- The Publish action saves visible edits, reads only `published = true` projects from Supabase, regenerates `src/data/projects.ts`, and commits it to GitHub through the GitHub Contents API.

Files for the map:

- `src/pages/Home.tsx`
- `src/pages/Map.tsx`
- `src/App.tsx`
- `api/admin/projects.ts`
- `api/admin/upload.ts`
- `api/admin/publish.ts`
- `middleware.ts`
- `supabase/schema.sql`
- `AI_HANDOFF/MAP_SETUP.md`

Required deployment environment variables:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `MAP_PASSWORD`
- `GITHUB_TOKEN`
- `GITHUB_REPO_OWNER`
- `GITHUB_REPO_NAME`
- optional: `GITHUB_BRANCH`
- optional: `GITHUB_FILE_PATH`
