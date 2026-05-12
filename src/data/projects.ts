import yourFoodNowCover from '../assets/ba43e88e09ac6aff01142c7d0523560a2d8c83d8.png';

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  year: string;
  url?: string;
}

export const projects: Project[] = [
  {
    id: 'explore',
    title: 'eXplore',
    description: 'An Android-first priority radar for important AI releases and Iran/Qatar alerts, built around focused notifications and a readable feed.',
    year: '2026',
  },
  {
    id: 'scholarship-search',
    title: 'Scholarship Search Engine',
    description: 'A focused search experience for discovering scholarships, comparing fit, and moving quickly from broad eligibility to useful results.',
    image: 'https://image.thum.io/get/width/1280/https://scholarship-search.vercel.app/',
    year: '2024',
    url: 'https://scholarship-search.vercel.app/',
  },
  {
    id: 'big-five-assessment',
    title: 'Big Five AI Assessment',
    description: 'A personality assessment tool that turns psychometric inputs into readable trait summaries and visual feedback.',
    image: 'https://v1.screenshot.11ty.dev/https%3A%2F%2Fmy-bigfive-app.vercel.app/opengraph/_7yf',
    year: '2024',
    url: 'https://my-bigfive-app.vercel.app/',
  },
  {
    id: 'student-apartment',
    title: 'Student Apartment',
    description: 'A property browsing and management interface for student housing, designed around fast scanning and clear availability states.',
    image: 'https://api.microlink.io/?url=https://student-apartment-seven.vercel.app&screenshot=true&meta=false&embed=screenshot.url',
    year: '2024',
    url: 'https://student-apartment-seven.vercel.app/',
  },
  {
    id: 'working-memory-test',
    title: 'Neural Memory Test',
    description: 'An interactive working-memory test with a lightweight interface for repeated trials, scoring, and cognitive performance feedback.',
    image: 'https://v1.screenshot.11ty.dev/https%3A%2F%2Fw-mtest.vercel.app/opengraph/_7yf',
    year: '2024',
    url: 'https://w-mtest.vercel.app/',
  },
  {
    id: 'binary-deconstructor',
    title: 'Binary Deconstructor',
    description: 'A technical interface for parsing complex inputs and presenting structure in a way that is easier to inspect and reason about.',
    image: 'https://image.thum.io/get/width/1280/https://frontend-psi-three-13.vercel.app/',
    year: '2024',
    url: 'https://frontend-psi-three-13.vercel.app/',
  },
  {
    id: 'your-food-now',
    title: 'Your Food Now',
    description: 'A delivery flow centered on decision speed, order confidence, and reducing friction from browse to checkout.',
    image: yourFoodNowCover,
    year: '2024',
    url: yourFoodNowCover,
  },
];
