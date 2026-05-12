import yourFoodNowCover from '../assets/ba43e88e09ac6aff01142c7d0523560a2d8c83d8.png';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  year: string;
  kind: 'Live product' | 'UX case study';
  status: string;
  liveUrl?: string;
  detailUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'scholarship-search',
    title: 'Scholarship Search Engine',
    description: 'A focused search experience for discovering scholarships, comparing fit, and moving quickly from broad eligibility to useful results.',
    image: 'https://image.thum.io/get/width/1280/https://scholarship-search.vercel.app/',
    tags: ['Search', 'Ranking', 'Full-stack'],
    year: '2024',
    kind: 'Live product',
    status: 'Live',
    liveUrl: 'https://scholarship-search.vercel.app/',
  },
  {
    id: 'big-five-assessment',
    title: 'Big Five AI Assessment',
    description: 'A personality assessment tool that turns psychometric inputs into readable trait summaries and visual feedback.',
    image: 'https://v1.screenshot.11ty.dev/https%3A%2F%2Fmy-bigfive-app.vercel.app/opengraph/_7yf',
    tags: ['Assessment', 'Data visualization', 'React'],
    year: '2024',
    kind: 'Live product',
    status: 'Live',
    liveUrl: 'https://my-bigfive-app.vercel.app/',
    repoUrl: 'https://github.com/Khalilxorder/bigfive',
  },
  {
    id: 'student-apartment',
    title: 'Student Apartment',
    description: 'A property browsing and management interface for student housing, designed around fast scanning and clear availability states.',
    image: 'https://api.microlink.io/?url=https://student-apartment-seven.vercel.app&screenshot=true&meta=false&embed=screenshot.url',
    tags: ['Housing', 'Filters', 'Vercel'],
    year: '2024',
    kind: 'Live product',
    status: 'Live',
    liveUrl: 'https://student-apartment-seven.vercel.app/',
    repoUrl: 'https://github.com/Khalilxorder/StudentApartment',
  },
  {
    id: 'working-memory-test',
    title: 'Neural Memory Test',
    description: 'An interactive working-memory test with a lightweight interface for repeated trials, scoring, and cognitive performance feedback.',
    image: 'https://v1.screenshot.11ty.dev/https%3A%2F%2Fw-mtest.vercel.app/opengraph/_7yf',
    tags: ['Cognitive testing', 'Interaction', 'Metrics'],
    year: '2024',
    kind: 'Live product',
    status: 'Live',
    liveUrl: 'https://w-mtest.vercel.app/',
  },
  {
    id: 'binary-deconstructor',
    title: 'Binary Deconstructor',
    description: 'A technical interface for parsing complex inputs and presenting structure in a way that is easier to inspect and reason about.',
    image: 'https://image.thum.io/get/width/1280/https://frontend-psi-three-13.vercel.app/',
    tags: ['Parsing', 'Inspection', 'Performance'],
    year: '2024',
    kind: 'Live product',
    status: 'Live',
    liveUrl: 'https://frontend-psi-three-13.vercel.app/',
  },
  {
    id: 'your-food-now',
    title: 'Your Food Now',
    description: 'A UX case study for a delivery flow, centered on decision speed, order confidence, and reducing friction from browse to checkout.',
    image: yourFoodNowCover,
    tags: ['UX research', 'Mobile flow', 'Prototype'],
    year: '2024',
    kind: 'UX case study',
    status: 'Study',
    detailUrl: yourFoodNowCover,
  },
];
