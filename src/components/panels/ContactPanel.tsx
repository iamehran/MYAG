'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mail, Linkedin, ArrowUpRight } from 'lucide-react';

const S = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const I = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.38 } } };

export function ContactPanel() {
  return (
    <motion.div variants={S} initial="hidden" animate="show" className="space-y-5" style={{ fontFamily: 'inherit' }}>
      <motion.div variants={I} className="space-y-2">
        <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}>
          got a broken system? a process that&apos;s still manual?
        </p>
        <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>
          let&apos;s talk. no fluff, no long discovery calls unless you need one.
        </p>
      </motion.div>

      {/* Primary — Calendly */}
      <motion.div variants={I}>
        <a href="https://calendar.app.google/UeZeWyAf4EiXXyyr5" target="_blank" rel="noopener noreferrer"
          className="group w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'inherit' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
          }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Calendar size={15} strokeWidth={1.5} style={{ color: 'rgba(255,255,255,0.55)' }} />
            </div>
            <div>
              <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 400 }}>book a 30-min call</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>calendly · free</p>
            </div>
          </div>
          <ArrowUpRight size={13} strokeWidth={1.5} style={{ color: 'rgba(255,255,255,0.3)' }} />
        </a>
      </motion.div>

      {/* Secondary links */}
      <motion.div variants={I} className="space-y-2">
        {[
          { icon: Mail,     label: 'firdousmehran@gmail.com',   sub: 'email',    href: 'mailto:firdousmehran@gmail.com' },
          { icon: Linkedin, label: '/in/reachmehran',       sub: 'linkedin', href: 'https://www.linkedin.com/in/reachmehran/' },
        ].map(({ icon: Icon, label, sub, href }) => (
          <a key={sub} href={href} target="_blank" rel="noopener noreferrer"
            className="group w-full flex items-center justify-between p-3.5 rounded-xl transition-all duration-150"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: 'inherit' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; }}>
            <div className="flex items-center gap-3">
              <Icon size={13} strokeWidth={1.5} style={{ color: 'rgba(255,255,255,0.25)' }} />
              <div>
                <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>{label}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 300 }}>{sub}</p>
              </div>
            </div>
            <ArrowUpRight size={11} strokeWidth={1.5}
              className="opacity-0 group-hover:opacity-40 transition-opacity"
              style={{ color: 'rgba(255,255,255,0.6)' }} />
          </a>
        ))}
      </motion.div>

      <motion.div variants={I}>
        <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.22)', fontWeight: 300 }}>
            helpful to mention: what&apos;s broken, how big your team is, and what you&apos;ve already tried. saves us both time.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
