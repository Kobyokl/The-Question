"use client";
import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree} from "@react-three/fiber";
import { Center, Environment, Line, Sphere, Text3D} from "@react-three/drei";
import { Gradient, LayerMaterial } from "lamina";
import { easing } from "maath";

import Heartss from "./Particles";

import * as THREE from "three";


// camera stuff
function Rig() {
    return(useFrame((state, delta) => {
        easing.damp4(state.camera.position, [0 + state.mouse.x / 2, 0.2 + state.mouse.y / 2, 4], 0.1, 1* delta);
        state.camera.lookAt(0, 0, 0);
    }))
}

export default function Experience() {

    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(-0.05, 3, 0),
            new THREE.Vector3(0, 1.5, 0),
            new THREE.Vector3(0.05, 0, 0),
        ],
        false,
        "catmullrom",
        0.5)
    }, []);

    const linePoints = useMemo(() => curve.getPoints(50), [curve]);

    return (
            <Canvas gl={{antialias: true}} camera={{ position: [0,0,4]}}>
                <ambientLight intensity={1} />
                <directionalLight position={[50, 5, 50]} />
                <Rig/>


                {/* line for text to follow */}
                <Line points={linePoints} color="white" lineWidth={10}  />

                <Text3D letterSpacing={-0.06} size={0.5 } position={[-1.75,0,0]}font="/fonts/Inter_Bold.json">
                    Hey Kaitlyn...
                    <meshStandardMaterial color="red" />
                </Text3D>


                <Heartss count={300} />

                <Environment preset="sunset"/>
                <Sphere scale={[100,100,100]} rotation-y={Math.PI / 2}>
                    <LayerMaterial
                        lighting="physical"
                        transmission={1}
                        side={THREE.BackSide}
                    >
                        <Gradient colorA="#E3B5A4" colorB="#F5E9E2" axes="y" />

                    </LayerMaterial>
                </Sphere>

            </Canvas>
        
        
    );
}
