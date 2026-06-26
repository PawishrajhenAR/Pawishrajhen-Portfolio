export type Project = {
  id: string;
  title: string;
  description: string;
  detail: string;
  highlights: string[];
  tags: string[];
  github: string;
  featured?: boolean;
  category: 'ai' | 'security' | 'healthcare' | 'web3' | 'research';
  note?: string;
};

export const projects: Project[] = [
  {
    id: 'sight-speak',
    title: 'SightSpeak',
    description:
      'Assistive navigation — YOLOv8 sees the scene, LLaMA describes it aloud for visually impaired users.',
    detail:
      'This started as a hackathon idea and became one of my favourite builds. The camera feed runs through YOLOv8 for object detection, then LLaMA 3.2 turns detections into natural spoken guidance like "door on your left, three steps ahead."',
    highlights: [
      'Real-time YOLOv8 inference on live camera input',
      'LLaMA 3.2 for natural-language spatial descriptions',
      'Low-latency audio output designed for outdoor navigation',
    ],
    tags: ['YOLOv8', 'LLaMA', 'Assistive Tech'],
    github: 'https://github.com/PawishrajhenAR/SightSpeak',
    featured: true,
    category: 'ai',
    note: 'Favourite build',
  },
  {
    id: 'malicious-url',
    title: 'MaliciousURLNet',
    description:
      'Real-time URL threat detection combining deep learning with LLM reasoning for phishing and malware links.',
    detail:
      'Phishing URLs look legitimate more often than not. I built a pipeline that encodes URL structure with CNN-BiLSTM, then uses LLaMA for contextual threat analysis and generates readable security reports — not just a binary flag.',
    highlights: [
      'Attention-based feature extraction on URL character sequences',
      'LLaMA integration for explainable threat summaries',
      'Batch analysis mode with exportable incident reports',
    ],
    tags: ['CNN-BiLSTM', 'LLaMA', 'Cybersecurity'],
    github: 'https://github.com/PawishrajhenAR/MaliciousURLNet',
    featured: true,
    category: 'security',
  },
  {
    id: 'dermascan',
    title: 'DermaScan AI',
    description:
      'Multilingual dermatology classifier on HAM10000 with AI-generated explanations patients can understand.',
    detail:
      'Medical AI only matters if people trust it. DermaScan classifies skin lesions from the HAM10000 dataset and explains results in plain language across multiple languages — aimed at bridging the gap between model output and actual understanding.',
    highlights: [
      'TensorFlow classifier trained on 7 lesion categories',
      'Multi-language explanation layer for diagnosis results',
      'Streamlit interface for non-technical users',
    ],
    tags: ['TensorFlow', 'Medical AI', 'HAM10000'],
    github: 'https://github.com/PawishrajhenAR/DermaScan-AI',
    featured: true,
    category: 'healthcare',
  },
  {
    id: 'rag-chat',
    title: 'RAG Chat Assistant',
    description:
      'Private document Q&A — upload PDFs, ask questions, get cited answers. Everything runs locally.',
    detail:
      'I wanted a ChatGPT-for-my-files tool that never phones home. Documents get chunked and embedded with Sentence Transformers, stored in FAISS, and queried through Ollama Phi3. Every answer includes source citations so you can verify what the model actually read.',
    highlights: [
      'Ollama Phi3 for local LLM inference — no API keys',
      'FAISS vector store with semantic chunk retrieval',
      'Source citations on every response',
    ],
    tags: ['RAG', 'FAISS', 'Ollama'],
    github: 'https://github.com/PawishrajhenAR/RAG-DocChatApp',
    featured: true,
    category: 'ai',
  },
];
