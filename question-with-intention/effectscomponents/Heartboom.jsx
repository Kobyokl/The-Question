"use client"

import { Text3D, useAnimations, useGLTF, useMotion, Center } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useMotionValue, useSpring, animate } from "framer-motion";
import { forwardRef, useState, useEffect, useRef } from "react"

import CenteredText from "./centeredtext"

const Model = forwardRef((props, ref) => {
    const motionVal = useMotionValue(0)
    const spring = useSpring(motionVal, { stiffness: 10 })
    
    const { nodes, animations, scene } = useGLTF("/models/heartBOOMactually.glb")
    const { actions } = useAnimations(animations, scene)

    const [textOpacity, setTextOpacity] = useState(0); 
    const [textIndex, setTextIndex] = useState(0); 

    const textSeries = [
        "Who can make\nMy Valentine's Day\nSpecial", 
        "Hey Kaitlyn...", 
        "To me...\nIt's obvious that",
        "You're the ONLY ONE", 
        "Who can make\nMy Valentine's Day\nSpecial", 
        "So...", 
        "Will you be my\nValentine?",
    ];

    const intervalRef = useRef(null);
    const textIndexRef = useRef(0);  
    const textMeshRef = useRef(null);

    CenteredText(textMeshRef, textOpacity);
    
    useEffect(() => {
        const unsubscribe = spring.onChange((val) => { //idk what to do abt this being deprecated
            if (val >= 3) {
                if (intervalRef.current === null) {
                    intervalRef.current = setInterval(() => {
                        if(textIndexRef.current !== 5){
                            animate(textOpacity, 1, { duration: 0.5, onUpdate: (v) => setTextOpacity(v) })
                            animate(textOpacity, 0, { duration: 0.5, onUpdate: (v) => setTextOpacity(v) })
                        }

                        textIndexRef.current += 1;

                        if (textIndexRef.current >= textSeries.length) {
                            clearInterval(intervalRef.current); 
                            intervalRef.current = null; 
                            return;
                        }else{
                            setTextIndex(textIndexRef.current);
                        }

                    }, 3500); 
                }
            } else {
                animate(textOpacity, 0, { duration: 0.5, onUpdate: (v) => setTextOpacity(v) })
                setTextIndex(0); 
                textIndexRef.current = 0; 
                clearInterval(intervalRef.current);
                intervalRef.current = null; 
            }
        });
        return () => {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            unsubscribe();
        };
    }, [spring]);

    useFrame(() => {
        Object.keys(actions).forEach((key) => {
            const action = actions[key];
            action.play().paused = true;
            action.time = spring.get();
        });
    });    
    

    return (
        <group
            onPointerDown={() => motionVal.set(3)}
            onPointerUp={() => motionVal.set(0)}
            ref={ref}
        >
            <Center>
                <Text3D font={"/fonts/Inter_Bold.json"} smooth={0.01} scale={[0.4, 0.4, 0.4]} >
                    {textSeries[textIndex]} 
                    <meshStandardMaterial transparent opacity={textOpacity} color="#980908" />
                </Text3D>
            </Center>
            <primitive object={scene} />
        </group>
    );
});



export default Model;