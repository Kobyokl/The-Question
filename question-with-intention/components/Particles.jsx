"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import * as THREE from "three";

// function Rig() {
//     return useFrame((state, delta) => {
//         easing.damp4(
//             state.camera.position,
//             [state.mouse.x / 2, 0.2 + state.mouse.y / 2, 4],
//             0.1,
//             1 * delta
//         );
//         state.camera.lookAt(0, 0, 0);
//     });
// }

// Heart Partciles
export default function SnowParticles(props) {

    const particles = new Array(props.count).fill().map(() => ({
        position: new THREE.Vector3(
            (Math.random() - 0.5) * 15, // x
            (Math.random() * 8) + 14, // y
            (Math.random() - 0.5) * 15, // z
        ), 
        rotation: new THREE.Vector3(
            Math.random() * Math.PI, // x
            Math.random() * Math.PI, // y
            Math.random() * Math.PI, // z
        )
    })); 

    const ref = useRef(); 

    useFrame(() => {
        if (!ref.current) return;
        
        ref.current.children.forEach((particle, i) => {

            particles[i].position.y -= (Math.random() * 0.01 + 0.01);
            
            particles[i].rotation.y += (Math.random()  * 1.5);
            particles[i].rotation.x += (Math.random()  * 1.5);
            particles[i].rotation.z += (Math.random()  * 1.5);

            if (particles[i].position.y < -5) {
                particles[i].position.y = (Math.random() * 5), // y
                particles[i].position.x = (Math.random() - 0.5) * 10, // x
                particles[i].position.z = (Math.random() - 0.5) * 10; // z
            }

            particle.position.copy(particles[i].position);

        });
    });

    return (
        <group ref={ref}>
            {particles.map((particle, i) => (
                <mesh key={i} position={particle.position}>
                    <boxGeometry args={[0.05, 0.05, 0.05]} />
                    <meshStandardMaterial color="red" />
                </mesh>
            ))}
        </group>
    );
}