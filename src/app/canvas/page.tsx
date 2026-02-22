'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const WorkflowCanvas = dynamic(
  () => import('@/components/canvas/WorkflowCanvas').then((m) => m.WorkflowCanvas),
  { ssr: false, loading: () => <CanvasLoader /> }
);

function CanvasLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center dot-grid" style={{ background: '#0C0C0C' }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 rounded-full"
          style={{ border: '1px solid rgba(255,255,255,0.12)', borderTop: '1px solid rgba(255,255,255,0.5)', animation: 'spin 0.9s linear infinite' }} />
        <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'inherit' }}>
          loading
        </p>
      </div>
    </div>
  );
}

export default function CanvasPage() {
  return (
    <motion.div className="w-screen h-screen-safe overflow-hidden" style={{ background: '#0C0C0C' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>
      <WorkflowCanvas />
    </motion.div>
  );
}
