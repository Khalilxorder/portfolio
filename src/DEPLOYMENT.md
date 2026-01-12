# Deployment Guide for Vercel

This portfolio website is configured for seamless deployment on Vercel. Follow these steps to deploy your site.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Git repository with your project code (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)

2. **Import your project to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your Git provider and authorize Vercel
   - Choose the repository containing this portfolio

3. **Configure your project:**
   - **Framework Preset:** Vite (should be auto-detected)
   - **Build Command:** `npm run build` (already configured in vercel.json)
   - **Output Directory:** `dist` (already configured in vercel.json)
   - **Install Command:** `npm install` (already configured in vercel.json)

4. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy your site
   - You'll get a production URL (e.g., `your-project.vercel.app`)

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from your project directory:**
   ```bash
   vercel
   ```

4. **For production deployment:**
   ```bash
   vercel --prod
   ```

## Environment Variables

This project currently doesn't require environment variables. If you add any in the future (e.g., for analytics, APIs), you can set them in:

- **Vercel Dashboard:** Project Settings → Environment Variables
- **Vercel CLI:** Use `vercel env add` command

## Automatic Deployments

Once connected to your Git repository, Vercel automatically:

- **Production deployments:** Triggered by commits to your main/master branch
- **Preview deployments:** Triggered by commits to other branches and pull requests
- **Instant rollbacks:** Available from the Vercel dashboard

## Custom Domain

To add a custom domain:

1. Go to your project in Vercel Dashboard
2. Navigate to Settings → Domains
3. Add your domain and follow DNS configuration instructions
4. Vercel automatically provides SSL certificates

## Performance Optimizations

This project is already configured with:

- ✅ Static asset caching (31536000s for `/assets/*`)
- ✅ SPA routing fallback to `/index.html`
- ✅ Vite build optimizations
- ✅ Code splitting and tree shaking
- ✅ Source maps for debugging

## Build Verification

Before deploying, test your build locally:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json`
- Ensure Node.js version compatibility (v18+)
- Review build logs in Vercel dashboard

### 404 Errors on Refresh

- The `vercel.json` rewrite rule handles SPA routing
- If issues persist, check the "Rewrites" section in vercel.json

### Images Not Loading

- Ensure all image paths are relative or use the ImageWithFallback component
- Check that images are in the `public` folder or properly imported

## Files Required for Deployment

All essential files are included:

- ✅ `package.json` - Dependencies and scripts
- ✅ `vite.config.ts` - Vite configuration
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `index.html` - Entry HTML file
- ✅ `vercel.json` - Vercel configuration
- ✅ `.gitignore` - Git ignore rules
- ✅ `.eslintrc.cjs` - ESLint configuration

## Support

For issues specific to Vercel deployment, consult:
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)

---

**Last Updated:** November 1, 2025  
**Project:** KHALIL SABHA Portfolio Website
