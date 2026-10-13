export const site = {
  url: 'https://pawishrajhen-portfolio.vercel.app',
  name: 'PAWISHRAJHEN A R',
  nameLines: ['PAWISHRAJHEN', 'A R'] as const,
  shortName: 'PAWISHRAJHEN A R',
  title: 'AI developer & engineer',
  tagline:
    'I build autonomous agents, automations, and full-stack AI products — agent loops, tool use, skills, and UIs that actually ship.',
  email: 'pawishinuk@gmail.com',
  resumeUrl: '/resume.pdf',
  social: {
    github: 'https://github.com/PawishrajhenAR',
    linkedin: 'https://www.linkedin.com/in/pawish6364/',
    instagram: 'https://www.instagram.com/ipawish/',
  },
  status: 'Open to internships & collabs',
  now: {
    building:
      'Agent loops and MCP integrations for KatalyzU client builds — shipping production workflows, not demos.',
    learning: 'Eval harnesses that catch agent regressions before users do.',
    openTo: 'Internships, research collabs, and agent/automation freelance through KatalyzU.',
  },
} as const;

export const about = {
  headline: 'I ship agent systems and full-stack products that clients actually use.',
  paragraphs: [
    "I'm technical lead at KatalyzU — a studio that ships websites, business software, and AI products on 7– and 30-day timelines. Most of what I build now is agentic: loops with tool use, MCP integrations, eval gates, and UIs that hand off cleanly when the model is done.",
    'That means scoping client work, picking the stack, wiring autonomous workflows, and handing off repos the team can maintain. I still ship classical ML and full-stack apps when the problem needs it — not everything has to be an agent.',
    "Before agents took over my calendar, I built computer-vision systems, RAG pipelines, and production platforms like multi-tenant billing and fuel-ops software. I'm comfortable going from messy prototype to something you'd hand to a client.",
    'I also co-authored published research — on-device face recognition for dementia care (ReMindAR, IEEE) and hybrid forecasting for ocean acidification. Research taught me the same lesson as client work: if nobody can use the output, it does not count as shipped.',
  ],
  aside:
    'Right now: agent loops, autonomous workflows, tool orchestration, and the boring infra that keeps agents reliable in production.',
  highlights: [
    { label: 'Main stack', value: 'Python, React, LLMs, agents' },
    { label: 'Focus now', value: 'Agents & automations' },
    { label: 'Published', value: '2 papers' },
    { label: 'Location', value: 'Glasgow, UK' },
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
  engineeringAngle: string;
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
    journalFull: 'IEEE Xplore Digital Library',
    status: 'published',
    summary:
      'Adaptive AR pipeline for dementia care that combines MTCNN face detection, InceptionResnetV1 embeddings, cosine-similarity matching, and a Decision Tree that picks one of four reminder intensity levels from encounter context. Built as a privacy-first progressive web app with on-device inference — 82.33% accuracy on the reminder classifier.',
    engineeringAngle:
      'Engineering tie-in: on-device inference pipeline + structured decision outputs — the same pattern I use in agent systems that must run tools locally and return explicit next actions.',
    tools: ['MTCNN', 'InceptionResnetV1', 'VGGFace2', 'Decision Tree', 'AR', 'PWA'],
    model: 'Face recognition + Decision Tree',
    doi: 'https://ieeexplore.ieee.org/document/11564630',
  },
  {
    title: 'Hybrid Forecasting Framework for Ocean Acidification and Hypoxia',
    role: 'Research lead',
    journal: 'IJLRET',
    journalFull: 'International Journal of Latest Research in Engineering and Technology',
    status: 'published',
    summary:
      'Hybrid ARIMA-LSTM model for predicting acidification and hypoxia in coastal waters. Trained on GLODAP, SOCAT, and IoT sensors. We built a geospatial dashboard so the output was actually usable by researchers.',
    engineeringAngle:
      'Engineering tie-in: hybrid models plus a dashboard humans can act on — same philosophy as shipping agent UIs on top of model outputs instead of dumping raw JSON.',
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
  { value: 5, suffix: '', label: 'projects' },
  { value: 2, suffix: '', label: 'research papers' },
  { value: 5, suffix: '+', label: 'AI domains' },
  { value: 3, suffix: '+', label: 'years building' },
] as const;

export type ExperienceCaseStudy = {
  problem: string;
  approach: string;
  outcome: string;
  stack: string[];
};

export type ExperienceItem = {
  period: string;
  type: string;
  title: string;
  org: string;
  orgUrl?: string;
  description: string;
  tags: string[];
  highlights?: string[];
  caseStudy?: ExperienceCaseStudy;
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
    caseStudy: {
      problem:
        'Founders needed a studio that could scope, build, and hand off production software in 7–30 days — not slide decks and endless revisions.',
      approach:
        'Fixed timelines, tight intake, stack choices per client, and full source handoff. I own engineering from repo setup through deployment and client training.',
      outcome:
        'Studio site live, multiple client builds shipped, and a repeatable delivery playbook the team uses on every new project.',
      stack: ['Next.js', 'React', 'FastAPI', 'PostgreSQL', 'Vercel', 'Agents'],
    },
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
    caseStudy: {
      problem:
        'A Nigerian fuel operator ran orders, invoicing, and delivery tracking on paper — reconciliation took hours and errors were common.',
      approach:
        'Single monorepo: React Native for field ops, Express API with Drizzle ORM, PostgreSQL, and OpenAPI contracts so web and mobile stay in sync.',
      outcome:
        'Daily operations moved into one system — orders, invoicing, and live delivery tracking replaced manual reconciliation.',
      stack: ['React Native', 'Express', 'PostgreSQL', 'Drizzle', 'OpenAPI', 'TypeScript'],
    },
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
