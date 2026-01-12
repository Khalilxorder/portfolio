# How to Add Your Live Websites

## Step-by-Step Guide

### 1. Open `/data/projects.ts`

### 2. Find the "Live Sites" section (around line 80-113)

### 3. Replace the example projects with your actual Vercel projects

## Example: Adding a Vercel Project

```typescript
{
  id: 'my-portfolio-site',  // Unique ID (use lowercase with dashes)
  title: 'Personal Portfolio Website',  // Your project name
  description: 'Modern portfolio built with Next.js 14, featuring smooth animations and responsive design.',
  image: 'https://images.unsplash.com/photo-1...',  // Screenshot URL (see below)
  tags: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
  year: '2024',
  type: 'live-site',  // Must be 'live-site' for Live Sites section
  liveUrl: 'https://khalil-portfolio.vercel.app',  // ← YOUR VERCEL URL
   repoUrl: 'https://github.com/khalilxorder/portfolio',  // ← YOUR GITHUB REPO
},
```

## What Each Field Does

| Field | Description | Required |
|-------|-------------|----------|
| `id` | Unique identifier (lowercase-with-dashes) | ✅ Yes |
| `title` | Project name shown on card | ✅ Yes |
| `description` | Brief description of the project | ✅ Yes |
| `image` | Screenshot/thumbnail URL | ✅ Yes |
| `tags` | Array of technologies used | ✅ Yes |
| `year` | Year completed | ✅ Yes |
| `type` | Must be `'live-site'` | ✅ Yes |
| `liveUrl` | Vercel or production URL | ✅ Yes |
| `repoUrl` | GitHub repository URL | ❌ Optional |

## Getting Your Vercel URL

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your project
3. Copy the production URL (e.g., `https://your-project.vercel.app`)
4. Paste it as the `liveUrl` value

## Getting a Screenshot for `image`

### Option 1: Take a Screenshot
1. Visit your live site
2. Take a full-page screenshot
3. Upload to a service like:
   - Imgur: https://imgur.com
   - Cloudinary: https://cloudinary.com
   - Or place in `/public/screenshots/` folder and use `/screenshots/my-site.png`

### Option 2: Use Unsplash (Placeholder)
Use a relevant Unsplash image temporarily:
```
https://images.unsplash.com/photo-...
```

## Complete Real Example

```typescript
export const projects: Project[] = [
  // ... other projects ...

  // Live Sites
  {
    id: 'food-delivery-app',
    title: 'Food Delivery Platform',
    description: 'Full-stack food delivery app with real-time order tracking, Stripe payments, and admin dashboard.',
    image: '/screenshots/food-delivery.png',  // Local screenshot
    tags: ['Next.js', 'TypeScript', 'Stripe', 'Supabase', 'Tailwind'],
    year: '2024',
    type: 'live-site',
    liveUrl: 'https://fooddelivery-app.vercel.app',
     repoUrl: 'https://github.com/khalilxorder/food-delivery',
  },
  {
    id: 'saas-dashboard',
    title: 'SaaS Analytics Dashboard',
    description: 'Analytics platform for SaaS companies with data visualization and reporting features.',
    image: 'https://images.unsplash.com/photo-1551650992-ee4fd47df41f',
    tags: ['React', 'Node.js', 'MongoDB', 'Recharts'],
    year: '2024',
    type: 'live-site',
    liveUrl: 'https://saas-analytics-khalil.vercel.app',
     repoUrl: 'https://github.com/khalilxorder/saas-analytics',
  },
  {
    id: 'blog-platform',
    title: 'Modern Blog Platform',
    description: 'Content management system with markdown support, SEO optimization, and dark mode.',
    image: '/screenshots/blog.png',
    tags: ['Next.js 14', 'MDX', 'Tailwind', 'SEO'],
    year: '2023',
    type: 'live-site',
    liveUrl: 'https://blog.khalilsabha.com',
    // No repoUrl - it's optional!
  },
];
```

## What Happens When You Click

When users click on a live site project:
1. **Project Modal opens** with project details
2. **"Visit Live Site" button** → Opens your Vercel URL in new tab
3. **"View Source Code" button** → Opens your GitHub repo (if provided)

## Testing Your Changes

After editing `/data/projects.ts`:
1. Save the file
2. The page will auto-reload (in dev mode)
3. Navigate to "Live Sites" section
4. Your new projects will appear!

## Pro Tips

✅ **Use high-quality screenshots** - First impressions matter!  
✅ **Keep descriptions concise** - 1-2 sentences max  
✅ **Tag relevant technologies** - Helps visitors understand your skills  
✅ **Test your links** - Make sure Vercel URLs work before adding  
✅ **Year is useful** - Shows your recent vs older work  

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Screenshot Tools**: https://www.screely.com (makes pretty screenshots)
- **Free Image Hosting**: https://imgur.com
