'use client';

import React, { useCallback, useState, useRef, useEffect } from 'react';
import ReactFlow, {
  Background, BackgroundVariant, Controls,
  useNodesState, useEdgesState,
  ReactFlowProvider, useReactFlow,
  NodeMouseHandler, Node, Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { TriggerNode } from './nodes/TriggerNode';
import { WorkNode } from './nodes/WorkNode';
import { AnimatedEdge } from './AnimatedEdge';
import { PanelContainer } from '@/components/panels/PanelContainer';

const nodeTypes = { trigger: TriggerNode, work: WorkNode };
const edgeTypes = { animated: AnimatedEdge };

function buildNodes(count = 3): Node[] {
  return [
    {
      id: 'trigger', type: 'trigger', position: { x: -100, y: 0 },
      data: { name: 'Mehran Firdous', role: 'AI Automation Architect', tagline: '' },
    },
    { id: 'about',     type: 'work', position: { x: -100, y: 160 }, data: { label: 'about',     icon: 'user',      panel: 'about' } },
    { id: 'work',      type: 'work', position: { x: -100, y: 290 }, data: { label: 'work',      icon: 'briefcase', panel: 'work', count } },
    { id: 'templates', type: 'work', position: { x: -310, y: 430 }, data: { label: 'templates', icon: 'filecode',  panel: 'templates' } },
    { id: 'services',  type: 'work', position: { x:  110, y: 430 }, data: { label: 'services',  icon: 'zap',       panel: 'services' } },
    { id: 'contact',   type: 'work', position: { x: -100, y: 580 }, data: { label: 'contact',   icon: 'mail',      panel: 'contact' } },
  ];
}

const EDGES: Edge[] = [
  { id: 'e1', source: 'trigger',   target: 'about',     type: 'animated', animated: true },
  { id: 'e2', source: 'about',     target: 'work',      type: 'animated', animated: true },
  { id: 'e3', source: 'work',      target: 'templates', type: 'animated', animated: true },
  { id: 'e4', source: 'work',      target: 'services',  type: 'animated', animated: true },
  { id: 'e5', source: 'templates', target: 'contact',   type: 'animated', animated: true },
  { id: 'e6', source: 'services',  target: 'contact',   type: 'animated', animated: true },
];

function CanvasInner() {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [nodes, , onNodesChange] = useNodesState(buildNodes());
  const [edges, , onEdgesChange] = useEdgesState(EDGES);
  const { fitView } = useReactFlow();
  const initialized = useRef(false);

  useEffect(() => {
    fetch('/api/content/projects')
      .then((r) => r.json())
      .then((d: unknown[]) => { if (d.length > 0) buildNodes(d.length); })
      .catch(() => {});
  }, []);

  const onNodeClick: NodeMouseHandler = useCallback((_e, node) => {
    if (node.data.panel) setActivePanel((p) => (p === node.data.panel ? null : node.data.panel));
  }, []);

  const handleInit = useCallback(() => {
    if (!initialized.current) {
      initialized.current = true;
      fitView({ duration: 600, padding: 0.18 });
    }
  }, [fitView]);

  return (
    <div className="relative w-full h-full">
      {/* Dot-grid background */}
      <div className="dot-grid-faint absolute inset-0 pointer-events-none" />

      <ReactFlow
        nodes={nodes} edges={edges}
        onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes} edgeTypes={edgeTypes}
        onNodeClick={onNodeClick} onInit={handleInit}
        fitView fitViewOptions={{ padding: 0.18 }}
        minZoom={0.2} maxZoom={2}
        proOptions={{ hideAttribution: true }}
        className="bg-transparent"
      >
        <Background variant={BackgroundVariant.Dots} gap={32} size={1} color="rgba(255,255,255,0.0)" />
        <Controls position="bottom-left" />
      </ReactFlow>

      {/* Back */}
      <motion.a href="/" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="absolute top-6 left-6 z-20 flex items-center gap-1.5 text-[11px] transition-colors duration-150"
        style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'inherit', letterSpacing: '0.04em' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.2)'; }}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M7 1.5L3 5L7 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        back
      </motion.a>

      {/* Bottom hint */}
      <motion.p className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[9px] tracking-[0.3em] uppercase"
        style={{ color: 'rgba(255,255,255,0.15)', fontFamily: 'inherit' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1.2 }}>
        click a node to explore
      </motion.p>

      <AnimatePresence>
        {activePanel && <PanelContainer panelId={activePanel} onClose={() => setActivePanel(null)} />}
      </AnimatePresence>
    </div>
  );
}

export function WorkflowCanvas() {
  return (
    <ReactFlowProvider>
      <CanvasInner />
    </ReactFlowProvider>
  );
}
