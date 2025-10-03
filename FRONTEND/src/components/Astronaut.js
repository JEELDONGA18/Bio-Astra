// src/components/Astronaut.js
import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

import organMapping from "./organmapping.js";

export default function Astronaut({ selectedOrgan, onSelectOrgan }) {
  const modelRef = useRef();
  const { scene } = useGLTF("/astronaut.glb");

  // Store original colors for highlighting
  const originalColors = useRef({});
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (!originalColors.current[child.name]) {
          originalColors.current[child.name] = child.material.color.clone();
        }
        if (organMapping[child.name] === selectedOrgan) {
          child.material.color.set("blue");
          child.material.emissive.set("blue");
          child.material.emissiveIntensity = 0.6;
        } else {
          child.material.color.copy(originalColors.current[child.name]);
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
      position={[1.5, -1.5, -6]} // Keep model centered
      onClick={(e) => {
        e.stopPropagation();
        const clickedOrgan = organMapping[e.object.name] || e.object.name;
        if (onSelectOrgan) onSelectOrgan(clickedOrgan);
      }}
    />
  );
}

// Preload the model
useGLTF.preload("/human_anatomy.glb");

// src/components/Astronaut.js
// import React, { useRef, useEffect } from "react";
// import { useGLTF } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
// import organMapping from "./organmapping.js";

// export default function Astronaut({ selectedOrgan, onSelectOrgan }) {
//   const modelRef = useRef();
//   const { scene } = useGLTF("/astronaut.glb");

//   // Store original colors
//   const originalColors = useRef({});

//   // Highlight organ on selection
// useEffect(() => {
//   scene.traverse((child) => {
//     if (child.isMesh) {
//       if (!originalColors.current[child.name]) {
//         originalColors.current[child.name] = child.material.color.clone();
//       }
//       if (organMapping[child.name] === selectedOrgan) {
//         child.material.color.set("yellow");
//         child.material.emissive.set("yellow");
//         child.material.emissiveIntensity = 0.6;
//       } else {
//         child.material.color.copy(originalColors.current[child.name]);
//         child.material.emissive.set("black");
//         child.material.emissiveIntensity = 0;
//       }
//     }
//   });
// }, [selectedOrgan, scene]);

//   return (
// <primitive
//   ref={modelRef}
//   object={scene}
//   scale={1.5}
//   position={[0, -1.5, 0]} // Keep model centered
//   onClick={(e) => {
//     e.stopPropagation();
//     const clickedOrgan = organMapping[e.object.name] || e.object.name;
//     if (onSelectOrgan) onSelectOrgan(clickedOrgan);
//   }}
// />
//   );
// }

// // Preload model
// useGLTF.preload("/astronaut.glb");
