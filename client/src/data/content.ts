export const site = {
  name: 'PAWISHRAJHEN A R',
  nameLines: ['PAWISHRAJHEN', 'A R'] as const,
  shortName: 'PAWISHRAJHEN A R',
  title: 'AI developer & engineer',
  tagline:
    'I build things with Python and React — mostly ML pipelines, sometimes full apps. I like problems that need both a model and a UI.',
  email: 'pawishgpt@gmail.com',
  resumeUrl:
    'https://drive.google.com/file/d/1dZ-NJSqEC_-7WhmmMnoQrD6PuVJjmfcw/view?usp=sharing',
  social: {
    github: 'https://github.com/PawishrajhenAR',
    linkedin: 'https://www.linkedin.com/in/pawish6364/',
    instagram: 'https://www.instagram.com/ipawish/',
  },
  status: 'Open to internships & collabs',
} as const;

export const about = {
  headline: 'I like building things that actually get used.',
  paragraphs: [
    "I'm based in India and spend most of my time between notebooks, VS Code, and GitHub. I got into AI through computer vision projects and kept going — RAG systems, medical imaging, security tools, whatever problem seems interesting that week.",
    "I've shipped nine projects so far, from a YOLOv8 assistive navigation app to a CNN-BiLSTM URL classifier. I'm comfortable going from a messy prototype in Streamlit to something you'd actually hand to someone.",
    'I also co-authored a paper on ocean acidification forecasting — ARIMA + LSTM on real sensor data. Science and engineering feel like the same job to me.',
  ],
  aside: 'Currently tinkering with agent workflows and faster document Q&A.',
  highlights: [
    { label: 'Main stack', value: 'Python, React, TensorFlow' },
    { label: 'Published', value: '1 research paper' },
    { label: 'Location', value: 'India' },
    { label: 'Availability', value: 'Open to work' },
  ],
};

export type { Project } from './projects';
export { projects } from './projects';

export const skillGroups = [
  {
    category: 'Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C', 'SQL'],
  },
  {
    category: 'AI & ML',
    skills: [
      'TensorFlow',
      'PyTorch',
      'OpenCV',
      'YOLO',
      'Transformers',
      'RAG',
      'RL',
      'NLP',
    ],
  },
  {
    category: 'Frameworks',
    skills: ['React', 'Node.js', 'FastAPI', 'Flask', 'Streamlit', 'Next.js'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'Docker', 'GCP', 'Firebase', 'Supabase', 'MySQL'],
  },
  {
    category: 'Libraries',
    skills: ['Pandas', 'NumPy', 'Scikit-learn', 'FAISS', 'XGBoost', 'RAPIDS'],
  },
];

export const research = {
  title: 'Hybrid Forecasting Framework for Ocean Acidification and Hypoxia',
  role: 'Research lead',
  journal: 'IJLRET',
  journalFull: 'International Journal of Latest Research in Engineering and Technology',
  doi: 'https://doi.org/10.56581/IJLRET.11.05.41-49',
  tools: ['ARIMA', 'LSTM', 'Python', 'GLODAP', 'SOCAT', 'IoT'],
  summary:
    'Hybrid ARIMA-LSTM model for predicting acidification and hypoxia in coastal waters. Trained on GLODAP, SOCAT, and IoT sensors. We built a geospatial dashboard so the output was actually usable by researchers.',
};

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
] as const;

export const stats = [
  { value: 9, suffix: '+', label: 'projects' },
  { value: 1, suffix: '', label: 'paper published' },
  { value: 5, suffix: '+', label: 'AI domains' },
  { value: 3, suffix: '+', label: 'years building' },
] as const;

export type ExperienceItem = {
  period: string;
  type: string;
  title: string;
  org: string;
  description: string;
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    period: '2024 — now',
    type: 'Independent',
    title: 'AI & full-stack dev',
    org: 'Personal projects',
    description:
      'Security pipelines, assistive vision tools, RAG agents, medical imaging — whatever problem I can\'t stop thinking about.',
    tags: ['Python', 'LLMs', 'React'],
  },
  {
    period: '2023 — 2024',
    type: 'Research',
    title: 'Ocean forecasting paper',
    org: 'IJLRET publication',
    description:
      'Led the ARIMA-LSTM work and the dashboard. First time seeing research through from data to published results.',
    tags: ['ARIMA', 'LSTM', 'Climate'],
  },
  {
    period: '2022 — 2023',
    type: 'Learning',
    title: 'Deep learning deep dive',
    org: 'Self-taught',
    description:
      'RL, GPU computing with RAPIDS, multimodal models, and a Web3 voting app. A lot of false starts, a few keepers.',
    tags: ['PyTorch', 'Web3', 'CUDA'],
  },
];
