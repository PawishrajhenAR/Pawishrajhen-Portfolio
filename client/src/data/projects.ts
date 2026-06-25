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
    id: 'shadownet',
    title: 'ShadowNet',
    description:
      'Three-stage shadow removal: detect with U-Net, remove with diffusion, refine with DeepFill v2.',
    detail:
      'Shadows ruin product photos and document scans. ShadowNet chains three models — U-Net finds shadow regions, Latent Diffusion removes them, DeepFill v2 cleans up artifacts. Hits ~98% accuracy at ~2.8 seconds per image on a mid-range GPU.',
    highlights: [
      'U-Net shadow region segmentation',
      'Latent Diffusion inpainting for removal',
      'DeepFill v2 refinement pass for edge quality',
    ],
    tags: ['U-Net', 'Diffusion', 'Streamlit'],
    github: 'https://github.com/PawishrajhenAR/Shadow-Removal',
    category: 'ai',
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
    category: 'ai',
  },
  {
    id: 'emotion',
    title: 'Multimodal Emotion Classifier',
    description:
      'Detects emotion from text and images together — LLM, CNN, and transformers working as one model.',
    detail:
      'Single-modality emotion detection misses context. This project fuses a CNN image encoder, transformer text encoder, and LLM reasoning layer so a sarcastic caption on a happy photo gets classified correctly. Built collaboratively with a friend.',
    highlights: [
      'Dual-encoder architecture for text + image input',
      'LLM layer for contextual disambiguation',
      'Trained across multiple emotion categories and input types',
    ],
    tags: ['LLM', 'CNN', 'Transformers'],
    github: 'https://github.com/Codesaur1618/Multimodal_emotion-Classification_usingLLM',
    category: 'ai',
  },
  {
    id: 'oceanwatch',
    title: 'OceanWatch',
    description:
      'Hybrid ARIMA-LSTM forecasting for ocean acidification — tied to my published climate research.',
    detail:
      'Linear models catch trends, LSTMs catch chaos. OceanWatch stacks both on GLODAP, SOCAT, and live IoT sensor feeds to forecast acidification events in coastal waters. Output feeds a geospatial dashboard researchers can actually use for monitoring.',
    highlights: [
      'ARIMA + LSTM stacked ensemble for multivariate series',
      'Trained on GLODAP, SOCAT, and IoT sensor data',
      'Interactive geospatial dashboard for coastal monitoring',
    ],
    tags: ['ARIMA', 'LSTM', 'Climate'],
    github:
      'https://github.com/PawishrajhenAR/Hybrid-ARIMA-LSTM-Stacked-Ensemble-for-RealTime-Multivariate-Forecasting-of-Ocean-Acidification',
    category: 'research',
  },
  {
    id: 'liverscan',
    title: 'LiverScan-AI',
    description:
      'Capsule neural networks for liver tumor segmentation — a web tool built for clinicians, not demos.',
    detail:
      'Most medical AI repos stop at a Jupyter notebook. LiverScan wraps CapsNet segmentation in a web interface doctors can upload scans to, get tumor outlines on, and review without touching Python.',
    highlights: [
      'Capsule Neural Network for precise tumor boundaries',
      'Web-based upload and visualization workflow',
      'Designed for clinical review, not just benchmark scores',
    ],
    tags: ['CapsNet', 'Segmentation', 'Healthcare'],
    github: 'https://github.com/PawishrajhenAR/LiverScan-AI',
    category: 'healthcare',
  },
  {
    id: 'blockvote',
    title: 'BlockVote',
    description:
      'Decentralized voting on Ethereum — smart contracts on-chain, React + MetaMask on the frontend.',
    detail:
      'My intro to Web3. Solidity contracts handle vote casting and tallying immutably on Ethereum. The React TypeScript frontend connects via MetaMask so voters sign transactions directly — no central server holding the results.',
    highlights: [
      'Solidity smart contracts for vote lifecycle',
      'React TypeScript frontend with MetaMask integration',
      'Transparent, immutable on-chain vote records',
    ],
    tags: ['Ethereum', 'React', 'Web3'],
    github: 'https://github.com/PawishrajhenAR/BlockVote',
    category: 'web3',
  },
];
