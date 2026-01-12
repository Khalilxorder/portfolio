import { Project } from '../components/ProjectCard';
import yourFoodNowCover from 'figma:asset/ba43e88e09ac6aff01142c7d0523560a2d8c83d8.png';
import yourFoodNowOverview from 'figma:asset/2802360e9ae82f2cfecfddeada2be449634b025e.png';
import yourFoodNowProblemGoal from 'figma:asset/cf837c61cff070050a7af29e84f94905d6896d69.png';

export const projects: Project[] = [
  // UX Case Studies
  {
    id: 'your-food-now',
    title: 'YOUR FOOD NOW - Food Ordering App',
    description: 'Designing a simplified food ordering app for mothers in the Middle East, matching the diverse needs of their children with an easy-to-use interface and consistent delivery pricing.',
    image: yourFoodNowCover,
    tags: ['UX Research', 'Mobile App', 'Food Tech', 'User-Centered Design'],
    year: '2024',
    type: 'case-study',
    galleryImages: [
      yourFoodNowCover,
      yourFoodNowOverview,
      yourFoodNowProblemGoal,
      // Additional 13 images will be added here
    ],
  },
  {
    id: 'case-study-a',
    title: 'E-commerce Mobile App Redesign',
    description: 'Redesigning the checkout experience to reduce cart abandonment by 45% through user research and iterative design.',
    image: 'https://images.unsplash.com/photo-1551650992-ee4fd47df41f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzU4MzI1MDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['UX Research', 'Mobile Design', 'E-commerce', 'User Testing'],
    year: '2024',
    type: 'case-study',
  },
  {
    id: 'case-study-b',
    title: 'Healthcare Dashboard UX',
    description: 'Simplifying complex medical data visualization for healthcare professionals to improve decision-making efficiency.',
    image: 'https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkYXNoYm9hcmQlMjBkZXNpZ258ZW58MXx8fHwxNzU4NDMzNzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Data Visualization', 'Healthcare', 'Dashboard', 'B2B'],
    year: '2023',
    type: 'case-study',
  },
  {
    id: 'case-study-c',
    title: 'Financial Planning App',
    description: 'Creating an intuitive personal finance management experience that helps users achieve their financial goals.',
    image: 'https://images.unsplash.com/photo-1564424555153-04228f0aa7ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjB3aXJlZnJhbWVzfGVufDF8fHx8MTc1ODQzMzcwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['FinTech', 'Mobile App', 'Personal Finance', 'iOS'],
    year: '2024',
    type: 'case-study',
  },

  // UI Projects
  {
    id: 'ui-project-1',
    title: 'Design System Components',
    description: 'Comprehensive UI component library with documentation and usage guidelines.',
    image: 'https://images.unsplash.com/photo-1658863025658-4a259cc68fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjBkZXNpZ24lMjBzaG93Y2FzZXxlbnwxfHx8fDE3NTg0MzM3MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Design System', 'Components', 'Figma'],
    year: '2024',
    type: 'ui-project',
  },
  {
    id: 'ui-project-2',
    title: 'SaaS Dashboard Concepts',
    description: 'Modern dashboard interface explorations for B2B SaaS applications.',
    image: 'https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkYXNoYm9hcmQlMjBkZXNpZ258ZW58MXx8fHwxNzU4NDMzNzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Dashboard', 'SaaS', 'B2B', 'Data Viz'],
    year: '2023',
    type: 'ui-project',
  },
  {
    id: 'ui-project-3',
    title: 'Mobile App Interfaces',
    description: 'Collection of modern mobile app interface designs and micro-interactions.',
    image: 'https://images.unsplash.com/photo-1564424555153-04228f0aa7ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjB3aXJlZnJhbWVzfGVufDF8fHx8MTc1ODQzMzcwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Mobile', 'UI Design', 'Interfaces', 'iOS'],
    year: '2024',
    type: 'ui-project',
  },
  {
    id: 'ui-project-4',
    title: 'Web Application Layouts',
    description: 'Responsive web application layouts focusing on user experience and accessibility.',
    image: 'https://images.unsplash.com/photo-1551650992-ee4fd47df41f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzU4MzI1MDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Web Design', 'Responsive', 'Layouts', 'Accessibility'],
    year: '2023',
    type: 'ui-project',
  },
  {
    id: 'ui-project-5',
    title: 'Brand Identity System',
    description: 'Complete brand identity and visual system including logos, colors, and typography.',
    image: 'https://images.unsplash.com/photo-1603201667246-3c45012c6d17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGFnZW5jeSUyMHdlYnNpdGV8ZW58MXx8fHwxNzU4NDMzNzEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Branding', 'Identity', 'Logo Design', 'Typography'],
    year: '2024',
    type: 'ui-project',
  },

  // Live Sites
  {
    id: 'live-site-alpha',
    title: 'Apartment Website',
    description: 'Student apartment website deployed on Vercel.',
    image: 'https://image.thum.io/get/https://student-apartment-seven.vercel.app/',
    tags: ['Vercel', 'Web', 'Responsive'],
    year: '2024',
    type: 'live-site',
    liveUrl: 'https://student-apartment-seven.vercel.app/',
  },
  {
    id: 'live-site-beta',
    title: 'Self Assessment (Big Five) App',
    description: 'A Big Five self-assessment app deployed on Vercel.',
    image: 'https://v1.screenshot.11ty.dev/https%3A%2F%2Fmy-bigfive-app.vercel.app/opengraph/_7yf',
    tags: ['Vercel', 'Web App', 'Assessment'],
    year: '2023',
    type: 'live-site',
    liveUrl: 'https://my-bigfive-app.vercel.app',
  },
  {
    id: 'live-site-gamma',
    title: 'Working Memory Test',
    description: 'An interactive memory test application to measure and improve working memory capacity.',
    image: 'https://v1.screenshot.11ty.dev/https%3A%2F%2Fwww.workingmemorytest.com/opengraph/_7yf',
    tags: ['Brain Training', 'Interactive', 'Test'],
    year: '2024',
    type: 'live-site',
    liveUrl: 'https://www.workingmemorytest.com',
  },
];