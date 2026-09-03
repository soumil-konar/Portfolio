import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight, ShieldCheck, Terminal, Sparkles, Lock, Layers } from 'lucide-react';
import { sound } from '../utils/audio';
import { PROJECTS } from '../data';
import ProjectModal from './ProjectModal';

/**
 * Editorial Project Archive
 * Inspired by museum-grade design engineering publications and spragadheeshraj.com.
 * Replaces generic sliding cards with an architectural archive table.
 */
const ProjectArchive = ({ 
  isDarkMode, 
  theme, 
  selectedProject, 
  onSelectProject, 
  onHoverProject 
}) => {
  const [filter, setFilter] = useState('ALL');

  // Filter categories
  const categories = ['ALL', 'ENTERPRISE AI', 'OPEN SOURCE', 'MICROSERVICES'];

  const filteredProjects = PROJECTS.filter(project => {
    if (filter === 'ALL') return true;
    if (filter === 'ENTERPRISE AI') return project.isEnterprise;
    if (filter === 'OPEN SOURCE') return !!project.github;
    if (filter === 'MICROSERVICES') return project.tags.some(t => ['FastAPI', 'Docker', 'Microservices'].includes(t));
    return true;
  });

  return (
    <>
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="w-full my-6 sm:my-10"
        id="projects"
      >
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold tracking-widest uppercase text-amber-600 dark:text-amber-400 mb-1">
              <Layers size={13} />
              <span>INDEX // 01 — 06</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-grotesk tracking-tight text-zinc-900 dark:text-zinc-100">
              Selected Systems & Deployments
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 font-sans max-w-xl leading-relaxed">
              Deterministic multi-agent orchestrators, protocol servers, and distributed vector retrieval engines built for production resilience.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#101014] shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  setFilter(cat);
                }}
                className={`px-3 py-1 text-[11px] font-mono rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  filter === cat
                    ? 'bg-amber-500 text-black font-bold shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Table Header (Desktop) */}
        <div className="hidden lg:grid grid-cols-12 gap-4 px-4 py-2 text-[11px] font-mono uppercase tracking-wider font-bold text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800/80">
          <div className="col-span-1">No.</div>
          <div className="col-span-5">System & Core Architecture</div>
          <div className="col-span-3">Domain / Tech Stack</div>
          <div className="col-span-2">Telemetry Metric</div>
          <div className="col-span-1 text-right">Dossier</div>
        </div>

        {/* Project Archive Rows */}
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800/80">
          {filteredProjects.map((project, idx) => {
            const indexNumber = `0${project.id || idx + 1}`;
            const primaryMetric = project.metrics && project.metrics[0] 
              ? `${project.metrics[0].label}: ${project.metrics[0].val}`
              : 'Production Ready';

            return (
              <div
                key={project.id}
                onMouseEnter={() => {
                  sound.playHover();
                  if (onHoverProject) onHoverProject(project);
                }}
                onMouseLeave={() => {
                  if (onHoverProject) onHoverProject(null);
                }}
                onClick={() => {
                  sound.playClick();
                  onSelectProject(project);
                }}
                className="group relative cursor-pointer transition-colors duration-200 hover:bg-amber-500/[0.04] dark:hover:bg-amber-500/[0.03]"
              >
                {/* Desktop Grid Row (lg+) */}
                <div className="hidden lg:grid grid-cols-12 gap-4 px-4 py-5 items-center">
                  {/* Index */}
                  <div className="col-span-1 font-mono text-sm font-bold text-zinc-600 dark:text-zinc-400 group-hover:text-amber-500 transition-colors">
                    {indexNumber}
                  </div>

                  {/* Title & Description */}
                  <div className="col-span-5 pr-4">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-bold font-grotesk tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-amber-500 transition-colors">
                        {project.title}
                      </h3>
                      {project.github ? (
                        <span className="p-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500" title="Open Source Code Available">
                          <Sparkles size={11} className="text-amber-500" />
                        </span>
                      ) : (
                        <span className="p-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500" title="Enterprise Deployment">
                          <Lock size={11} />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans mt-0.5 line-clamp-1 leading-relaxed">
                      {project.desc}
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="col-span-3 flex flex-wrap gap-1.5 items-center">
                    {project.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#16161b] text-zinc-600 dark:text-zinc-400 group-hover:border-amber-500/30 transition-colors font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Primary Telemetry Metric */}
                  <div className="col-span-2 font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                    <span className="truncate">{primaryMetric}</span>
                  </div>

                  {/* Action Link */}
                  <div className="col-span-1 text-right font-mono text-xs font-bold text-zinc-600 dark:text-zinc-400 group-hover:text-amber-500 flex items-center justify-end space-x-1 transition-transform group-hover:translate-x-1">
                    <span>Inspect</span>
                    <ArrowUpRight size={13} />
                  </div>
                </div>

                {/* Mobile / Tablet Card View (< lg) */}
                <div className="lg:hidden p-4 sm:p-5 flex flex-col space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2.5">
                      <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {indexNumber}
                      </span>
                      <h3 className="font-bold text-sm sm:text-base font-grotesk tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-amber-500 transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    <div className="flex items-center space-x-1.5 shrink-0">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.playClick();
                          }}
                          className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-amber-500"
                          title="View GitHub"
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}
                      <span className="p-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-500">
                        <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 text-[11px] font-mono">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center space-x-1 text-[10px]">
                      <ShieldCheck size={12} />
                      <span>{primaryMetric}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Colophon Bar */}
        <div className="mt-4 pt-3 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-600 dark:text-zinc-400 gap-2 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center space-x-2">
            <Terminal size={12} className="text-amber-500" />
            <span>Hover any system row for quantum particle blueprint preview</span>
          </div>
          <div className="flex items-center space-x-3">
            <span>6 Systems Documented</span>
            <span>•</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">100% Deterministic Execution</span>
          </div>
        </div>
      </motion.section>

      {/* Case Study Modal with Live Trace Playground */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => onSelectProject(null)}
        isDarkMode={isDarkMode}
        theme={theme}
      />
    </>
  );
};

export default ProjectArchive;
