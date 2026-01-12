# Quick Deploy Guide 🚀

## Prerequisites
- Node.js 18+ installed
- npm 9+ installed
- Git repository set up

## Deploy in 3 Steps

### 1️⃣ Test Locally
```bash
npm install
npm run build
npm run preview
```
✅ Verify everything works at `http://localhost:4173`

### 2️⃣ Push to Git
```bash
git add .
git commit -m "Deploy portfolio"
git push origin main
```

### 3️⃣ Deploy to Vercel
Visit [vercel.com/new](https://vercel.com/new) and import your repository.

**OR** use Vercel CLI:
```bash
npm install -g vercel
vercel login
vercel --prod
```

## That's it! ✨

Your portfolio will be live at `https://your-project.vercel.app`

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server at localhost:5173

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Check for code issues
```

## Quick Troubleshooting

**Build fails?**
- Run `npm install` to ensure all dependencies are installed
- Check Node version: `node --version` (should be 18+)

**Images not loading?**
- Check paths in `/data/projects.ts`
- Ensure using `ImageWithFallback` component for new images

**404 on refresh?**
- Already handled by `vercel.json` rewrites config ✅

---

Need help? Check `/DEPLOYMENT.md` for detailed instructions.
