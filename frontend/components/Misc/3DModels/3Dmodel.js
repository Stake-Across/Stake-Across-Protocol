import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber'
import { useGLTF, Environment, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

export default function TreeDModel({modelUrl}) {

    function Model(props) {
        const { scene } = useGLTF(modelUrl)
        const modelRef = useRef();

        // Rotación continua del perro
        useFrame(() => {
            if (modelRef.current) {
                modelRef.current.rotation.y += 0.005; // Ajusta la velocidad de rotación según tus necesidades
            }
        });

        return <primitive object={scene} ref={modelRef} {...props} />;
    }

    return (


        <Canvas>
            <ambientLight intensity={0.5} />
            <Model position={[0, -1.5, 0]} rotation={[0, Math.PI / 2, 0]} scale={[2, 2, 2]} />
            <Environment preset="city" />
            <OrbitControls minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} />
        </Canvas>


    );
}
