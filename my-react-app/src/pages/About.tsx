import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';


const BinaryCube: React.FC = () => {
  const cubeRef = useRef<THREE.Mesh>(null);

  // Rotation animation for the cube
  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.0005;
      cubeRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial>
        <canvasTexture
          attach="map"
          image={createBinaryTexture()}
          needsUpdate
        />
      </meshStandardMaterial>
    </mesh>
  );
};

// Function to create a binary texture
const createBinaryTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'green';
  ctx.font = '20px monospace';

  for (let y = 20; y < canvas.height; y += 20) {
    for (let x = 0; x < canvas.width; x += 20) {
      ctx.fillText(Math.random() > 0.5 ? '1' : '0', x, y);
    }
  }

  return canvas;
};

const About: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">About Me</h1>
      <p className="mb-6">Hi, I'm Daniel, a Software Engineer passionate about fintech and AI/ML...</p>
      <Canvas style={{ height: 400 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <BinaryCube />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default About;
