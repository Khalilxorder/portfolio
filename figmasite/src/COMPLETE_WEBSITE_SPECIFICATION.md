# KHALIL SABHA Portfolio - Complete Website Specification

## 📋 Overview

A modern, responsive portfolio website showcasing UX case studies, UI design projects, and live web applications with a clean, Apple-inspired aesthetic. Built with React, TypeScript, and Tailwind CSS v4.0.

---

## 🎨 Design System

### Color Palette

**Light Mode (Primary):**
- **Main Background:** `#FFFFFF` (White)
- **Primary (CTA/Highlights):** `#FFD700` (Golden Yellow)
- **Secondary (Accent):** `#A8D5BA` (Soft Mint Green)
- **Foreground Text:** `#1C1C1C` (Dark Gray)
- **Muted Background:** `#F5F5F5` (Light Gray)
- **Muted Foreground:** `#6B7280` (Medium Gray)
- **Border:** `#E5E7EB` (Light Border Gray)
- **Destructive:** `#EF4444` (Red)

**Dark Mode:**
- Uses OKLCH color space for perceptually uniform colors
- Background: Very dark gray (almost black)
- Foreground: Near white
- Primary/Secondary adapted for dark mode

### Typography System

**Base Settings:**
- Base font size: `16px`
- Font weights: Normal (400), Medium (500)
- Line height: `1.5` for all text elements

**Hierarchy (DO NOT override with Tailwind classes unless requested):**
- `h1`: `text-2xl`, medium weight
- `h2`: `text-xl`, medium weight  
- `h3`: `text-lg`, medium weight
- `h4`: `text-base`, medium weight
- `p`: `text-base`, normal weight
- `label`: `text-base`, medium weight
- `button`: `text-base`, medium weight
- `input`: `text-base`, normal weight

**IMPORTANT:** Typography is defined in `styles/globals.css` - do NOT add Tailwind font size/weight classes unless explicitly requested.

### Spacing & Layout

- Border radius: `0.625rem` (10px) base
- Responsive breakpoints:
  - **Desktop:** 1440px container
  - **Tablet:** 1024px viewport
  - **Mobile:** 390px viewport
- All components use Auto Layout patterns (flexbox/grid)

### Component Styling Patterns

**Cards:**
- White background (`bg-card`)
- Border (`border border-border`)
- Rounded corners (`rounded-2xl`)
- Hover: Scale transform (`hover:scale-[1.02]`), border color change, shadow

**Buttons:**
- **Primary:** Golden yellow background, dark text
- **Secondary/Outline:** Border with transparent bg, hover mint green
- Consistent hover states with smooth transitions

**Badges:**
- Small, rounded chips
- Secondary variant: Mint green background
- Used for tags/categories

---

## 🏗️ Architecture & File Structure

### Core Application Structure

```
App.tsx (Main component)
├── ThemeProvider (Context wrapper)
├── Navigation (Sticky top nav)
├── Main Content (Conditional sections)
│   ├── HeroSection
│   ├── ProjectSection (UX Case Studies)
│   ├── ProjectSection (UI Projects)
│   └── ProjectSection (Live Sites)
├── ProfileDrawer (Side panel)
├── ProjectModal (Detail modals)
└── Footer (Home page only)
```

### State Management

**App.tsx manages:**
- `activeSection`: 'home' | 'ux-case-studies' | 'ui-projects' | 'live-sites'
- `isProfileOpen`: boolean
- `selectedProject`: Project | null
- `isProjectModalOpen`: boolean

**Navigation Pattern:**
- Section changes trigger smooth scroll to top
- Escape key closes modals
- Body scroll prevented when modals open

### Data Structure

**Project Interface** (`/components/ProjectCard.tsx`):
```typescript
interface Project {
  id: string;                    // Unique identifier
  title: string;                 // Project name
  description: string;           // Brief description
  image: string;                 // Thumbnail URL
  tags: string[];               // Tech stack/skills
  year: string;                 // Year completed
  type: 'case-study' | 'ui-project' | 'live-site';
  liveUrl?: string;             // Production URL (for live-sites)
  repoUrl?: string;             // GitHub repo (for live-sites)
}
```

