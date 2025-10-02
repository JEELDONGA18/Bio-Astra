// src/components/Astronaut.js
import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";


export default function Astronaut({ selectedOrgan, onSelectOrgan }) {
  const modelRef = useRef();
  const { scene } = useGLTF("/astronaut.glb");

  // Store original colors for highlighting
  const originalColors = useRef({});


  // Highlight selected organ
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (!originalColors.current[child.name]) {
          originalColors.current[child.name] = child.material.color.clone();
        }

        if (child.name === selectedOrgan) {
          child.material.color.set("gray");
          child.material.emissive.set("gray");
          child.material.emissiveIntensity = 0.5;
        } else {
          child.material.color.set(originalColors.current[child.name]);
          child.material.emissive.set("black");
          child.material.emissiveIntensity = 0;
        }
      }
    });
  }, [selectedOrgan, scene]);

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={1.5}
      position={[1.5, -1.5, -6]} // Model stays in this position
      onClick={(e) => {
        e.stopPropagation();
        if (onSelectOrgan) onSelectOrgan(e.object.name);
      }}
    />
  );
}

// Preload the model
useGLTF.preload("/human_anatomy.glb");
