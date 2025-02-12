"use client"

import * as THREE from "three"
import { Suspense, useRef, useMemo, useState} from "react";
import { useFrame } from "@react-three/fiber";
import { Center, Line, Text3D} from "@react-three/drei";
import { useMotionValue } from "framer-motion";

import Model from "../effectscomponents/Heartboom";

const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

export default function Heart() {
    let theta = 0;

    const modelRef = useRef();
    
    const [isStarted, setStarted] = useState(false);

    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(-0.05, 5, 0), 
            new THREE.Vector3(0, 1.5, 0),     
            new THREE.Vector3(0.05, 0, 0),    
        ], false, "catmullrom", 0.5);
    }, []);
    
    const linePoints = useMemo(() => curve.getPoints(50), [curve]);
    
    const progressRef = useRef(0); 
    

    useFrame(() => {
        if (modelRef.current && progressRef.current < 1) {
            theta += .003;
            progressRef.current = easeOutCubic(theta);;  
            const position = curve.getPointAt(progressRef.current);
            
            modelRef.current.position.set(position.x, position.y, position.z);
        }
    });

    return (
        <Suspense fallback={null}>
            <Line points={linePoints} color={"white"} lineWidth={10} transparent opacity={0} />

                <Model ref={modelRef} />
        </Suspense>
    );
}