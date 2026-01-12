import { Project } from '../components/ProjectCard';
import yourFoodNowCover from '../assets/ba43e88e09ac6aff01142c7d0523560a2d8c83d8.png';
import yourFoodNowOverview from '../assets/2802360e9ae82f2cfecfddeada2be449634b025e.png';
import yourFoodNowProblemGoal from '../assets/cf837c61cff070050a7af29e84f94905d6896d69.png';

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
    image: 'https://v1.screenshot.11ty.dev/https%3A%2F%2Fw-mtest.vercel.app/opengraph/_7yf',
    tags: ['Brain Training', 'Interactive', 'Test'],
    year: '2024',
    type: 'live-site',
    liveUrl: 'https://w-mtest.vercel.app/',
  },
];