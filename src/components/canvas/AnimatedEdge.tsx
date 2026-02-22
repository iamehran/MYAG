'use client';

import React from 'react';
import { getSmoothStepPath, EdgeProps } from 'reactflow';

export function AnimatedEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX, sourceY, sourcePosition,
    targetX, targetY, targetPosition,
    borderRadius: 12,
  });

  return (
    <>
      {/* Static dim base */}
      <path d={edgePath} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
      {/* Flowing animated */}
      <path d={edgePath} fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={1}
        strokeDasharray="5 12"
        strokeLinecap="round"
        style={{ animation: 'edgeFlow 2.5s linear infinite' }} />
    </>
  );
}
