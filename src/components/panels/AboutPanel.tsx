'use client';

import React from 'react';
import { motion } from 'framer-motion';

const SKILLS = ['n8n','zapier','make','api integration','webhooks','ai agents','llms',
  'openai','anthropic','rag','rest apis','oauth','process automation',
  'internal tools','data pipelines','typescript','next.js'];

const S = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const I = { hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

const mono = { fontFamily: 'inherit' };

export function AboutPanel() {
  return (
    <motion.div variants={S} initial="hidden" animate="show" className="space-y-7" style={mono}>

      {/* Identity */}
      <motion.div variants={I} className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>
          mf
        </div>
        <div>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 400 }}>mehran firdous</p>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>ai automation architect</p>
        </div>
      </motion.div>

      {/* Story */}
      <motion.div variants={I} className="space-y-3">
        {[
          'I build automation systems that actually work — end to end, without the duct tape.',
          "whether it's an n8n workflow pulling data from 12 different sources, a zapier chain saving your ops team 40 hours a week, or an ai agent handling support while you sleep — I build it, debug it, and make it fast.",
          'my core belief: every problem has a solution. my job is to find it.',
        ].map((t, i) => (
          <p key={i} className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 300 }}>{t}</p>
        ))}
      </motion.div>

      {/* What I do */}
      <motion.div variants={I}>
        <p className="text-[9px] tracking-[0.25em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400 }}>what I do</p>
        <div className="space-y-2.5">
          {[
            ['—', 'fix broken automations and rescue legacy workflows'],
            ['—', 'connect any tool to any tool via rest, webhooks, oauth'],
            ['—', 'build ai agents that do real work, not just chat'],
            ['—', 'design internal tools and ops dashboards from scratch'],
          ].map(([d, t]) => (
            <div key={t} className="flex items-start gap-3">
              <span className="text-xs flex-shrink-0 mt-0.5" style={{ color: 'rgba(255,255,255,0.2)' }}>{d}</span>
              <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>{t}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stack */}
      <motion.div variants={I}>
        <p className="text-[9px] tracking-[0.25em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400 }}>stack</p>
        <div className="flex flex-wrap gap-1.5">
          {SKILLS.map((s) => (
            <span key={s} className="text-[11px] px-2 py-0.5 rounded-md"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
              {s}
            </span>
          ))}
        </div>
      </motion.div>

    </motion.div>
  );
}
