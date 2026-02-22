'use client';

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { motion } from 'framer-motion';
import { User, Briefcase, LayoutGrid, Mail, Zap, FileCode2, type LucideIcon } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  user: User, briefcase: Briefcase, layout: LayoutGrid,
  mail: Mail, zap: Zap, filecode: FileCode2,
};

interface WorkNodeData { label: string; icon: string; panel: string; count?: number; }

export const WorkNode = memo(({ data, selected }: NodeProps<WorkNodeData>) => {
  const Icon = ICONS[data.icon] ?? Zap;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="group"
      style={{ width: 200, fontFamily: 'inherit' }}
    >
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group-hover:scale-[1.02]"
        style={{
          background: selected ? 'rgba(255,255,255,0.05)' : 'rgba(14,14,14,0.95)',
          border: selected
            ? '1px solid rgba(255,255,255,0.25)'
            : '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: selected ? '0 4px 20px rgba(0,0,0,0.6)' : '0 2px 12px rgba(0,0,0,0.5)',
        }}>

        {/* Icon */}
        <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-200"
          style={{
            background: selected ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}>
          <Icon size={12} strokeWidth={1.5}
            style={{ color: selected ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)' }} />
        </div>

        {/* Label */}
        <p className="text-[13px] flex-1 min-w-0 truncate transition-colors duration-200"
          style={{
            color: selected ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.55)',
            fontWeight: 400,
            letterSpacing: '0.01em',
          }}>
          {data.label}
        </p>

        {/* Count */}
        {data.count !== undefined && data.count > 0 && (
          <span className="text-[9px] px-1.5 py-0.5 rounded-md flex-shrink-0"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.35)',
            }}>
            {data.count}
          </span>
        )}
      </div>

      <Handle type="target" position={Position.Top}
        style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.15)', width: 5, height: 5, top: -2.5 }} />
      <Handle type="source" position={Position.Bottom}
        style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.15)', width: 5, height: 5, bottom: -2.5 }} />
    </motion.div>
  );
});
WorkNode.displayName = 'WorkNode';
