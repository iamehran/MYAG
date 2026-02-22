'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Layers, Brain } from 'lucide-react';

const S = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const I = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.38 } } };

const SERVICES = [
  { icon: Wrench, title: 'workflow audit & rescue',     tagline: "your automations are broken. i'll fix them.",
    desc: "i dig into your workflows, find what's breaking, what's fragile, what's missing. you get a fixed, stable system.",
    items: ['full audit report', 'fixed and optimised workflows', 'documentation'], time: '3–5 days' },
  { icon: Layers, title: 'end-to-end automation build', tagline: 'from idea to live system. done.',
    desc: "you have a process that's still manual. i design, build, test, and ship the full automation stack — documented and handed over clean.",
    items: ['requirements scoping', 'full build and testing', 'handover + training'], time: '1–3 weeks' },
  { icon: Brain,  title: 'ai agent integration',        tagline: 'llms that do real work, not just chat.',
    desc: 'ai agents with actual utility — classification, extraction, routing, rag over your knowledge base. connected to your tools.',
    items: ['agent design + prompt engineering', 'n8n/api integration', 'monitoring setup'], time: '1–2 weeks' },
];

export function ServicesPanel() {
  return (
    <motion.div variants={S} initial="hidden" animate="show" className="space-y-5" style={{ fontFamily: 'inherit' }}>
      <motion.div variants={I}>
        <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>
          done-for-you. scoped tight. delivered fast.
        </p>
      </motion.div>

      {SERVICES.map(({ icon: Icon, title, tagline, desc, items, time }) => (
        <motion.div key={title} variants={I} className="rounded-xl p-4 space-y-3"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <Icon size={13} strokeWidth={1.5} style={{ color: 'rgba(255,255,255,0.35)' }} />
            </div>
            <div>
              <p className="text-[13px] leading-snug" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 400 }}>{title}</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>{tagline}</p>
            </div>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>{desc}</p>
          <div className="space-y-1.5">
            {items.map((d) => (
              <div key={d} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.2)' }} />
                <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>{d}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.18)', fontWeight: 300 }}>timeline: {time}</p>
        </motion.div>
      ))}

      <motion.div variants={I}>
        <a href="#" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] transition-all duration-200"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', fontWeight: 400, fontFamily: 'inherit' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)';
            (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
            (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
          }}>
          discuss a project
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </motion.div>
    </motion.div>
  );
}
