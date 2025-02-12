"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree} from "@react-three/fiber";
import { Center, Environment, Line, Sphere } from "@react-three/drei";
import { Gradient, LayerMaterial } from "lamina";
import { easing } from "maath";

import * as THREE from "three";

export default function EnvironmentSphere(){
    
    const materialRef = useRef();
    
    let theta = 0;

    useFrame(() => {
        if(materialRef.current){
            theta += 0.01;
            materialRef.current.transmission = Math.cos(.2  *theta) * 0.25 + 0.8;
            
        }    
    });

    return(
        <Sphere scale={[100,100,100]} rotation-y={Math.PI / 2}>
            <LayerMaterial
                ref={materialRef}
                lighting="physical"
                transmission={1}
                side={THREE.BackSide}
            >
                <Gradient colorA="#DE7676"  colorB="#E5ADAD" axes="y"/>

            </LayerMaterial>
        </Sphere>
    )
}