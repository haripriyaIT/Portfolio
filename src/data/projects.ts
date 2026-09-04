import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';

export const projects = [
  {
    id: 'medvision-ai',
    title: 'MedVision AI',
    tagline: 'Deep Learning for Early Disease Detection',
    image: project1,
    problem: 'Early detection of lung diseases in chest X-rays is challenging and heavily relies on scarce expert radiologists, often leading to delayed diagnoses.',
    solution: 'Developed an automated pipeline using a customized ResNet-50 architecture to classify chest X-rays with high precision, providing real-time assistance to medical professionals.',
    techStack: ['Python', 'TensorFlow', 'React', 'FastAPI', 'PostgreSQL'],
    architecture: 'A microservices architecture where a React frontend communicates with a FastAPI Python backend. The backend queues image processing tasks to a GPU-accelerated inference service.',
    challenges: 'Handling class imbalance in the medical dataset and optimizing the model inference time to run under 200ms per image in a production environment.',
    results: 'Achieved 94% accuracy on the test set and reduced the average preliminary screening time by 75%, allowing doctors to focus on critical cases.',
    lessons: 'Gained deep insights into CNN architectures, data augmentation techniques for medical imaging, and deploying machine learning models in scalable production environments.',
    github: 'https://github.com/haripriya/medvision-ai',
    live: 'https://medvision-ai.vercel.app',
  },
  {
    id: 'nexus-nlp',
    title: 'Nexus NLP',
    tagline: 'Enterprise Sentiment & Intent Analysis',
    image: project2,
    problem: 'Companies struggle to manually process thousands of customer support tickets and reviews, missing out on crucial product feedback and urgent issues.',
    solution: 'Built an end-to-end NLP dashboard that automatically ingests customer feedback, extracts key entities, and analyzes sentiment and intent using transformer models.',
    techStack: ['Python', 'PyTorch', 'Hugging Face', 'Next.js', 'Tailwind CSS'],
    architecture: 'Fine-tuned a RoBERTa model deployed via serverless functions. The frontend visualizes extracted insights using interactive D3.js and Recharts graphs.',
    challenges: 'Minimizing the computational cost of transformer inference on large text batches while maintaining low-latency response times for the UI.',
    results: 'Processed over 100k test tickets, achieving a 91% F1-score for intent classification and saving an estimated 40 hours of manual review time per week.',
    lessons: 'Learned how to effectively fine-tune large language models (LLMs) on domain-specific data and build intuitive interfaces for complex AI insights.',
    github: 'https://github.com/haripriya/nexus-nlp',
    live: 'https://nexus-nlp.vercel.app',
  },
];
