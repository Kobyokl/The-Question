"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import * as THREE from "three"

function RotatingBox() {
    const meshRef = useRef(); // Reference to the cube mesh
    const box = new THREE.BoxGeometry()
    let theta = 0
    
    useFrame(() => {
        theta += 0.01;
        meshRef.current.rotation.y = 5 * Math.sin(theta); 
        meshRef.current.rotation.x = 5 * Math.sin(theta); 
        meshRef.current.rotation.z = 5 * Math.sin(theta); 
        meshRef.current.position.y = Math.tan(theta); 
    })

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} geometry={box}>
            <meshBasicMaterial color="orange" /> {/* Material for the cube */}
        </mesh>
    );
}
  
function OriginPoint() {
    return (
        <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} /> {/* Small sphere at origin */}
            <meshBasicMaterial color="red" /> {/* Red color for visibility */}
        </mesh>
    );
}

export default function CubeScene() {
    return (
            <Canvas 
                gl={{antialias: true}} 
                dpr={[1,1.5]} 
                camera={{ position: [3, 3, 3] }}
                style={{ background: "#282c34" }}
            >
                <ambientLight intensity={1} />
                <directionalLight position={[5, 5, 5]} />

                <RotatingBox />
                <OriginPoint />

                <OrbitControls />
            </Canvas>
        
        
    );
}
