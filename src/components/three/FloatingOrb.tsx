'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function OrbMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.08;
    meshRef.current.rotation.x +=
      (mouseRef.current.y * 0.3 - meshRef.current.rotation.x) * 0.015;
    meshRef.current.rotation.y +=
      (mouseRef.current.x * 0.3 - meshRef.current.rotation.y) * 0.015;
    meshRef.current.rotation.z += 0.002;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color="#10b981"
        roughness={0.1}
        metalness={0.6}
        distort={0.35}
        speed={1.5}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

interface FloatingOrbProps {
  size?: number;
  className?: string;
}

export function FloatingOrb({ size = 180, className }: FloatingOrbProps) {
  return (
    <div
      className={className}
      style={{ width: size, height: size, pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 3]} intensity={2} color="#34d399" />
        <pointLight position={[-3, -2, -2]} intensity={0.6} color="#6366f1" />
        <OrbMesh />
      </Canvas>
    </div>
  );
}
