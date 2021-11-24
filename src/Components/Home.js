import * as THREE from 'three'
import React, { Suspense, useRef, useMemo, useState } from 'react'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Sky, Html } from '@react-three/drei'
import { Water } from 'three-stdlib'
import { EffectComposer, SSAO, Bloom } from '@react-three/postprocessing'
import { KernelSize, BlendFunction } from 'postprocessing'
// import { Lightmap } from '@react-three/lightmap'

import Rikers from '../Components3D/Rikers';
import Controls from '../Components3D/Controls';
import Pin from '../Components3D/Pin';
import Pin1 from '../Components3D/Pin1';
import Pin2 from '../Components3D/Pin2';

import Text from '../Components3D/Text'

import Branding from '../Assets/branding.png'

extend({ Water })

function Ocean() {
  const ref = useRef()
  const gl = useThree((state) => state.gl)
  // gl={{ antialias: false }}
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
    <div>
      <div>
                <img 
                    src={Branding} 
                    alt="Click to go the Home Page"
                    className="branding"
                    onClick={() => window.appHistory.push("/home")}
                    />
            </div>
      {/* <div id="product-component-1637691212850" style={{display: "none"}}>
      </div> */}
      <Canvas 
        receiveShadow 
        castShadow 
        shadows
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{ alpha: false, antialias: false }}
        camera={{ position: [0, 5, 100], fov: 55, near: 1, far: 20000 }}
      >
        <color attach="background" args={['black']}/>
        <pointLight position={[0, 5, 0]} intensity={8} color={'red'}/>
        {/* <pointLight position={[-100, -100, -100]} intensity={0.5}/> */}
        <pointLight position={[0, 1, 0]} intensity={5} color={'red'} />
        <ambientLight intensity={0.2} />
        {/* <directionalLight intensity={0.1} position={[0, 10, 0]} color="red" distance={5} /> */}
        <spotLight intensity={5} position={[0, 1, 0]} angle={0.2} penumbra={1} castShadow shadow-mapSize={[2048, 2048]} />
        <Suspense fallback={<Html center>Loading...</Html>}>
          {/* <Lightmap> */}
            <Ocean />
            <Rikers />
              <Pin />
              <Text position={[-50, 1, -40]} height={20} scale={0.12} color="red" receiveShadow castShadow >
                Commissary
              </Text>
              <Pin1
                onPointerUp={() => window.appHistory.push("/gallery")}
              />
              <Text position={[0, 1, 0]} height={20} scale={0.12} color="red" receiveShadow castShadow >
                Slot Time
              </Text>
              <Pin2
                onPointerUp={() => window.appHistory.push("/contact")}
              />
              <Text position={[40, 1, -50]} height={20} scale={0.12} color="red" receiveShadow castShadow >
                Law Library
              </Text>
            <Effects />
            <Controls />
          {/* </Lightmap> */}
        </Suspense>
        <Sky scale={10000} sunPosition={[500, 150, -1000]} turbidity={0.01} />
        <OrbitControls />
      </Canvas>
    </div>
  )
}