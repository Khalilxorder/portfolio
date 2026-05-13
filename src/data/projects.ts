import exploreCover from '../assets/project-shots/explore-cover.svg';
import bigFivePredictionCover from '../assets/project-shots/big-five-prediction.svg';
import studentApartmentAiCover from '../assets/project-shots/student-apartment-ai.svg';
import csaiVoiceAgentCover from '../assets/project-shots/csai-voice-agent.svg';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  year: string;
  url: string;
}

export const projects: Project[] = [
  {
    id: 'explore',
    title: 'eXplore',
    description: 'Priority alerts and a focused feed for important AI releases and Iran/Qatar developments.',
    image: exploreCover,
    year: '2026',
    url: 'https://drive.google.com/file/d/13UjPc3w_g16dc4H9oA_agPB3lgiH1XJp',
  },
  {
    id: 'csai-voice-agent',
    title: 'CSAI Voice Agent',
    description: 'A multilingual customer service voice agent with model-fit routing and monthly cost planning.',
    image: csaiVoiceAgentCover,
    year: '2026',
    url: '/csai.html',
  },
  {
    id: 'scholarship-search',
    title: 'Scholarship Search Engine',
    description: 'A focused search workspace for discovering scholarships and comparing fit quickly.',
    image: 'https://image.thum.io/get/width/1280/https://scholarship-search.vercel.app/',
    year: '2024',
    url: 'https://scholarship-search.vercel.app/',
  },
  {
    id: 'big-five-assessment',
    title: 'Big Five AI Assessment',
    description: 'A personality assessment with rich visual framing and readable trait feedback.',
    image: 'https://v1.screenshot.11ty.dev/https%3A%2F%2Fmy-bigfive-app.vercel.app/opengraph/_7yf',
    year: '2024',
    url: 'https://my-bigfive-app.vercel.app/',
  },
  {
    id: 'big-five-prediction',
    title: 'Big Five Prediction',
    description: 'The thesis project: predicting Big Five trait signals from written text with interpretable NLP.',
    image: bigFivePredictionCover,
    year: '2026',
    url: 'https://github.com/Khalilxorder/bigfive',
  },
  {
    id: 'student-apartment',
    title: 'Student Apartment',
    description: 'AI-assisted owner uploads and student matching from video, photos, categories, and natural language.',
    image: studentApartmentAiCover,
    year: '2024',
    url: 'https://student-apartment-seven.vercel.app/',
  },
  {
    id: 'working-memory-test',
    title: 'Neural Memory Test',
    description: 'A working-memory test with direct controls, scoring, and repeatable trials.',
    image: 'https://v1.screenshot.11ty.dev/https%3A%2F%2Fw-mtest.vercel.app/opengraph/_7yf',
    year: '2024',
    url: 'https://w-mtest.vercel.app/',
  },
  {
    id: 'binary-deconstructor',
    title: 'Binary Deconstructor',
    description: 'An audio deconstruction tool with upload flow, AI extraction, and dark visual depth.',
    image: 'https://image.thum.io/get/width/1280/https://frontend-psi-three-13.vercel.app/',
    year: '2024',
    url: 'https://frontend-psi-three-13.vercel.app/',
  },
];
