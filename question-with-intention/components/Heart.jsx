//in the future change this to a heart 
import * as THREE from "three"
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";


export default function Heart(){
    const meshRef = useRef(); // Reference to the cube mesh
    const box = new THREE.BoxGeometry()
    let theta = 0
    
    useFrame(() => {
        theta += 0.01;
        meshRef.current.rotation.y = (Math.cos(6 * theta)) ; 
    })

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} geometry={box}>
            <meshBasicMaterial color="orange" wireframe/> {/* Material for the cube */}
        </mesh>
    );
}