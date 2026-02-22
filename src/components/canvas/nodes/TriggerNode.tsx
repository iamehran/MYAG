'use client';

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { motion } from 'framer-motion';

interface TriggerNodeData { name: string; role: string; tagline: string; }

export const TriggerNode = memo(({ data, selected }: NodeProps<TriggerNodeData>) => (
  <motion.div
    initial={{ opacity: 0, y: -6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    style={{ width: 200 }}
  >
    <div className="rounded-xl px-5 py-4 transition-all duration-200"
      style={{
        background: 'rgba(16,16,16,0.97)',
        border: selected
          ? '1px solid rgba(255,255,255,0.3)'
          : '1px solid rgba(255,255,255,0.12)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: selected
          ? '0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.8)'
          : '0 4px 24px rgba(0,0,0,0.7)',
        fontFamily: 'inherit',
      }}>

      {/* Top line */}
      <div className="absolute top-0 left-5 right-5 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />

      {/* Trigger label */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.6)' }} />
        <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>
          trigger
        </span>
      </div>

      {/* Name */}
      <p className="text-[13px] leading-tight mb-0.5" style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 400 }}>
        {data.name}
      </p>

      {/* Role */}
      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>
        {data.role}
      </p>
    </div>

    <Handle type="source" position={Position.Bottom}
      style={{ background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.15)', width: 6, height: 6, bottom: -3 }} />
  </motion.div>
));
TriggerNode.displayName = 'TriggerNode';
