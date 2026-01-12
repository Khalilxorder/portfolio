# KHALIL SABHA - Portfolio Website

A modern, responsive portfolio website showcasing UX case studies, UI design projects, and live web applications with a clean, Apple-inspired aesthetic.

## Design System

- **Main Background:** White (#FFFFFF)
- **Secondary Accent:** Soft Mint Green (#A8D5BA)
- **Highlights/CTAs:** Golden Yellow (#FFD700)
- **Typography:** System defaults with custom sizing in `styles/globals.css`

## Tech Stack

- **Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS v4.0
- **UI Components:** Shadcn/ui
- **Icons:** Lucide React
- **Build Tool:** Vite

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **pnpm** or **yarn** package manager

## Getting Started

### 1. Export from Figma Make

In Figma Make, look for the **Export** or **Download** button to download your project files as a ZIP file.

### 2. Extract the Project

Extract the downloaded ZIP file to your desired location on your local machine.

### 3. Install Dependencies

Open your terminal, navigate to the project directory, and install dependencies:

```bash
cd path/to/your/project

# Using npm
npm install

# Or using pnpm
pnpm install

# Or using yarn
yarn install
```

### 4. Start Development Server

Start the development server:

```bash
# Using npm
npm run dev

# Or using pnpm
pnpm dev

# Or using yarn
yarn dev
```

The site should now be running at `http://localhost:5173` (or another port if 5173 is taken).

## Project Structure

```
├── App.tsx                      # Main application component
├── components/                  # React components
│   ├── HeroSection.tsx         # Landing page hero
│   ├── Navigation.tsx          # Top navigation bar
│   ├── ProfileDrawer.tsx       # Side drawer with profile info
│   ├── ProjectCard.tsx         # Individual project cards
│   ├── ProjectModal.tsx        # Project detail modal
│   ├── ProjectSection.tsx      # Project listing sections
│   └── ui/                     # Shadcn/ui components
├── contexts/                    # React context providers
│   └── ThemeContext.tsx        # Theme management
├── data/                        # Data files
│   └── projects.ts             # Project information
├── styles/                      # Global styles
│   └── globals.css             # Tailwind config & custom styles
└── guidelines/                  # Design documentation
    └── Guidelines.md           # Design system guidelines
```

## Customization

### Update Profile Information

1. **Personal Info:** Edit your name and details in:
   - `/App.tsx` (Footer section)
   - `/components/Navigation.tsx`
   - `/components/HeroSection.tsx`
   - `/components/ProfileDrawer.tsx`

2. **Profile Photo:** Replace the profile image by updating the import path:
   ```tsx
   import profileImage from 'path/to/your/image.png';
   ```

### Add/Edit Projects

Edit `/data/projects.ts` to add or modify your projects:

```typescript
export const projects: Project[] = [
  {
    id: 'your-project-id',
    title: 'Your Project Name',
    description: 'Project description',
    category: 'UX Design',
    type: 'case-study', // or 'ui-project' or 'live-site'
    thumbnail: 'image-url',
    tags: ['Tag1', 'Tag2'],
    // ... other fields
  },
];
```

### Customize Colors

The color palette is defined using CSS variables in `/styles/globals.css`:

```css
--primary: your-color;
--secondary: your-color;
--accent: your-color;
```

### Modify Typography

Typography settings are in `/styles/globals.css`. Adjust font sizes, weights, and line heights there.

## Building for Production

When you're ready to deploy:

```bash
# Using npm
npm run build

# Or using pnpm
pnpm build

# Or using yarn
yarn build
```

This creates an optimized production build in the `dist` folder.

## Deployment 🚀

This portfolio is **optimized for Vercel** with all necessary configuration files included.

### Quick Deploy to Vercel (Recommended)

**Option 1: Via Vercel Dashboard**
1. Push your code to GitHub/GitLab/Bitbucket
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Click "Deploy" (auto-configured!)

**Option 2: Via Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Deployment Files Included ✅

All essential files are ready:
- ✅ `vercel.json` - Vercel configuration with SPA routing
- ✅ `.gitignore` - Git ignore rules
- ✅ `.nvmrc` - Node.js version (18)
- ✅ `.eslintrc.cjs` - Code quality checks
- ✅ `public/` - Favicon and assets

### Deployment Documentation

Comprehensive guides available:
- 📖 `/DEPLOYMENT.md` - Complete deployment instructions
- ✅ `/DEPLOYMENT_CHECKLIST.md` - Pre-deployment verification
- ⚡ `/QUICK_DEPLOY.md` - 3-step deployment guide
- 🔍 `/POST_DEPLOYMENT_VERIFICATION.md` - Post-deploy testing
- 📋 `/DEPLOYMENT_FILES_SUMMARY.md` - All deployment files explained

### Other Deployment Options

You can also deploy to:
- **Netlify** - [netlify.com](https://netlify.com)
- **GitHub Pages** - [pages.github.com](https://pages.github.com)
- **Cloudflare Pages** - [pages.cloudflare.com](https://pages.cloudflare.com)

**Note:** Vercel provides the best experience with automatic deployments, SSL, and edge network.

## Adding New Features

### Install Additional Packages

```bash
# Example: Add a new library
npm install package-name

# Example: Add a new Shadcn component
npx shadcn-ui@latest add [component-name]
```

### Create New Components

Create new `.tsx` files in `/components/` directory:

```tsx
// components/YourComponent.tsx
import React from 'react';

export function YourComponent() {
  return (
    <div>
      {/* Your component code */}
    </div>
  );
}
```

Then import and use in your app:

```tsx
import { YourComponent } from './components/YourComponent';
```

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically use the next available port.

### Module Not Found Errors

Clear your cache and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Image Import Issues

For images imported from Figma, you may need to:
1. Place images in a `/public` folder
2. Update import paths to reference the public folder
3. Or use absolute URLs for images hosted online

### Tailwind Classes Not Working

Ensure your `styles/globals.css` file includes:

```css
@import "tailwindcss";
```

## VS Code Recommended Extensions

- **ES7+ React/Redux/React-Native snippets** - For React snippets
- **Tailwind CSS IntelliSense** - For Tailwind class autocomplete
- **TypeScript Vue Plugin (Volar)** - For TypeScript support
- **Prettier** - For code formatting
- **ESLint** - For code linting

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint (if configured)
```

## Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Support

For issues or questions:
- Review the `/guidelines/Guidelines.md` for design system details
- Check the [Figma Make documentation](https://help.figma.com/)
- Consult the [React documentation](https://react.dev/)

## License

© 2024 KHALIL SABHA. All rights reserved.

---

**Built with Figma Make** - Designed and developed with passion for great user experiences.
