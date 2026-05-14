import exploreCover from '../assets/project-shots/explore-cover.svg';
import bigFivePredictionCover from '../assets/project-shots/big-five-prediction.svg';
import studentApartmentAiCover from '../assets/project-shots/student-apartment-ai.svg';
import csaiVoiceAgentCover from '../assets/project-shots/csai-voice-agent.svg';
import scholarshipSearchCover from '../assets/project-shots/scholarship-search.svg';
import selfCover from '../assets/project-shots/self-cover.svg';
import memoryTestCover from '../assets/project-shots/memory-test.svg';
import binaryDeconstructorCover from '../assets/project-shots/binary-deconstructor.svg';

export type ProjectCategory = 'scientific' | 'commercial';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  year: string;
  url: string;
  category: ProjectCategory;
}

export const projects: Project[] = [
  {
    id: 'big-five-prediction',
    title: 'Big Five Prediction',
    description: 'The thesis project: predicting Big Five trait signals from written text with interpretable NLP.',
    image: bigFivePredictionCover,
    year: '2026',
    url: 'https://github.com/Khalilxorder/bigfive',
    category: 'scientific',
  },
  {
    id: 'self',
    title: 'SELF',
    description: 'A self-discovery platform with Big Five, cognitive, and narrative assessments - moving toward psyche mapping and life-event reorganization against ideal capacity.',
    image: selfCover,
    year: '2024',
    url: 'https://my-bigfive-app.vercel.app/',
    category: 'scientific',
  },
  {
    id: 'working-memory-test',
    title: 'Neural Memory Test',
    description: 'A working-memory test with direct controls, scoring, and repeatable trials.',
    image: memoryTestCover,
    year: '2024',
    url: 'https://w-mtest.vercel.app/',
    category: 'scientific',
  },
  {
    id: 'binary-deconstructor',
    title: 'Binary Deconstructor',
    description: 'Audio deconstruction: stems, MIDI, tempo, chords. Live demo preview; full processing runs against a local backend.',
    image: binaryDeconstructorCover,
    year: '2024',
    url: 'https://frontend-psi-three-13.vercel.app/',
    category: 'scientific',
  },
  {
    id: 'explore',
    title: 'eXplore',
    description: 'Priority alerts and a focused feed for important AI releases and Iran/Qatar developments.',
    image: exploreCover,
    year: '2026',
    url: '/explore.html',
    category: 'commercial',
  },
  {
    id: 'csai-voice-agent',
    title: 'CSAI Voice Agent',
    description: 'A multilingual customer service voice agent with model-fit routing and monthly cost planning.',
    image: csaiVoiceAgentCover,
    year: '2026',
    url: '/csai.html',
    category: 'commercial',
  },
  {
    id: 'scholarship-search',
    title: 'Scholarship Search Engine',
    description: 'A focused search workspace for discovering scholarships and comparing fit quickly.',
    image: scholarshipSearchCover,
    year: '2024',
    url: 'https://scholarship-search.vercel.app/',
    category: 'commercial',
  },
  {
    id: 'student-apartment',
    title: 'Student Apartment',
    description: 'AI-assisted owner uploads and student matching from video, photos, categories, and natural language.',
    image: studentApartmentAiCover,
    year: '2024',
    url: '/student-apartment.html',
    category: 'commercial',
  },
];

export const categoryLabels: Record<ProjectCategory, string> = {
  scientific: 'Scientific',
  commercial: 'Commercial',
};
