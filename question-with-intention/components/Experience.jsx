"use client";
import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree} from "@react-three/fiber";
import { Center, Environment, Line, Sphere } from "@react-three/drei";
import { Gradient, LayerMaterial } from "lamina";
import { easing } from "maath";

import Heartss from "./Particles";
import Heart from "./Heart";
import EnvironmentSphere from "./EnvironmentSphere";

import * as THREE from "three";



// camera and environment stuff


function Rig() {
    return(useFrame((state, delta) => {
        easing.damp4(state.camera.position, [0 + state.mouse.x / 2, 0.2 + state.mouse.y / 2, 4], 0.1, 1* delta);
        state.camera.lookAt(0, 0, 0);

        
    }))
}

export default function Experience() {

    return (
            <Canvas gl={{antialias: true}} camera={{ position: [0,0,4]}}>
                <ambientLight intensity={1} />
                <directionalLight position={[50, 5, 50]} />
                <Rig/>
            
                <Heartss count={300} />

                <Heart/>

                <Environment preset="dawn"/>
                <EnvironmentSphere/>

            </Canvas>
        
        
    );
}
