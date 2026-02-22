'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function TorusKnotMesh() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
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
    const t = state.clock.getElapsedTime();
    if (outerRef.current) {
      outerRef.current.rotation.x = Math.sin(t * 0.25) * 0.3 + mouseRef.current.y * 0.15;
      outerRef.current.rotation.y = t * 0.2 + mouseRef.current.x * 0.15;
      outerRef.current.rotation.z = Math.cos(t * 0.15) * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -Math.sin(t * 0.3) * 0.2;
      innerRef.current.rotation.y = -t * 0.15;
    }
  });

  return (
    <group>
      {/* Outer torus knot — solid with distort */}
      <mesh ref={outerRef}>
        <torusKnotGeometry args={[1, 0.32, 180, 20, 2, 3]} />
        <MeshDistortMaterial
          color="#0ea5e9"
          roughness={0.05}
          metalness={0.9}
          distort={0.18}
          speed={0.8}
          transparent
          opacity={0.92}
          emissive="#0369a1"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Inner wireframe ring for depth */}
      <mesh ref={innerRef} scale={0.7}>
        <torusGeometry args={[1.2, 0.015, 8, 80]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} wireframe />
      </mesh>
    </group>
  );
}

interface CrystalObjectProps {
  size?: number;
  className?: string;
}

export function CrystalObject({ size = 420, className }: CrystalObjectProps) {
  return (
    <div
      className={className}
      style={{ width: size, height: size, pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[4, 4, 4]}  intensity={3}   color="#38bdf8" />
        <pointLight position={[-4, -3, -3]} intensity={1} color="#818cf8" />
        <pointLight position={[0, -4, 2]} intensity={0.8} color="#0ea5e9" />
        <TorusKnotMesh />
      </Canvas>
    </div>
  );
}
