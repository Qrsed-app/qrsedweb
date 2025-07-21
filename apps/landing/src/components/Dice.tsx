import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Float } from '@react-three/drei'
import type { Group } from 'three'
import { Fire, useFire } from '@wolffo/three-fire'
import { motion } from 'framer-motion'

function DiceModel() {
  const { scene } = useGLTF('/dice3.glb')
  const meshRef = useRef<Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1.5}>
      <group ref={meshRef}>
        <primitive
          object={scene}
          scale={[0.5, 0.5, 0.5]}
          position={[0, -2.1, 0]}
          rotation-x={-0.3}
        />
      </group>
    </Float>
  )
}

interface DiceProps {
  className?: string
}

export default function Dice({ className = '' }: DiceProps) {
  const fireRef = useFire()

  return (
    <motion.div
    className={`absolute inset-0 -z-10 ${className}`}
    initial={{ opacity: 0}}
    animate={{ opacity: 1 }}
    transition={{
      duration: 1.5,
      delay: 3,
      type: 'spring',
      stiffness: 60,
      damping: 12
    }}
     >
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        dpr={[1, 2]}
        style={{ background: 'transparent', height: '100%', width: '100%' }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0)
          console.log('Canvas created')
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <DiceModel />
        <Fire
          ref={fireRef.ref}
          texture="/Fire.png"
          color="#4a0372"
          magnitude={0.8}
          lacunarity={1.7}
          gain={0.5}
          iterations={10}
          octaves={2}
          scale={[4, 8, 4]}
          position={[0, 0.8, 0]}
          rotation={[-0.4, 0, 0]}
        />
      </Canvas>
    </motion.div>
  )
}
useGLTF.preload('/dice3.glb')
