'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockProjects, type Project } from '@/lib/mockData';
import { ChevronDown } from 'lucide-react';

const S = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const I = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.38 } } };

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={I} className="rounded-xl overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <button className="w-full flex items-start justify-between gap-3 p-4 text-left cursor-pointer transition-colors duration-150"
        style={{ fontFamily: 'inherit' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
        onClick={() => setOpen((p) => !p)}>
        <div className="flex-1 min-w-0">
          {project.featured && (
            <span className="inline-block text-[9px] uppercase tracking-[0.2em] px-1.5 py-0.5 rounded-md mb-2"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>
              featured
            </span>
          )}
          <p className="text-[13px] leading-snug" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 400 }}>{project.title}</p>
          <p className="text-xs mt-1 leading-relaxed line-clamp-2" style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>{project.summary}</p>
        </div>
        <ChevronDown size={13} strokeWidth={1.5} className="flex-shrink-0 mt-1 transition-transform duration-200"
          style={{ color: 'rgba(255,255,255,0.2)', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden">
            <div className="px-4 pb-4 pt-3 space-y-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              {[['problem', project.problem], ['build', project.approach], ['result', project.outcome]].map(([l, v]) => (
                <div key={l}>
                  <p className="text-[9px] uppercase tracking-[0.25em] mb-1" style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400 }}>{l}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>{v}</p>
                </div>
              ))}

              {project.metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="rounded-lg p-2 text-center"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>{m.value}</p>
                      <p className="text-[9px] mt-0.5 leading-tight" style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>{m.label}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span key={s} className="text-[10px] px-1.5 py-0.5 rounded-md"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function WorkPanel() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  useEffect(() => {
    fetch('/api/content/projects')
      .then((r) => r.json())
      .then((data: Project[]) => { if (data.length) setProjects(data); })
      .catch(() => {});
  }, []);

  return (
    <motion.div variants={S} initial="hidden" animate="show" className="space-y-5" style={{ fontFamily: 'inherit' }}>
      <motion.div variants={I}>
        <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>
          real problems. real systems. real results.
        </p>
      </motion.div>
      <div className="space-y-2">
        {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
      </div>
      <motion.div variants={I}>
        <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.18)', fontWeight: 300 }}>
          more projects available on request. most clients prefer confidentiality.
        </p>
      </motion.div>
    </motion.div>
  );
}
