'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { EtherealShadow } from '@/components/ui/etheral-shadow';

export default function LandingPage() {
  const router = useRouter();
  const [activating, setActivating] = useState(false);

  const handleRun = () => {
    if (activating) return;
    setActivating(true);
    setTimeout(() => router.push('/canvas'), 650);
  };

  return (
    <div className="relative w-screen h-screen-safe overflow-hidden flex items-center justify-center"
      style={{ background: '#0C0C0C' }}>

      {/* Ethereal shadow background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <EtherealShadow
          color="rgba(210, 210, 210, 0.9)"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 1, scale: 1.2 }}
          sizing="fill"
        />
      </div>

      {/* Vignette — keeps text readable */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(12,12,12,0.3) 0%, rgba(12,12,12,0.97) 100%)',
        }} />

      {/* Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center gap-5 sm:gap-8 px-6 text-center max-w-xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Eyebrow */}
        <motion.p
          className="text-[10px] tracking-[0.35em] uppercase"
          style={{ color: 'rgba(255,255,255,0.22)', fontWeight: 300 }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          portfolio · mehran firdous
        </motion.p>

        {/* Main headline */}
        <motion.div
          className="space-y-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
        >
          <h1 className="text-[clamp(1.6rem,6vw,2.4rem)] leading-[1.15] tracking-[-0.01em]"
            style={{ fontWeight: 300, color: 'rgba(255,255,255,0.85)' }}>
            there&apos;s no problem
          </h1>
          <h1 className="text-[clamp(1.6rem,6vw,2.4rem)] leading-[1.15]"
            style={{ fontWeight: 300, color: 'rgba(255,255,255,0.45)' }}>
            without a solution.
          </h1>
        </motion.div>

        {/* Sub */}
        <motion.p
          className="text-sm"
          style={{ fontWeight: 300, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.02em' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          and I am here to Figure it Out.
        </motion.p>

        {/* Button — min-h-[44px] for mobile touch target */}
        <motion.button
          onClick={handleRun}
          className="group flex items-center gap-3 px-6 py-3 min-h-[44px] rounded-lg cursor-pointer transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.65)',
            fontSize: '13px',
            fontFamily: 'inherit',
            fontWeight: 400,
            letterSpacing: '0.04em',
          }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          whileHover={{
            background: 'rgba(255,255,255,0.08)',
            borderColor: 'rgba(255,255,255,0.22)',
            color: 'rgba(255,255,255,0.9)',
          }}
          whileTap={{ scale: 0.97 }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="opacity-60 group-hover:opacity-100 transition-opacity">
            <rect x="5.5" y="0.5" width="7" height="7" rx="1" transform="rotate(45 5.5 0.5)"
              stroke="currentColor" strokeWidth="1.2" />
          </svg>
          run workflow
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"
            className="opacity-30 group-hover:opacity-60 group-hover:translate-x-0.5 transition-all duration-200">
            <path d="M1 5.5H10M7 2L10 5.5L7 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Transition overlay */}
      <AnimatePresence>
        {activating && (
          <motion.div className="fixed inset-0 z-50" style={{ background: '#0C0C0C' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 1, 1] }} />
        )}
      </AnimatePresence>
    </div>
  );
}
