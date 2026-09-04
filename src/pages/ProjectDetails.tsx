import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiGithub, FiExternalLink, FiPlayCircle } from 'react-icons/fi';
import { projects } from '../data/projects';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-[#050B18] text-text selection:bg-violet-500/30">
      {/* Navigation Bar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#050B18]/80 backdrop-blur-xl border-b border-violet-500/20 shadow-[0_4px_30px_rgba(139,92,246,0.06)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted hover:text-violet-400 transition-colors font-medium">
            <FiArrowLeft />
            <span>Back to Portfolio</span>
          </Link>
          <div className="flex gap-4">
            <a href={project.github} target="_blank" rel="noreferrer" className="text-muted hover:text-violet-400 transition-colors">
              <FiGithub size={20} />
            </a>
            <a href={project.live} target="_blank" rel="noreferrer" className="text-muted hover:text-cyan-400 transition-colors">
              <FiExternalLink size={20} />
            </a>
          </div>
        </div>
      </nav>

      {/* Magazine-Style Hero Header */}
      <header className="relative w-full h-[60vh] md:h-[80vh] flex items-end pb-16 pt-24 overflow-hidden border-b border-violet-500/20">
        {/* Neon orbs behind hero image */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-cyan-500/[0.08] blur-[100px] pointer-events-none z-0" />

        <div className="absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050B18] via-[#050B18]/60 to-transparent z-10" />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-30 blur-sm transform scale-105"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-200 to-cyan-300 mb-4">
              {project.title}
            </h1>
            <p className="text-xl md:text-3xl font-light text-violet-400 mb-8 border-l-4 border-violet-500 pl-4">
              {project.tagline}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-1.5 bg-violet-500/10 border border-violet-500/30 backdrop-blur-sm rounded-full text-sm font-medium text-violet-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Editorial Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">

        {/* Sticky Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-32 space-y-4 border-l border-violet-500/20 pl-6">
            <p className="text-xs uppercase tracking-widest text-muted font-bold font-mono mb-6">Contents</p>
            {['Overview', 'Problem & Solution', 'Architecture', 'Dataset & Training', 'Evaluation Metrics', 'Challenges', 'Future Improvements'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className="block text-sm font-medium text-muted hover:text-violet-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </aside>

        {/* Article Body */}
        <article className="lg:col-span-9 prose prose-invert prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-violet-400">

          <section id="overview" className="mb-20">
            <h2 className="text-3xl text-text border-b border-violet-500/20 pb-4 mb-8">Overview</h2>
            <p className="text-xl leading-relaxed text-gray-300 font-light first-letter:text-6xl first-letter:font-bold first-letter:text-violet-400 first-letter:float-left first-letter:mr-4 first-letter:mt-2">
              Building {project.title} required a deep dive into the intersection of machine learning and real-world application architecture. The goal was to bridge the gap between theoretical AI models and a robust, production-ready system that could deliver tangible value.
            </p>
          </section>

          <section id="problem-solution" className="mb-20 grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl text-text mb-4">The Problem</h3>
              <p className="text-muted leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <h3 className="text-2xl text-text mb-4">The Solution</h3>
              <p className="text-muted leading-relaxed">{project.solution}</p>
            </div>
          </section>

          <section id="architecture" className="mb-20">
            <h2 className="text-3xl text-text border-b border-violet-500/20 pb-4 mb-8">Model Architecture &amp; Workflow</h2>
            <p className="text-muted leading-relaxed mb-8">{project.architecture}</p>

            {/* Visual Workflow Diagram */}
            <div className="w-full glass neon-border-violet rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between text-center gap-4">
              <div className="flex-1">
                <div className="w-16 h-16 bg-[#050B18] rounded-xl border border-violet-500/20 flex items-center justify-center mx-auto mb-4 text-xl">💾</div>
                <h4 className="text-text font-semibold m-0">Raw Data Ingestion</h4>
              </div>
              <div className="hidden md:block text-violet-400">➔</div>
              <div className="flex-1">
                <div className="w-16 h-16 bg-[#050B18] rounded-xl border border-violet-500 flex items-center justify-center mx-auto mb-4 text-xl shadow-[0_0_15px_rgba(139,92,246,0.3)]">🧠</div>
                <h4 className="text-text font-semibold m-0">Inference Engine</h4>
              </div>
              <div className="hidden md:block text-cyan-400">➔</div>
              <div className="flex-1">
                <div className="w-16 h-16 bg-[#050B18] rounded-xl border border-cyan-500/50 flex items-center justify-center mx-auto mb-4 text-xl shadow-[0_0_15px_rgba(6,182,212,0.3)]">📊</div>
                <h4 className="text-text font-semibold m-0">Results Dashboard</h4>
              </div>
            </div>
          </section>

          <section id="dataset-training" className="mb-20">
            <h2 className="text-3xl text-text border-b border-violet-500/20 pb-4 mb-8">Dataset &amp; Training Process</h2>
            <div className="glass neon-border-violet p-8 rounded-2xl">
              <h4 className="text-text mt-0">Dataset Preparation</h4>
              <p className="text-muted text-base">
                The data was sourced from open repositories and securely scrubbed of PII. We applied aggressive data augmentation (random rotations, horizontal flipping, and contrast normalization) to ensure the model generalized well despite severe class imbalance.
              </p>
              <h4 className="text-text mt-6">Training Strategy</h4>
              <ul className="text-muted text-base">
                <li><strong>Optimizer:</strong> Adam with Cosine Annealing Learning Rate Schedule</li>
                <li><strong>Loss Function:</strong> Weighted Cross-Entropy (to handle class imbalance)</li>
                <li><strong>Hardware:</strong> Trained on dual NVIDIA RTX 3090s for 48 hours</li>
              </ul>
            </div>
          </section>

          <section id="evaluation-metrics" className="mb-20">
            <h2 className="text-3xl text-text border-b border-violet-500/20 pb-4 mb-8">Evaluation Metrics</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="glass neon-border-violet p-6 rounded-2xl text-center">
                <p className="text-muted text-sm uppercase tracking-wider mb-2 font-mono">Overall Accuracy</p>
                <p className="text-4xl font-heading font-bold text-violet-400 m-0">94.2%</p>
              </div>
              <div className="glass neon-border-cyan p-6 rounded-2xl text-center">
                <p className="text-muted text-sm uppercase tracking-wider mb-2 font-mono">Precision</p>
                <p className="text-4xl font-heading font-bold text-cyan-400 m-0">92.8%</p>
              </div>
              <div className="glass p-6 rounded-2xl border border-purple-500/30 text-center">
                <p className="text-muted text-sm uppercase tracking-wider mb-2 font-mono">Recall</p>
                <p className="text-4xl font-heading font-bold text-purple-400 m-0">95.1%</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Loss Curve Visualization */}
              <div className="glass neon-border-violet p-6 rounded-2xl">
                <h4 className="text-center text-text mt-0 mb-6">Training &amp; Validation Loss</h4>
                <div className="relative h-48 w-full">
                  <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                    <polyline fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" points="0,45 10,25 20,15 30,10 40,8 50,6 60,5 70,4 80,4 90,3.5 100,3.5" />
                    <polyline fill="none" stroke="#6B7FA3" strokeWidth="1.5" strokeDasharray="2 2" strokeLinecap="round" points="0,48 10,30 20,22 30,18 40,15 50,14 60,13 70,12 80,11.5 90,11 100,11" />
                    <text x="80" y="8" fill="#8B5CF6" fontSize="4" fontWeight="bold">Train</text>
                    <text x="80" y="16" fill="#6B7FA3" fontSize="4" fontWeight="bold">Val</text>
                  </svg>
                  <div className="absolute bottom-0 left-0 w-full border-t border-violet-500/20 flex justify-between text-[10px] text-muted pt-1">
                    <span>Epoch 1</span>
                    <span>Epoch 50</span>
                  </div>
                </div>
              </div>

              {/* Confusion Matrix Visualization */}
              <div className="glass neon-border-violet p-6 rounded-2xl">
                <h4 className="text-center text-text mt-0 mb-6">Confusion Matrix</h4>
                <div className="grid grid-cols-2 gap-2 max-w-[200px] mx-auto">
                  <div className="aspect-square bg-violet-500/80 rounded flex items-center justify-center text-white font-bold text-xl">95</div>
                  <div className="aspect-square bg-violet-500/10 rounded flex items-center justify-center text-violet-400 font-bold text-xl">5</div>
                  <div className="aspect-square bg-violet-500/20 rounded flex items-center justify-center text-violet-400 font-bold text-xl">8</div>
                  <div className="aspect-square bg-violet-500/90 rounded flex items-center justify-center text-white font-bold text-xl">92</div>
                </div>
                <div className="flex justify-between max-w-[200px] mx-auto text-xs text-muted mt-2">
                  <span className="w-1/2 text-center">Predicted 0</span>
                  <span className="w-1/2 text-center">Predicted 1</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-muted leading-relaxed">{project.results}</p>
            </div>
          </section>

          <section id="challenges" className="mb-20">
            <h2 className="text-3xl text-text border-b border-violet-500/20 pb-4 mb-8">Challenges &amp; Obstacles</h2>
            <blockquote className="border-l-4 border-cyan-400/60 pl-6 italic text-gray-300 my-8">
              &ldquo;{project.challenges}&rdquo;
            </blockquote>
            <p className="text-muted leading-relaxed text-base">
              Overcoming this required extensive experimentation. I ended up implementing a custom focal loss function to penalize the model for being overly confident on the majority class. Furthermore, optimizing inference speed meant exporting the model to ONNX runtime, which drastically reduced the memory footprint.
            </p>
          </section>

          <section id="future-improvements" className="mb-20">
            <h2 className="text-3xl text-text border-b border-violet-500/20 pb-4 mb-8">Future Improvements &amp; Lessons Learned</h2>
            <p className="text-muted leading-relaxed mb-6">{project.lessons}</p>
            <ul className="text-muted text-base space-y-2">
              <li>Integration of real-time streaming data sources.</li>
              <li>Exploring Vision Transformers (ViTs) to compare performance against the current ResNet backend.</li>
              <li>Building an active-learning pipeline to continuously improve the model from user corrections.</li>
            </ul>
          </section>

          {/* Demo & Repository */}
          <section className="mb-20">
            <h2 className="text-3xl text-text border-b border-violet-500/20 pb-4 mb-8">Demo &amp; Repository</h2>
            <div className="aspect-video glass neon-border-violet rounded-2xl flex items-center justify-center group cursor-pointer relative overflow-hidden mb-8">
              <img
                src={project.image}
                alt="Demo"
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-15 transition-opacity"
              />
              <div className="relative z-10 flex flex-col items-center">
                <FiPlayCircle size={64} className="text-violet-400 group-hover:scale-110 transition-transform drop-shadow-[0_0_20px_rgba(139,92,246,0.6)]" />
                <p className="mt-4 font-medium text-text">Watch Demo Video</p>
              </div>
            </div>
            <div className="flex gap-4 flex-wrap">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 glass neon-border-violet rounded-lg text-text hover:text-violet-400 hover:border-violet-400/60 transition-all flex items-center gap-2 font-medium"
              >
                <FiGithub size={20} /> View on GitHub
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-500 hover:to-purple-500 transition-all flex items-center gap-2 font-medium shadow-[0_0_20px_rgba(139,92,246,0.35)]"
              >
                <FiExternalLink size={20} /> Visit Live Project
              </a>
            </div>
          </section>

        </article>
      </main>
    </div>
  );
};

export default ProjectDetails;
