import * as THREE from 'three'
import React, { Suspense, useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { Html, Preload, OrbitControls } from '@react-three/drei'
import image from '../Assets/branding.png'

const store = [
  { name: 'outside', color: 'lightpink', position: [10, 0, -15], url: '/epirectangular-min.png', link: 1 },
  { name: 'inside', color: 'lightblue', position: [15, 0, 0], url: '/epirectangular-min.png', link: 0 }
  // ...
]

function Dome({ texture }) {
  return (
    <group>
      <mesh>
        <sphereBufferGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      <mesh position={[15, 0, -15]} rotation={[0, -0.8, 0]}>
        <planeGeometry args={[ 5, 6]} />
        <meshBasicMaterial color="white" />
        <Html center>
            <img src={image} style={{ transform: "scale(8)" }} />1
        </Html>
      </mesh>
      <mesh position={[20, 0, -1]} rotation={[0, -0.8, 0]}>
        <planeGeometry args={[ 5, 6]} />
        <meshBasicMaterial color="white" />
        <Html center>
            <img src={image} style={{ transform: "scale(8)" }} />1
        </Html>
      </mesh>
    </group>
  )
}

function Portals() {
  const [which, set] = useState(0)
  const { link, ...props } = store[which]
  const maps = useLoader(THREE.TextureLoader, store.map((entry) => entry.url))
  return <Dome onClick={() => set(link)} {...props} texture={maps[which]} />
}

const Gallery = () => {
    return (
        <Canvas frameloop="demand" camera={{ position: [0, 0, 0.1] }}>
        <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2} autoRotate={false} rotateSpeed={-0.5} />
        <Suspense fallback={null}>
            <Preload all />
            <Portals />
        </Suspense>
      </Canvas>
    )
}

export default Gallery;