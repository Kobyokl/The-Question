'use client'

import { Canvas, useThree} from '@react-three/fiber' 

export default function Scene(){
    return(
        <Canvas>
            <directionalLight position = {[0,10,0]} intensity = {5} />
        </Canvas>
    )
}