import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';

export const projects = [
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
  },
];

