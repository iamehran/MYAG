'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { AboutPanel } from './AboutPanel';
import { WorkPanel } from './WorkPanel';
import { TemplatesPanel } from './TemplatesPanel';
import { ContactPanel } from './ContactPanel';
import { ServicesPanel } from './ServicesPanel';

function PanelContent({ id }: { id: string }) {
  switch (id) {
    case 'about':     return <AboutPanel />;
    case 'work':      return <WorkPanel />;
    case 'templates': return <TemplatesPanel />;
    case 'services':  return <ServicesPanel />;
    case 'contact':   return <ContactPanel />;
    default:          return null;
  }
}

const TITLES: Record<string, string> = {
  about: 'about', work: 'work', templates: 'templates', services: 'services', contact: 'contact',
};

export function PanelContainer({ panelId, onClose }: { panelId: string; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <motion.div className="absolute inset-0 z-30" onClick={onClose}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }} />

      {/* Panel */}
      <motion.div className="absolute top-0 right-0 h-full z-40 flex flex-col overflow-hidden"
        style={{
          width: 'min(440px, 90vw)',
          background: 'rgba(12,12,12,0.98)',
          borderLeft: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          fontFamily: 'inherit',
        }}
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}>

        {/* Top divider line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'rgba(255,255,255,0.08)' }} />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>
            {TITLES[panelId] ?? panelId}
          </p>
          <button onClick={onClose}
            className="flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-150 cursor-pointer"
            style={{ border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.3)' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.8)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
            }}>
            <X size={12} strokeWidth={1.5} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <PanelContent id={panelId} />
        </div>
      </motion.div>
    </>
  );
}
