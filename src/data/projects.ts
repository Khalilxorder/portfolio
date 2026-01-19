import { Project } from '../components/ProjectCard';
import yourFoodNowCover from '../assets/ba43e88e09ac6aff01142c7d0523560a2d8c83d8.png';
import yourFoodNowOverview from '../assets/2802360e9ae82f2cfecfddeada2be449634b025e.png';
import yourFoodNowProblemGoal from '../assets/cf837c61cff070050a7af29e84f94905d6896d69.png';

export const projects: Project[] = [
  // Live Sites (prioritized first)
  {
    id: 'live-site-scholarship',
    title: 'Scholarship Search Engine',
    description: 'Advanced AI-powered scholarship discovery platform with cognitive ranking and student profiling.',
    image: 'https://image.thum.io/get/width/1280/https://scholarship-search.vercel.app/',
    tags: ['AI/Neural Search', 'Cognitive Ranking', 'Full-Stack'],
    year: '2024',
    type: 'live-site',
    liveUrl: 'https://scholarship-search.vercel.app/',
    complexity: 92,
    aiFeature: 'Neural matching of user profiles to 10k+ scholarship data points.'
  },
  {
    id: 'live-site-beta',
    title: 'Big Five AI Assessment',
    description: 'Psychometric evaluation system using ML-driven normalization for personality trait analysis.',
    image: 'https://v1.screenshot.11ty.dev/https%3A%2F%2Fmy-bigfive-app.vercel.app/opengraph/_7yf',
    tags: ['ML Normalization', 'Psychometrics', 'Data Visualization'],
    year: '2023',
    type: 'live-site',
    liveUrl: 'https://my-bigfive-app.vercel.app',
    complexity: 85,
    aiFeature: 'Algorithmic scoring and population-wide percentile benchmarking.'
  },
  {
    id: 'live-site-alpha',
    title: 'Smart Apartment System',
    description: 'High-performance property management interface with real-time state synchronization.',
    image: 'https://api.microlink.io/?url=https://student-apartment-seven.vercel.app&screenshot=true&meta=false&embed=screenshot.url',
    tags: ['Real-time Sync', 'Scalable Arch', 'Vercel Edge'],
    year: '2024',
    type: 'live-site',
    liveUrl: 'https://student-apartment-seven.vercel.app/',
    complexity: 78,
    aiFeature: 'Intelligent search filters and automated availability tracking.'
  },
  {
    id: 'live-site-gamma',
    title: 'Neural Memory Test',
    description: 'Cognitive load analysis application designed to measure and optimize human working memory.',
    image: 'https://v1.screenshot.11ty.dev/https%3A%2F%2Fw-mtest.vercel.app/opengraph/_7yf',
    tags: ['Cognitive Analysis', 'Interactive', 'WASM'],
    year: '2024',
    type: 'live-site',
    liveUrl: 'https://w-mtest.vercel.app/',
    complexity: 82,
    aiFeature: 'Dynamic difficulty scaling based on real-time performance metrics.'
  },
  {
    id: 'live-site-deconstructor',
    title: 'Binary Deconstructor',
    description: 'Complex data parsing engine and visualization suite for high-level technical auditing.',
    image: 'https://image.thum.io/get/width/1280/https://frontend-psi-three-13.vercel.app/',
    tags: ['Data Parsing', 'Modern Web', 'Performance'],
    year: '2024',
    type: 'live-site',
    liveUrl: 'https://frontend-psi-three-13.vercel.app/',
    complexity: 80,
    aiFeature: 'Automated structure identification in unstructured data sets.'
  },

  // UX Case Studies
  {
    id: 'your-food-now',
    title: 'Synthetic UX: Food Intelligence',
    description: 'Designing high-frequency delivery systems using predictive analytics for logistics optimization.',
    image: yourFoodNowCover,
    tags: ['UX Intelligence', 'Predictive UX', 'Logistics'],
    year: '2024',
    type: 'case-study',
    complexity: 88,
    aiFeature: 'Intent-prediction algorithms integrated into the user flow to minimize friction.',
    galleryImages: [
      yourFoodNowCover,
      yourFoodNowOverview,
      yourFoodNowProblemGoal,
    ],
  },
];