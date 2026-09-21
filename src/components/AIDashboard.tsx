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
    <section id="ai-dashboard" className="py-24 relative overflow-hidden" style={{ background: 'rgba(234, 242, 215, 0.65)' }}>
      {/* Tech grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(156,107,168,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(156,107,168,0.06)_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

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
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#3D1A47] mb-4 flex items-center gap-3">
              <FiCpu className="text-[#855092] animate-pulse" />
              AI Engineering{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3D1A47] via-[#6E387B] to-[#9C6BA8]">
                Dashboard
              </span>
            </h2>
            <div className="h-1 w-20 bg-[#855092] rounded-full" />
          </div>
          <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 bg-white/80 border border-[#9C6BA8]/25 rounded-full text-[#6E387B] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#855092] animate-ping" />
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
              className="bg-white/80 border border-[#9C6BA8]/20 rounded-2xl p-6 shadow-sm backdrop-blur-md relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#9C6BA8]/10 to-transparent rounded-bl-full pointer-events-none" />
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-mono font-bold tracking-widest text-[#855092] uppercase">Now Building</span>
                <FiPlay className="text-[#855092] animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-[#3D1A47] mb-2 group-hover:text-[#6E387B] transition-all">
                Potato Leaf Disease AI
              </h3>
              <p className="text-[#6F5179] text-sm leading-relaxed mb-6">
                CNN-based deep learning classifier trained on 15,000+ agricultural images across 3 classes, achieving 97% accuracy with GCP cloud deployment.
              </p>

              <div className="bg-[#F4F8EC]/90 border border-[#9C6BA8]/20 rounded-xl p-4 font-mono text-xs">
                <div className="flex justify-between text-[#6F5179] mb-2">
                  <span>Validation Accuracy:</span>
                  <span className="text-[#3D1A47] font-bold">97.0%</span>
                </div>
                <div className="w-full bg-[#DFEAC5] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#855092] to-[#9C6BA8] h-full rounded-full"
                    style={{ width: '97%' }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Model Metrics */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white/80 border border-[#9C6BA8]/20 rounded-2xl p-6 shadow-sm backdrop-blur-md"
            >
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#855092] uppercase mb-6 flex items-center gap-2">
                <FiActivity /> Live Inference Metrics
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#F4F8EC]/90 border border-[#9C6BA8]/15 rounded-xl p-4 text-center">
                  <p className="text-[10px] font-mono text-[#6F5179] uppercase">Latency</p>
                  <p className="text-2xl font-bold font-heading text-[#3D1A47] mt-1">18ms</p>
                </div>
                <div className="bg-[#F4F8EC]/90 border border-[#9C6BA8]/15 rounded-xl p-4 text-center">
                  <p className="text-[10px] font-mono text-[#6F5179] uppercase">Throughput</p>
                  <p className="text-2xl font-bold font-heading text-[#6E387B] mt-1">94 req/s</p>
                </div>
                <div className="bg-[#F4F8EC]/90 border border-[#9C6BA8]/15 rounded-xl p-4 text-center">
                  <p className="text-[10px] font-mono text-[#6F5179] uppercase">GPU Temp</p>
                  <p className="text-2xl font-bold font-heading text-[#6E387B] mt-1">68°C</p>
                </div>
                <div className="bg-[#F4F8EC]/90 border border-[#9C6BA8]/15 rounded-xl p-4 text-center">
                  <p className="text-[10px] font-mono text-[#6F5179] uppercase">Memory Usage</p>
                  <p className="text-2xl font-bold font-heading text-[#3D1A47] mt-1">8.4 GB</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Column 2: Focus Areas & Roadmap */}
          <div className="space-y-6">

            {/* Focus Areas & Tech Stack */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white/80 border border-[#9C6BA8]/20 rounded-2xl p-6 shadow-sm backdrop-blur-md"
            >
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#855092] uppercase mb-6 flex items-center gap-2">
                <FiLayers /> Core Areas &amp; Tech Stack
              </h4>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-1.5">
                    <span className="text-[#3D1A47]">Deep Learning</span>
                    <span className="text-[#6F5179] text-xs">PyTorch, TensorFlow</span>
                  </div>
                  <div className="w-full bg-[#DFEAC5] h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#855092] to-[#9C6BA8] h-full rounded-full" style={{ width: '90%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-medium mb-1.5">
                    <span className="text-[#3D1A47]">Natural Language Processing</span>
                    <span className="text-[#6F5179] text-xs">Transformers, LLMs</span>
                  </div>
                  <div className="w-full bg-[#DFEAC5] h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#855092] to-[#9C6BA8] h-full rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-medium mb-1.5">
                    <span className="text-[#3D1A47]">Computer Vision</span>
                    <span className="text-[#6F5179] text-xs">OpenCV, CNNs</span>
                  </div>
                  <div className="w-full bg-[#DFEAC5] h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#855092] to-[#9C6BA8] h-full rounded-full" style={{ width: '70%' }} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Learning Roadmap */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white/80 border border-[#9C6BA8]/20 rounded-2xl p-6 shadow-sm backdrop-blur-md"
            >
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#855092] uppercase mb-6 flex items-center gap-2">
                <FiTrendingUp /> Roadmap Node
              </h4>

              <div className="space-y-4">
                {roadmap.map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm font-bold border shrink-0 ${
                      item.completed
                        ? 'bg-[#855092] border-[#855092] text-white shadow-sm'
                        : 'bg-white/80 border-[#9C6BA8]/20 text-[#6F5179]'
                    }`}>
                      {item.step}
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-[#3D1A47] flex items-center gap-1.5">
                        {item.title}
                        {item.completed && <FiCheckCircle className="text-[#855092] text-xs" />}
                      </h5>
                      <p className="text-xs text-[#6F5179] mt-0.5">{item.desc}</p>
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
              className="bg-white/80 border border-[#9C6BA8]/20 rounded-2xl p-6 shadow-sm backdrop-blur-md"
            >
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#855092] uppercase mb-6 flex items-center gap-2">
                <FiBookOpen /> Research Lab Exploring
              </h4>

              <div className="space-y-4">
                {papers.map((paper, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F4F8EC]/90 border border-[#9C6BA8]/15 rounded-xl p-3.5 flex justify-between items-center group cursor-pointer hover:border-[#855092]/40 hover:bg-white transition-all"
                  >
                    <div>
                      <h5 className="text-sm font-semibold text-[#3D1A47] group-hover:text-[#855092] transition-colors line-clamp-1">
                        {paper.title}
                      </h5>
                      <p className="text-[11px] text-[#6F5179] mt-1">{paper.authors}</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#9C6BA8]/15 border border-[#9C6BA8]/25 rounded text-[#6E387B]">
                      {paper.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Run Logs */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white/80 border border-[#9C6BA8]/20 rounded-2xl p-6 shadow-sm backdrop-blur-md font-mono text-xs"
            >
              <h4 className="text-xs font-mono font-bold tracking-widest text-[#855092] uppercase mb-6 flex items-center gap-2">
                <FiTerminal /> RUNNING LOGS
              </h4>

              <div className="space-y-4">
                {trainingLogs.map((log, idx) => (
                  <div key={idx} className="flex gap-3">
                    <FiGitCommit className="text-[#855092] mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[10px] text-[#855092]/80 block">{log.time}</span>
                      <span className="text-[#3D1A47] mt-0.5 block break-all font-sans font-medium">{log.event}</span>
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