**Projects Data** (`/data/projects.ts`):
- Single array of all projects
- Filtered by `type` in App.tsx:
  - `caseStudies = projects.filter(p => p.type === 'case-study')`
  - `uiProjects = projects.filter(p => p.type === 'ui-project')`
  - `liveSites = projects.filter(p => p.type === 'live-site')`

---

## 📦 Components Catalog

### Main Components (`/components`)

#### 1. **Navigation.tsx**
- Sticky top navigation bar
- Logo/name clickable (returns to home)
- Center nav items (Desktop) / Bottom nav (Mobile)
- Profile avatar button (right aligned)
- Active section indicator with underline
- Props: `activeSection`, `onSectionChange`, `onProfileClick`

#### 2. **HeroSection.tsx**
- Large hero with two-column layout
- Left: Heading with gradient text, description, CTAs
- Right: Large profile avatar with glow effect
- Scroll indicator with bounce animation
- Three navigation cards grid (links to main sections)
- Props: `onSectionChange`

#### 3. **ProjectSection.tsx**
- Section wrapper for all project types
- Title, description, back button
- Grid of ProjectCard components (3 col → 2 col → 1 col responsive)
- Props: `title`, `description`, `projects`, `sectionId`, `onProjectClick`, `onBackClick`

#### 4. **ProjectCard.tsx**
- **Three variants based on `project.type`:**

**Case Study Card:**
- 16:10 aspect ratio image
- Title, description
- Tags (max 3 visible) + year
- Hover: scale + border glow
- Arrow icon (top right)

**UI Project Card:**
- Square aspect ratio image
- Overlay on hover: "View Gallery"
- Title at bottom
- Tags (max 2) + year
- Gradient overlay effect

