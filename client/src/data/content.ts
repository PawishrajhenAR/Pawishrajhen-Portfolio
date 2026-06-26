export const site = {
  name: 'PAWISHRAJHEN A R',
  nameLines: ['PAWISHRAJHEN', 'A R'] as const,
  shortName: 'PAWISHRAJHEN A R',
  title: 'AI developer & engineer',
  tagline:
    'I build autonomous agents, automations, and full-stack AI products — agent loops, tool use, skills, and UIs that actually ship.',
  email: 'pawishgpt@gmail.com',
  resumeUrl:
    'https://drive.google.com/file/d/1EF4smigeysyEAMlS0YKHUoL_MmNNAAC4/view?usp=sharing',
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
    "I'm based in India and split my time between notebooks, VS Code, GitHub, and client builds at KatalyzU. I got into AI through computer vision — then RAG, then agents. These days most of what I build is agentic: systems that plan, call tools, loop until done, and hand off to a UI people can use.",
    "That means autonomous agents, multi-step workflows, MCP integrations, eval loops, and AI skills packaged so models can do real work without constant babysitting. I still ship classical ML and full-stack apps when the problem needs it — not everything has to be an agent.",
    "I've shipped projects from a YOLOv8 assistive navigation app to credit systems and fuel-ops platforms. I'm comfortable going from a messy prototype to something you'd actually hand to a client.",
    'I also co-authored research on ocean acidification forecasting and an adaptive AR memory companion for dementia care. Science and engineering still feel like the same job to me.',
  ],
  aside:
    'Right now: agent loops, autonomous workflows, tool orchestration, and the boring infra that keeps agents reliable in production.',
  highlights: [
    { label: 'Main stack', value: 'Python, React, LLMs, agents' },
    { label: 'Focus now', value: 'Agents & automations' },
    { label: 'Published', value: '1 paper · 1 forthcoming' },
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
    category: 'Agents & automation',
    skills: [
      'Autonomous agents',
      'Agent loops',
      'Tool use',
      'MCP',
      'Workflows',
      'AI skills',
      'Evals',
    ],
  },
  {
    category: 'AI & ML',
    skills: [
      'LLMs',
      'PyTorch',
      'TensorFlow',
      'OpenCV',
      'YOLO',
      'Transformers',
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

export type ResearchPaper = {
  title: string;
  role: string;
  journal: string;
  journalFull: string;
  status: 'published' | 'forthcoming';
  summary: string;
  tools: string[];
  model: string;
  doi?: string;
  paperUrl?: string;
};

export const researchPapers: ResearchPaper[] = [
  {
    title:
      'ReMindAR: An Adaptive Augmented Reality-Based Memory Companion for Dementia Care Using Deep Face Recognition',
    role: 'Co-author',
    journal: 'IEEE',
    journalFull: 'Submitted to IEEE — publication pending',
    status: 'forthcoming',
    summary:
      'Adaptive AR pipeline for dementia care that combines MTCNN face detection, InceptionResnetV1 embeddings, cosine-similarity matching, and a Decision Tree that picks one of four reminder intensity levels from encounter context. Built as a privacy-first progressive web app with on-device inference — 82.33% accuracy on the reminder classifier.',
    tools: ['MTCNN', 'InceptionResnetV1', 'VGGFace2', 'Decision Tree', 'AR', 'PWA'],
    model: 'Face recognition + Decision Tree',
  },
  {
    title: 'Hybrid Forecasting Framework for Ocean Acidification and Hypoxia',
    role: 'Research lead',
    journal: 'IJLRET',
    journalFull: 'International Journal of Latest Research in Engineering and Technology',
    status: 'published',
    summary:
      'Hybrid ARIMA-LSTM model for predicting acidification and hypoxia in coastal waters. Trained on GLODAP, SOCAT, and IoT sensors. We built a geospatial dashboard so the output was actually usable by researchers.',
    tools: ['ARIMA', 'LSTM', 'Python', 'GLODAP', 'SOCAT', 'IoT'],
    model: 'ARIMA + LSTM',
    doi: 'https://doi.org/10.56581/IJLRET.11.05.41-49',
  },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
] as const;

export const stats = [
  { value: 4, suffix: '', label: 'projects' },
  { value: 2, suffix: '', label: 'research papers' },
  { value: 5, suffix: '+', label: 'AI domains' },
  { value: 3, suffix: '+', label: 'years building' },
] as const;

export type ExperienceItem = {
  period: string;
  type: string;
  title: string;
  org: string;
  orgUrl?: string;
  description: string;
  tags: string[];
  highlights?: string[];
};

export const experience: ExperienceItem[] = [
  {
    period: '2025 — now',
    type: 'Technical lead',
    title: 'Engineering & product delivery',
    org: 'KatalyzU',
    orgUrl: 'https://katalyzu.com',
    description:
      'Technical lead at KatalyzU — a digital studio shipping websites, business software, and AI products on fixed 7- and 30-day timelines. I lead engineering on the company site, stack choices, and client delivery from scoped prototype through production handoff.',
    tags: ['Next.js', 'React', 'FastAPI', 'PostgreSQL', 'Agents', 'Automations'],
    highlights: [
      'Built and maintain katalyzu.com — the studio’s public site and intake flow',
      'Scope, architect, and ship client builds across web, mobile, agents, and automations',
      'Lead technical decisions: repos, APIs, deployments, and client handoffs',
    ],
  },
  {
    period: '2025',
    type: 'KatalyzU · Client build',
    title: 'Skanda Billing',
    org: 'Credit management system',
    description:
      'Multi-tenant billing and credit management backend for Skanda — tenant-scoped accounts, invoicing workflows, and APIs operators can rely on when the numbers have to be right.',
    tags: ['FastAPI', 'PostgreSQL', 'Multi-tenant', 'REST'],
    highlights: [
      'Credit limits, billing cycles, and ledger logic per tenant',
      'Isolated data model with clear auth boundaries',
      'Documented APIs ready for client-side integrations',
    ],
  },
  {
    period: '2025',
    type: 'KatalyzU · Client build · Nigeria',
    title: 'The Fuel Depot',
    org: 'Fuel delivery & operations',
    description:
      'Full-stack fuel delivery platform for a Nigerian operator — orders, invoicing, and live tracking in one production monorepo. Replaced paper reconciliation with software the team uses every day.',
    tags: ['React Native', 'Express', 'PostgreSQL', 'Drizzle', 'OpenAPI'],
    highlights: [
      'Mobile app for field ops plus admin dashboards for back office',
      'End-to-end order lifecycle with invoicing and live delivery tracking',
      'Monorepo with typed API contracts and OpenAPI documentation',
    ],
  },
  {
    period: '2025',
    type: 'KatalyzU · Client work',
    title: 'Freelance & contract builds',
    org: 'Various clients',
    description:
      'Additional client projects delivered through KatalyzU — marketing sites, admin portals, internal tools, and integrations for founders and small teams. Same playbook: tight scope, fast delivery, full source handoff.',
    tags: ['React', 'Python', 'APIs', 'Full-stack'],
    highlights: [
      'Marketing sites, admin portals, and line-of-business tools',
      'Workflow automations and third-party integrations',
      'Fixed-scope builds alongside longer-running product work',
    ],
  },
];
