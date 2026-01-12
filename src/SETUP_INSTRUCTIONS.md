# Local Setup Instructions

## Important: Profile Image Setup Required

The site currently uses Figma-specific image imports that won't work in a local environment. Follow these steps to set it up correctly:

## Step 1: Download Your Profile Image

1. **In Figma Make**, right-click on your profile image and select "Export" or "Download"
2. Save it as `profile.png` (or `.jpg`)
3. The image hash is: `1ac236e9226f9c05a21400fd39173611d03582ca`

## Step 2: Add Profile Image to Your Project

Create a `public` folder in your project root and place your profile image there:

```
your-project/
├── public/
│   └── profile.png    <- Place your image here
├── components/
├── App.tsx
└── ...
```

## Step 3: Update Image Imports

Replace the Figma asset imports with regular imports in these 3 files:

### 1. `/components/Navigation.tsx`

**Change line 5 from:**
```tsx
import profileImage from 'figma:asset/1ac236e9226f9c05a21400fd39173611d03582ca.png';
```

**To:**
```tsx
const profileImage = '/profile.png';
```

### 2. `/components/HeroSection.tsx`

**Change line 6 from:**
```tsx
import profileImage from 'figma:asset/1ac236e9226f9c05a21400fd39173611d03582ca.png';
```

**To:**
```tsx
const profileImage = '/profile.png';
```

### 3. `/components/ProfileDrawer.tsx`

**Change line 7 from:**
```tsx
import profileImage from 'figma:asset/1ac236e9226f9c05a21400fd39173611d03582ca.png';
```

**To:**
```tsx
const profileImage = '/profile.png';
```

## Step 4: Install Dependencies

```bash
npm install
```

## Step 5: Run Development Server

```bash
npm run dev
```

Your site will open at `http://localhost:5173` and look **exactly the same** as in Figma Make!

## Alternative: Use a Placeholder Image

If you don't have the profile image yet, you can use a placeholder:

```tsx
const profileImage = 'https://ui-avatars.com/api/?name=Khalil+Sabha&size=400&background=A8D5BA&color=1F2937';
```

## Summary of Changes Needed

| File | What to Change |
|------|----------------|
| `/components/Navigation.tsx` | Line 5: Replace figma:asset import |
| `/components/HeroSection.tsx` | Line 6: Replace figma:asset import |
| `/components/ProfileDrawer.tsx` | Line 7: Replace figma:asset import |
| `/public/profile.png` | Add your profile image here |

## Why These Changes Are Needed

- `figma:asset/...` is a Figma Make-specific feature
- Local development uses standard Vite build system
- Images need to be in `/public` folder or imported as regular modules

## After Setup

Once these changes are made, your site will:
- ✅ Look identical to Figma Make
- ✅ Work offline
- ✅ Support hot module replacement (instant updates)
- ✅ Be ready for deployment to Vercel, Netlify, etc.
