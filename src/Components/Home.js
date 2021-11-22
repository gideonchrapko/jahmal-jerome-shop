import * as THREE from 'three'
import React, { Suspense, useRef, useMemo, useState } from 'react'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import { Water } from 'three-stdlib'
import { EffectComposer, SSAO, Bloom } from '@react-three/postprocessing'
import { KernelSize, BlendFunction } from 'postprocessing'
import { Lightmap } from '@react-three/lightmap'

import Rikers from '../Components3D/Rikers'
import Controls from '../Components3D/Controls'
import Pin from '../Components3D/Pin'

extend({ Water })

function Ocean() {
  const ref = useRef()
  const gl = useThree((state) => state.gl)
  const waterNormals = useLoader(THREE.TextureLoader, '/waternormals.jpeg')
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), [])
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: "0xffffff",
      waterColor: "#000F9B",
      distortionScale: 1.2,
      fog: true,
      format: gl.encoding
    }),
    [waterNormals]
  )
  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta))
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
}

// function Box() {
//   const ref = useRef()
//   useFrame((state, delta) => {
//     ref.current.position.y = 10 + Math.sin(state.clock.elapsedTime) * 20
//     ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += delta
//   })
//   return (
//     <mesh ref={ref} scale={20}>
//       <boxGeometry />
//       <meshStandardMaterial />
//     </mesh>
//   )
// }

function Effects() {
  const ref = useRef()
  useFrame((state) => {
    // Disable SSAO on regress
    ref.current.blendMode.setBlendFunction(state.performance.current < 1 ? BlendFunction.SKIP : BlendFunction.MULTIPLY)
  }, [])
  return (
    <EffectComposer multisampling={8}>
      <SSAO ref={ref} intensity={15} radius={10} luminanceInfluence={0} bias={0.035} />
      <Bloom kernelSize={KernelSize.LARGE} luminanceThreshold={0.55} luminanceSmoothing={0.2} />
    </EffectComposer>
  )
}

export default function Home() {
  return (
    // <div>
    <Canvas receiveShadow castShadow camera={{ position: [0, 5, 100], fov: 55, near: 1, far: 20000 }}>
      <color attach="background" args={['black']}/>
      <pointLight position={[100, 100, 100]} intensity={0.2}/>
      <pointLight position={[-100, -100, -100]} intensity={0.5}/>
      <ambientLight intensity={0.4} />
      {/* <directionalLight intensity={0.1} position={[0, 10, 0]} color="red" distance={5} /> */}
      <spotLight intensity={5} position={[0, 1, 0]} angle={0.2} penumbra={1} castShadow shadow-mapSize={[2048, 2048]} />
      <Suspense fallback={null}>
        {/* <Lightmap> */}
          <Ocean />
          <Rikers />
            <Pin 
              position={[-55, 16, -46]}
              onPointerDown={() => window.appHistory.push("/shop")}
            />
            <Pin 
              position={[55, 20, -46]} 
              rotation={[0.5, 0.3, 0]}
              onPointerDown={() => window.appHistory.push("/gallery")}
            />
            <Pin 
              position={[5, 20, -6]} 
              rotation={[0.5, 0.3, 0]}
              onPointerDown={() => window.appHistory.push("/contact")}
            />
          <Effects />
          <Controls />
          {/* Hello */}
        {/* </Lightmap> */}
      </Suspense>
      <Sky scale={10000} sunPosition={[500, 150, -1000]} turbidity={0.01} />
      <OrbitControls />
    </Canvas>
    // </div>
  )
}