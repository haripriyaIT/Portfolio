import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiStar, FiGitBranch, FiBook, FiExternalLink, FiPieChart, FiActivity } from 'react-icons/fi';

const repositories = [
  {
    name: 'Potato-Leaf-Disease-Prediction',
    description: 'CNN model trained on 15,000+ images with 97% accuracy, deployed on GCP with Postman validation.',
    language: 'Python',
    languageColor: '#3572A5',
    stars: 124,
    forks: 32,
    type: 'Pinned',
    url: 'https://github.com/haripriyaIT/Portfolio',
  },
  {
    name: 'Hospital-Management-System',
    description: 'Web healthcare platform with role dashboards (Admin, Doctor, Patient) built using Java, JDBC & MySQL.',
    language: 'Java',
    languageColor: '#b07219',
    stars: 89,
    forks: 14,
    type: 'Pinned',
    url: 'https://github.com/haripriyaIT/Portfolio',
  },
  {
    name: 'Portfolio',
    description: 'Interactive AI & ML Engineer 3D Quantum Portfolio built with React, Three.js, R3F & Tailwind CSS.',
    language: 'TypeScript',
    languageColor: '#3178c6',
    stars: 45,
    forks: 8,
    type: 'Latest',
    url: 'https://github.com/haripriyaIT/Portfolio',
  },
  {
    name: 'Generative-AI-Workflows',
    description: 'Python-based AI workflows exploring LLM prompting, generative models, and intelligent automation.',
    language: 'Python',
    languageColor: '#3572A5',
    stars: 38,
    forks: 6,
    type: 'Latest',
    url: 'https://github.com/haripriyaIT',
  },
];

const GithubShowcase = () => {
  // Deterministic pseudo-random generator — stable across renders, no flicker
  const contributionGraph = useMemo(() => {
    let seed = 42;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) & 0xffffffff;
      return (seed >>> 0) / 0xffffffff;
    };

    const weeks = 52;
    const days = 7;
    const graph = [];
    for (let w = 0; w < weeks; w++) {
      const week = [];
      for (let d = 0; d < days; d++) {
        const r = rand();
        let level = 'bg-emerald-900/20';
        if (r > 0.7)  level = 'bg-emerald-600/30';
        if (r > 0.85) level = 'bg-emerald-500/60';
        if (r > 0.92) level = 'bg-emerald-500/80';
        if (r > 0.97) level = 'bg-emerald-500';
        week.push(level);
      }
      graph.push(week);
    }
    return graph;
  }, []);

  return (
    <section id="github" className="py-24 relative overflow-hidden" style={{ background: 'rgba(5,11,24,0.75)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,200,150,0.07)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4 flex items-center gap-3">
              <FiGithub className="text-emerald-400" />
              GitHub{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Showcase
              </span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" />
          </div>
          <a
            href="https://github.com/haripriyaIT"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 glass neon-border-violet rounded-lg text-text hover:text-emerald-300 hover:border-emerald-400/60 transition-all font-medium text-sm w-fit"
          >
            Follow @haripriyaIT <FiExternalLink />
          </a>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">

          {/* Left Column: Stats & Graph */}
          <div className="lg:col-span-8 space-y-8">
            {/* Contribution Graph */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass neon-border-violet rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-text mb-6 flex items-center gap-2">
                <FiActivity className="text-emerald-400" /> 582 contributions in the last year
              </h3>

              <div className="overflow-x-auto pb-4 custom-scrollbar">
                <div className="flex gap-1 min-w-max">
                  {contributionGraph.map((week, wIndex) => (
                    <div key={wIndex} className="flex flex-col gap-1">
                      {week.map((level, dIndex) => (
                        <div
                          key={dIndex}
                          className={`w-3.5 h-3.5 rounded-sm ${level} hover:ring-1 hover:ring-emerald-400/50 transition-all cursor-pointer`}
                          title="Contribution activity"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 text-xs text-muted">
                <span>Learn how we count contributions</span>
                <div className="flex items-center gap-2">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-emerald-900/20" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-600/30" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-500/60" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-500/80" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-500" />
                  </div>
                  <span>More</span>
                </div>
              </div>
            </motion.div>

            {/* Repositories Grid */}
            <div>
              <h3 className="text-xl font-heading font-semibold text-text mb-6">Featured Repositories</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {repositories.map((repo, idx) => (
                  <motion.div
                    key={repo.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="glass neon-border-violet rounded-xl p-5 hover:border-emerald-400/60 hover:shadow-[0_0_30px_rgba(0,200,150,0.15)] transition-all flex flex-col h-full group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-lg group-hover:underline cursor-pointer">
                        <FiBook className="text-muted" />
                        {repo.name}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full border border-emerald-500/20 text-xs font-mono font-medium text-emerald-300 bg-emerald-500/10">
                        {repo.type}
                      </span>
                    </div>

                    <p className="text-muted text-sm flex-grow mb-6 leading-relaxed">
                      {repo.description}
                    </p>

                    <div className="flex items-center justify-between text-xs font-medium text-muted mt-auto">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: repo.languageColor }}
                          />
                          {repo.language}
                        </span>
                        <span className="flex items-center gap-1 hover:text-emerald-400 cursor-pointer transition-colors">
                          <FiStar /> {repo.stars}
                        </span>
                        <span className="flex items-center gap-1 hover:text-emerald-400 cursor-pointer transition-colors">
                          <FiGitBranch /> {repo.forks}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Profile Stats */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass neon-border-violet rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-text mb-6 border-b border-emerald-500/20 pb-4">
                GitHub Statistics
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-[#060F1A]/60 border border-emerald-500/15 rounded-lg">
                  <span className="flex items-center gap-2 text-muted"><FiStar className="text-emerald-400" /> Total Stars</span>
                  <span className="font-bold text-text">270</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#060F1A]/60 border border-emerald-500/15 rounded-lg">
                  <span className="flex items-center gap-2 text-muted"><FiBook className="text-emerald-400" /> Repositories</span>
                  <span className="font-bold text-text">24</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#060F1A]/60 border border-emerald-500/15 rounded-lg">
                  <span className="flex items-center gap-2 text-muted"><FiGitBranch className="text-emerald-400" /> Total Commits</span>
                  <span className="font-bold text-text">1,402</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass neon-border-violet rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-text mb-6 border-b border-emerald-500/20 pb-4 flex items-center gap-2">
                <FiPieChart className="text-emerald-400" /> Top Languages
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-text">Python</span>
                    <span className="text-muted">65%</span>
                  </div>
                  <div className="w-full bg-[#030712] rounded-full h-2">
                    <div className="bg-[#3572A5] h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-text">Jupyter Notebook</span>
                    <span className="text-muted">20%</span>
                  </div>
                  <div className="w-full bg-[#030712] rounded-full h-2">
                    <div className="bg-[#DA5B0B] h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-text">TypeScript / React</span>
                    <span className="text-muted">15%</span>
                  </div>
                  <div className="w-full bg-[#030712] rounded-full h-2">
                    <div className="bg-[#3178c6] h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GithubShowcase;
