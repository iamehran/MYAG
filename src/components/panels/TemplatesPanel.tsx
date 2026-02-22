'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mockTemplates, type Template } from '@/lib/mockData';
import { Github, Download } from 'lucide-react';

const S = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const I = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.38 } } };

export function TemplatesPanel() {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);

  useEffect(() => {
    fetch('/api/content/templates')
      .then((r) => r.json())
      .then((data: Template[]) => { if (data.length) setTemplates(data); })
      .catch(() => {});
  }, []);

  return (
    <motion.div variants={S} initial="hidden" animate="show" className="space-y-5" style={{ fontFamily: 'inherit' }}>
      <motion.div variants={I}>
        <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>
          plug-and-play workflows. configure credentials and ship.
        </p>
      </motion.div>

      {templates.map((t) => (
        <motion.div key={t.id} variants={I} className="rounded-xl p-4 group"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-start justify-between gap-3 mb-2">
            <p className="text-[13px] leading-snug" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>{t.title}</p>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {[t.downloadUrl && { icon: Download, href: t.downloadUrl }, t.githubUrl && { icon: Github, href: t.githubUrl }]
                .filter(Boolean).map((link) => {
                  if (!link) return null;
                  const { icon: Icon, href } = link as { icon: typeof Download; href: string };
                  return (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-150"
                      style={{ border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.25)' }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)';
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.25)';
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                      }}>
                      <Icon size={11} strokeWidth={1.5} />
                    </a>
                  );
                })}
            </div>
          </div>
          <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>{t.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {t.stack.map((s) => (
              <span key={s} className="text-[10px] px-1.5 py-0.5 rounded-md"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      ))}

      <motion.div variants={I}>
        <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.18)', fontWeight: 300 }}>
          more templates released regularly.
        </p>
      </motion.div>
    </motion.div>
  );
}
