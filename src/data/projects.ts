import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/cinematic-hero-scene.jpg';

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  image: string;
  problem: string;
  solution: string;
  techStack: string[];
  architecture: string;
  challenges: string;
  results: string;
  lessons: string;
  github: string;
  live: string;
  accent: string;
  border: string;
  glow: string;
}

export const projects: ProjectItem[] = [
  {
    id: 'potato-leaf-disease-ai',
    title: 'AI-Based Potato Leaf Disease Prediction',
    tagline: 'Deep Learning (CNN) & Cloud Deployment on GCP',
    image: project1,
    problem: 'Early detection of agricultural crop diseases like Early Blight and Late Blight in potato crops is vital to prevent catastrophic yield losses for farmers.',
    solution: 'Built a deep learning computer vision pipeline with a custom CNN model to identify and classify potato leaf diseases with real-time inference accuracy.',
    techStack: ['Python', 'TensorFlow', 'GCP', 'Postman', 'HTML', 'CSS', 'JavaScript'],
    architecture: 'Trained deep convolutional neural networks with extensive data augmentation. Deployed the trained model as a REST API on Google Cloud Platform (GCP) with end-to-end API verification using Postman.',
    challenges: 'Handling subtle visual variations in leaf lesions across diverse field lighting conditions and optimizing the model architecture for low-latency cloud inference.',
    results: 'Trained on 15,000+ images across three distinct classes, achieving 97% classification accuracy through extensive data augmentation and regularization.',
    lessons: 'Deepened expertise in Convolutional Neural Networks, TensorFlow/Keras workflows, GCP cloud deployment, and robust RESTful API validation.',
    github: 'https://github.com/haripriyaIT',
    live: 'https://github.com/haripriyaIT',
    accent: 'from-emerald-900/80 to-emerald-950/90',
    border: 'border-emerald-500/40',
    glow: 'rgba(0,200,150,0.25)',
  },
  {
    id: 'hospital-management-system',
    title: 'Hospital Management System',
    tagline: 'Web-Based Healthcare Platform with Role Dashboards',
    image: project2,
    problem: 'Healthcare institutions struggle with disorganized paper records, appointment scheduling conflicts, slow prescription tracking, and manual billing delays.',
    solution: 'Developed a comprehensive web-based platform with separate Admin, Doctor, and Patient dashboards, centralizing hospital activities into an intuitive unified system.',
    techStack: ['Java', 'JDBC', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    architecture: 'Structured Java & JDBC backend executing optimized relational queries against MySQL, accompanied by an interactive frontend and automated email notification service.',
    challenges: 'Designing a secure relational schema across patients, doctors, appointments, medical histories, prescriptions, and financial billing tables.',
    results: 'Streamlined day-to-day hospital operations with automated appointment booking, real-time doctor availability, and automated email verification & notifications for patients.',
    lessons: 'Mastered enterprise Java development, JDBC database connection pooling, relational DBMS design, and role-based authentication.',
    github: 'https://github.com/haripriyaIT',
    live: 'https://github.com/haripriyaIT',
    accent: 'from-cyan-900/80 to-cyan-950/90',
    border: 'border-cyan-500/40',
    glow: 'rgba(0,229,255,0.25)',
  },
  {
    id: 'generative-ai-workflow-engine',
    title: 'Generative AI & LLM Workflow Engine',
    tagline: 'Prompt Engineering & Intelligent Knowledge Pipeline',
    image: project3,
    problem: 'Enterprises need efficient, context-aware information extraction and automated summarization without manual data overhead.',
    solution: 'Built an interactive LLM-powered assistant with optimized prompt chains, semantic context retrieval, and structured response parsing.',
    techStack: ['Python', 'OpenAI / LLMs', 'Prompt Eng.', 'FastAPI', 'React', 'TailwindCSS'],
    architecture: 'Designed a modular multi-stage prompting pipeline with vector embeddings for semantic document search and structured JSON extraction.',
    challenges: 'Mitigating model hallucination and standardizing deterministic output formats across diverse document schemas.',
    results: 'Enabled instant automated document querying with 95%+ prompt consistency and sub-second response times.',
    lessons: 'Deepened mastery of Generative AI paradigms, prompt design patterns, context window management, and LLM application architectures.',
    github: 'https://github.com/haripriyaIT',
    live: 'https://github.com/haripriyaIT',
    accent: 'from-violet-900/80 to-violet-950/90',
    border: 'border-violet-500/40',
    glow: 'rgba(139,92,246,0.25)',
  },
];