**Live Site Card:**
- 16:9 aspect ratio image
- Title, description
- Two action buttons: "Open Live", "View Code"
- Tags (max 3) + year
- Buttons stop propagation (don't trigger modal)

#### 5. **ProjectModal.tsx**
- **Three modal types based on `project.type`:**

**UI Project Modal:**
- Full-screen image gallery
- Navigation arrows (left/right)
- Thumbnail strip at bottom
- Image counter overlay
- Max width: `max-w-5xl`

**Case Study Modal:**
- Structured case study format
- Sections: Overview, Details, Process (4 steps), Skills/Tools
- Scrollable content
- Sticky header with back button
- Max width: `max-w-4xl`

**Live Site Modal:**
- Project description
- Action buttons: "Visit Live Site", "View Source Code"
- Details panel (Year, Status)
- Technologies list
- Max width: `max-w-4xl`

#### 6. **ProfileDrawer.tsx**
- Side sheet (right)
- Profile section: Avatar, name, title, bio
- Action buttons: Download Resume, Email, LinkedIn, GitHub
- Skills & Tools sections (Design, Development, Research)
- Width: `400px` mobile, `540px` desktop

### UI Components (`/components/ui`)

**Shadcn/ui library** - Pre-built accessible components:
- `accordion`, `alert-dialog`, `alert`, `avatar`, `badge`, `button`, `card`, `carousel`, `checkbox`, `dialog`, `drawer`, `dropdown-menu`, `form`, `input`, `label`, `popover`, `progress`, `scroll-area`, `select`, `separator`, `sheet`, `skeleton`, `slider`, `switch`, `table`, `tabs`, `textarea`, `tooltip`

**Custom:**
- `ImageWithFallback.tsx` - Image component with error handling

---

## 🔄 User Flows

### 1. Landing (Home Section)
1. User sees hero with profile
2. Scrolls to see three section cards
3. Clicks a section card → navigates to that section

### 2. Browsing Projects
1. From hero, clicks "View My Work" or section card
2. Sees grid of project cards
3. Clicks card → opens ProjectModal
4. In modal, can view details/gallery
5. Clicks "Visit Live Site" (live-sites) → opens in new tab
6. Closes modal → returns to grid
7. Clicks back button → returns to home

### 3. Profile Access
1. Clicks avatar (top right nav)
2. ProfileDrawer slides in from right
3. Can download resume, visit social links
4. Closes drawer (X button or outside click)

### 4. Navigation
1. Clicks nav item → changes section
2. Page scrolls to top smoothly
3. Active section indicated with underline

---

## 🎯 Responsive Behavior

### Desktop (1440px+)
- Navigation: Horizontal center menu
- Hero: Two columns (text + image)
- Project grid: 3 columns
- Modals: Max width constrained, centered

### Tablet (1024px)
- Navigation: Horizontal menu maintained
- Hero: Still two columns (smaller)
- Project grid: 2 columns
- ProfileDrawer: 540px width

### Mobile (390px)
- Navigation: Bottom horizontal scroll menu
- Hero: Single column stack
- Project grid: 1 column
- ProfileDrawer: 400px width
- Modals: Nearly full width

---

## 🛠️ Tech Stack

### Core
- **React:** 18.3.1
- **TypeScript:** 5.4.3
- **Vite:** 5.2.6 (Build tool)
- **Tailwind CSS:** 4.0.0 (via @tailwindcss/vite)

### UI Libraries
- **Radix UI:** Accessible primitives (dialog, avatar, dropdown, etc.)
- **Lucide React:** 0.344.0 (Icon library)
- **class-variance-authority:** 0.7.0 (Component variants)
- **clsx + tailwind-merge:** Class name utilities

### Additional
- **date-fns:** Date formatting
- **recharts:** Charts (if needed)
- **sonner:** Toast notifications
- **vaul:** Drawer component
- **embla-carousel-react:** Carousels

---

## 📝 Content Guidelines

### Personal Information
- **Name:** KHALIL SABHA (all caps)
- **Title:** UI/UX Designer & Front-end Developer
- **Profile Image:** `figma:asset/1ac236e9226f9c05a21400fd39173611d03582ca.png`
  - (Replace with `/profile.png` for local dev)

### Project Types

**UX Case Studies:**
- Focus: Research, process, methodology
- Description: Deep-dive into design process
- Includes: Research → Define → Design → Test workflow

**UI Projects:**
- Focus: Visual design, interface components
- Description: Gallery-style presentations
- Includes: Design system work, explorations

**Live Sites:**
- Focus: Production applications
- Description: Functional web apps built
- Includes: Live URLs and GitHub repos

### Microcopy Standards
- Buttons: Action-oriented ("View My Work", "Download Resume")
- Descriptions: Concise, 1-2 sentences
- Year format: "2024", "2023"
- Tags: Technology names, methodologies

---

## 🎭 Interaction Patterns

### Hover States
- Cards: Scale 1.02, border color change, shadow
- Buttons: Background opacity change, border color
- Images: Scale 1.05 within container
- Links: Color transition to primary

### Animations
- All transitions: `duration-200` to `duration-300`
- Scroll behavior: `smooth`
- Modal enter/exit: Fade + zoom
- Drawer: Slide from right

### Accessibility
- Keyboard navigation: Escape closes modals
- Focus states: Ring outline on interactive elements
- ARIA: DialogDescription required for all dialogs
- Color contrast: Minimum 4.5:1 (WCAG AA)
- Touch targets: Minimum 44px (mobile)

---

## 🔧 Configuration Files

### package.json
- Scripts: `dev`, `build`, `preview`
- All dependencies listed (React, TypeScript, Tailwind, Radix UI, etc.)

### vite.config.ts
- React plugin
- Tailwind CSS plugin (@tailwindcss/vite)
- Path alias: `@` → root
- Server port: 5173
- Auto-open browser

### tsconfig.json
- Target: ES2020
- Module: ESNext
- JSX: react-jsx
- Strict mode enabled
- Path aliases configured

### index.html
- Root entry point
- Meta tags for viewport, description
- Imports `/main.tsx`

### main.tsx
- React 18 createRoot
- Imports `/App.tsx` and `/styles/globals.css`
- StrictMode wrapper

---

## 🚀 Development Workflow

### Running Locally
```bash
npm install
npm run dev
# Opens http://localhost:5173
```

### Building for Production
```bash
npm run build
# Creates /dist folder
```

### Adding New Projects
Edit `/data/projects.ts`:
```typescript
{
  id: 'unique-id',
  title: 'Project Name',
  description: 'Brief description',
  image: 'url or /path/to/image.png',
  tags: ['Tag1', 'Tag2'],
  year: '2024',
  type: 'case-study' | 'ui-project' | 'live-site',
  liveUrl: 'https://...', // optional
  repoUrl: 'https://github.com/...', // optional
}
```

### Customizing Colors
Edit `/styles/globals.css`:
```css
:root {
  --primary: #FFD700;        /* Golden Yellow */
  --secondary: #A8D5BA;      /* Mint Green */
  --background: #FFFFFF;     /* White */
  /* etc. */
}
```

---

## 📊 Current Content Summary

### UX Case Studies (3)
1. E-commerce Mobile App Redesign
2. Healthcare Dashboard UX
3. Financial Planning App

### UI Projects (5)
1. Design System Components
2. SaaS Dashboard Concepts
3. Mobile App Interfaces
4. Web Application Layouts
5. Brand Identity System

### Live Sites (3)
1. Tech Startup Website
2. Creative Agency Portfolio
3. E-commerce Dashboard

---

## ⚠️ Important Notes

### Do NOT Override
- Typography sizes/weights in components (use globals.css defaults)
- Protected files: `/supabase/functions/server/kv_store.tsx`, `/utils/supabase/info.tsx`, `/components/figma/ImageWithFallback.tsx`

### Always Include
- DialogDescription in all Dialog components (accessibility)
- forwardRef for components passed to Radix UI primitives
- Unique `key` props for lists

### Local Development Adjustments
- Replace `figma:asset/...` imports with `/public/...` paths
- Place images in `/public` folder
- Use regular string paths instead of import statements for static assets

---

## 🎯 Key Design Principles

1. **Minimal & Clean:** Apple-inspired aesthetic, lots of white space
2. **Consistent Theming:** All colors from CSS variables
3. **Responsive First:** Mobile → Tablet → Desktop breakpoints
4. **Smooth Interactions:** Transitions on all interactive elements
5. **Accessibility:** WCAG AA compliance, keyboard navigation
6. **Component Reusability:** DRY principles, shared UI components
7. **Performance:** Lazy loading images, optimized bundles

---

## 📚 External Resources

- **Tailwind CSS v4:** https://tailwindcss.com/docs
- **Radix UI:** https://www.radix-ui.com/primitives
- **Lucide Icons:** https://lucide.dev/icons
- **Shadcn/ui:** https://ui.shadcn.com (component reference)
- **React 18:** https://react.dev
- **TypeScript:** https://www.typescriptlang.org/docs

---

## 🔍 Common Patterns to Reuse

### Adding a New Section
1. Create component in `/components/NewSection.tsx`
2. Import in `App.tsx`
3. Add to section type union: `type SectionType = ... | 'new-section'`
4. Add nav item to Navigation.tsx
5. Add conditional render in App.tsx main

### Creating a Card Component
```tsx
<div className="group cursor-pointer rounded-2xl overflow-hidden 
                transition-all duration-300 hover:scale-[1.02] 
                bg-card border border-border 
                hover:border-primary/30 hover:shadow-lg">
  {/* Content */}
</div>
```

### Modal Pattern
```tsx
<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="max-w-4xl">
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

---

**This specification should give any AI assistant complete context to work with your portfolio website!**
