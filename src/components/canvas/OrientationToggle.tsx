'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface OrientationToggleProps {
  orientation: 'horizontal' | 'vertical';
  onToggle: (value: 'horizontal' | 'vertical') => void;
}

export function OrientationToggle({ orientation, onToggle }: OrientationToggleProps) {
  return (
    <div
      className="flex items-center gap-1 rounded-xl p-1"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {(['horizontal', 'vertical'] as const).map((mode) => {
        const isActive = orientation === mode;
        return (
          <button
            key={mode}
            onClick={() => onToggle(mode)}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 cursor-pointer"
            style={{ color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)' }}
          >
            {isActive && (
              <motion.div
                layoutId="orientation-pill"
                className="absolute inset-0 rounded-lg"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              />
            )}

            <span className="relative z-10 flex items-center gap-1.5">
              {mode === 'horizontal' ? (
                <>
                  <HorizontalIcon active={isActive} />
                  <span>Radial</span>
                </>
              ) : (
                <>
                  <VerticalIcon active={isActive} />
                  <span>Linear</span>
                </>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function HorizontalIcon({ active }: { active: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: active ? 1 : 0.5 }}>
      {/* center node */}
      <rect x="5" y="4" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" />
      {/* left */}
      <rect x="0.5" y="9.5" width="3" height="3" rx="0.8" stroke="currentColor" strokeWidth="1.1" />
      {/* center-left */}
      <rect x="4.5" y="9.5" width="3" height="3" rx="0.8" stroke="currentColor" strokeWidth="1.1" />
      {/* right */}
      <rect x="10.5" y="9.5" width="3" height="3" rx="0.8" stroke="currentColor" strokeWidth="1.1" />
      {/* lines */}
      <line x1="2" y1="9.5" x2="7" y2="8" stroke="currentColor" strokeWidth="0.8" />
      <line x1="6" y1="9.5" x2="7" y2="8" stroke="currentColor" strokeWidth="0.8" />
      <line x1="12" y1="9.5" x2="7" y2="8" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

function VerticalIcon({ active }: { active: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: active ? 1 : 0.5 }}>
      {/* top */}
      <rect x="5" y="0.5" width="4" height="3" rx="0.8" stroke="currentColor" strokeWidth="1.1" />
      {/* mid */}
      <rect x="5" y="5.5" width="4" height="3" rx="0.8" stroke="currentColor" strokeWidth="1.1" />
      {/* bottom */}
      <rect x="5" y="10.5" width="4" height="3" rx="0.8" stroke="currentColor" strokeWidth="1.1" />
      {/* lines */}
      <line x1="7" y1="3.5" x2="7" y2="5.5" stroke="currentColor" strokeWidth="0.8" />
      <line x1="7" y1="8.5" x2="7" y2="10.5" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}
