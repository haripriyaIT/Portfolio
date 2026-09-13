import React from 'react';
import { motion } from 'framer-motion';
import {
  FiCpu, FiActivity, FiLayers, FiTerminal, FiTrendingUp,
  FiBookOpen, FiGitCommit, FiCheckCircle, FiPlay,
} from 'react-icons/fi';

const AIDashboard = () => {
  const papers = [
    { title: 'IEEE Conference Research Paper', authors: 'Univ. of Hyderabad', status: 'Presented' },
    { title: 'Generative AI & LLM Workflows', authors: 'Gateway Software', status: 'Internship' },
    { title: 'Deep Learning & CNN Applications', authors: 'Litz Tech & TF', status: 'Applied ML' },
  ];

  const trainingLogs = [
    { time: 'Validated', event: 'CNN trained on 15,000+ images across 3 classes', status: 'success' },
    { time: 'Optimized', event: 'Achieved 97% validation accuracy with augmentation', status: 'optimal' },
    { time: 'Deployed', event: 'Cloud API deployed on GCP with Postman testing', status: 'info' },
  ];

  const roadmap = [
    { step: '01', title: 'Core CS & Languages', desc: 'Java, Python, C, SQL, DSA, OOPs', completed: true },
    { step: '02', title: 'Deep Learning & CNN', desc: 'TensorFlow, OpenCV, Scikit-learn, GCP', completed: true },
    { step: '03', title: 'Generative AI & LLMs', desc: 'Prompt Engineering, AI Workflows', completed: true },
  ];

  return (
    <section id="ai-dashboard" className="py-24 relative overflow-hidden" style={{ background: 'rgba(3,7,18,0.82)' }}>
      {/* Tech grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,200,150,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,200,150,0.04)_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-center justify-between flex-wrap gap-4"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4 flex items-center gap-3">
              <FiCpu className="text-violet-400 animate-pulse" />
              AI Engineering{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                Dashboard
              </span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full" />
          </div>
          <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 bg-violet-500/10 border border-violet-500/30 rounded-full text-violet-300">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
            SYSTEMS ONLINE: ACTIVE RUNS
          </div>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Column 1: Now Building & Metrics */}
          <div className="space-y-6">

            {/* Now Building Widget */}
            <motion.div
              whileHover={{ y: -4 }}
              className="glass neon-border-violet rounded-2xl p-6 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-violet-500/20 to-transparent rounded-bl-full pointer-events-none" />
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-mono font-bold tracking-widest text-violet-400 uppercase">Now Building</span>
                <FiPlay className="text-violet-400 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-text mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 transition-all">
                Potato Leaf Disease AI
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-6">
                CNN-based deep learning classifier trained on 15,000+ agricultural images across 3 classes, achieving 97% accuracy with GCP cloud deployment.
              </p>

              <div className="bg-[#030712]/80 border border-violet-500/20 rounded-xl p-4 font-mono text-xs">
                <div className="flex justify-between text-muted mb-2">
                  <span>Validation Accuracy:</span>
                  <span className="text-cyan-400 font-bold">97.0%</span>
                </div>
                <div className="w-full bg-[#030712] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full rounded-full"
                    style={{ width: '97%' }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Model Metrics */}
            <motion.div
              whileHover={{ y: -4 }}
              className="glass neon-border-violet rounded-2xl p-6 shadow-xl"
            >
              <h4 className="text-xs font-mono font-bold tracking-widest text-muted uppercase mb-6 flex items-center gap-2">
                <FiActivity /> Live Inference Metrics
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#030712]/60 border border-violet-500/15 rounded-xl p-4 text-center">
                  <p className="text-[10px] font-mono text-muted uppercase">Latency</p>
                  <p className="text-2xl font-bold font-heading text-violet-400 mt-1">18ms</p>
                </div>
                <div className="bg-[#030712]/60 border border-violet-500/15 rounded-xl p-4 text-center">
                  <p className="text-[10px] font-mono text-muted uppercase">Throughput</p>
                  <p className="text-2xl font-bold font-heading text-cyan-400 mt-1">94 req/s</p>
                </div>
                <div className="bg-[#030712]/60 border border-violet-500/15 rounded-xl p-4 text-center">
                  <p className="text-[10px] font-mono text-muted uppercase">GPU Temp</p>
                  <p className="text-2xl font-bold font-heading text-purple-400 mt-1">68°C</p>
                </div>
                <div className="bg-[#030712]/60 border border-violet-500/15 rounded-xl p-4 text-center">
                  <p className="text-[10px] font-mono text-muted uppercase">Memory Usage</p>
                  <p className="text-2xl font-bold font-heading text-cyan-300 mt-1">8.4 GB</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Column 2: Focus Areas & Roadmap */}
          <div className="space-y-6">

            {/* Focus Areas & Tech Stack */}
            <motion.div
              whileHover={{ y: -4 }}
              className="glass neon-border-violet rounded-2xl p-6 shadow-xl"
            >
              <h4 className="text-xs font-mono font-bold tracking-widest text-muted uppercase mb-6 flex items-center gap-2">
                <FiLayers /> Core Areas &amp; Tech Stack
              </h4>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-1.5">
                    <span className="text-text">Deep Learning</span>
                    <span className="text-violet-400">PyTorch, TensorFlow</span>
                  </div>
                  <div className="w-full bg-[#030712] h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full rounded-full" style={{ width: '90%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-medium mb-1.5">
                    <span className="text-text">Natural Language Processing</span>
                    <span className="text-cyan-400">Transformers, LLMs</span>
                  </div>
                  <div className="w-full bg-[#030712] h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-500 to-violet-400 h-full rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-medium mb-1.5">
                    <span className="text-text">Computer Vision</span>
                    <span className="text-purple-400">OpenCV, CNNs</span>
                  </div>
                  <div className="w-full bg-[#030712] h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-violet-400 h-full rounded-full" style={{ width: '70%' }} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Learning Roadmap */}
            <motion.div
              whileHover={{ y: -4 }}
              className="glass neon-border-violet rounded-2xl p-6 shadow-xl"
            >
              <h4 className="text-xs font-mono font-bold tracking-widest text-muted uppercase mb-6 flex items-center gap-2">
                <FiTrendingUp /> Roadmap Node
              </h4>

              <div className="space-y-4">
                {roadmap.map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm font-bold border shrink-0 ${
                      item.completed
                        ? 'bg-violet-500/10 border-violet-500 text-violet-400'
                        : 'bg-[#030712] border-violet-500/20 text-muted'
                    }`}>
                      {item.step}
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-text flex items-center gap-1.5">
                        {item.title}
                        {item.completed && <FiCheckCircle className="text-violet-400 text-xs" />}
                      </h5>
                      <p className="text-xs text-muted mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Column 3: Papers & Logs */}
          <div className="space-y-6">

            {/* Research Papers */}
            <motion.div
              whileHover={{ y: -4 }}
              className="glass neon-border-violet rounded-2xl p-6 shadow-xl"
            >
              <h4 className="text-xs font-mono font-bold tracking-widest text-muted uppercase mb-6 flex items-center gap-2">
                <FiBookOpen /> Research Lab Exploring
              </h4>

              <div className="space-y-4">
                {papers.map((paper, idx) => (
                  <div
                    key={idx}
                    className="bg-[#030712]/60 border border-violet-500/15 rounded-xl p-3.5 flex justify-between items-center group cursor-pointer hover:border-violet-400/40 transition-all"
                  >
                    <div>
                      <h5 className="text-sm font-semibold text-text group-hover:text-violet-300 transition-colors line-clamp-1">
                        {paper.title}
                      </h5>
                      <p className="text-[11px] text-muted mt-1">{paper.authors}</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-violet-500/10 border border-violet-500/20 rounded text-violet-300">
                      {paper.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Run Logs */}
            <motion.div
              whileHover={{ y: -4 }}
              className="glass neon-border-violet rounded-2xl p-6 shadow-xl font-mono text-xs"
            >
              <h4 className="text-xs font-mono font-bold tracking-widest text-muted uppercase mb-6 flex items-center gap-2">
                <FiTerminal /> RUNNING LOGS
              </h4>

              <div className="space-y-4">
                {trainingLogs.map((log, idx) => (
                  <div key={idx} className="flex gap-3">
                    <FiGitCommit className="text-violet-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[10px] text-muted block">{log.time}</span>
                      <span className="text-text mt-0.5 block break-all">{log.event}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AIDashboard;
