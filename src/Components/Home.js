import * as THREE from 'three';
import React, { Suspense, useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky, Html } from '@react-three/drei';
import { Water } from 'three-stdlib';
import { EffectComposer, SSAO, Bloom } from '@react-three/postprocessing';
import { KernelSize, BlendFunction } from 'postprocessing';

import { a } from '@react-spring/three';
import Navbar from './Navigation/Navbar';

import Rikers from '../Components3D/Rikers';
import Controls from '../Components3D/Controls';

import Text from '../Components3D/Text';
import LPin from '../Components3D/LPin';
import LPin1 from '../Components3D/LPin1';
import LPin2 from '../Components3D/LPin2';

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
function Effects() {
  const ref = useRef()
  useFrame((state) => {
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
  const [expand, setExpand] = useState(false);
  const [expand1, setExpand1] = useState(false);
  const [expand2, setExpand2] = useState(false);
  const [maxSize, setMaxSize] = useState()

  const [toggle, setToggle] = useState(false)
	console.log(toggle)

  useEffect(() => {
    const size = document.documentElement.clientWidth / 150
    if (size <= 6 ) {
      return setMaxSize(1000)
    } 
    if (size >= 6 ) {
      return setMaxSize(100)
    }
  },[])

  return (
    <div>
      <Navbar />
      <Canvas 
        receiveShadow 
        castShadow 
        shadows
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{ alpha: false, antialias: false }}
        camera={{ position: [0, 5, `${maxSize}`], fov: 55, near: 1, far: 20000 }}
        // camera={{ position: [20, 20, `${maxSize}`], fov: 40, near: 1, far: 2000 }}
      >
        <pointLight position={[20, 10, 20]} intensity={2} color={'#FFFBE1'}/>
        <pointLight position={[-200, 20, -200]} intensity={1} color={'white'} />
        <ambientLight intensity={0.2} />
        <Suspense fallback={<Html>Loading..</Html>}>
            <Ocean />
            <Rikers />
              <group
              onPointerOver={() => setExpand(true)}
              onPointerOut={() => setExpand(false)}
            >
              <LPin 
                onPointerUp={() => window.appHistory.push("/commissary")}
                // onClick={() => setToggle(!toggle)}
              />
            </group>
              <a.group position={[-60, 3, -40]}>
                <Text 
                  height={20} 
                  scale={0.2}
                  color={expand ? "white" : "red"} receiveShadow castShadow 
                  onPointerUp={() => window.appHistory.push("/commissary")}
                  // onClick={() => setToggle(!toggle)}
                  >
                  Commissary
                </Text>
              </a.group>
              <group
                onPointerOver={() => setExpand2(true)}
                onPointerOut={() => setExpand2(false)}                
              >
                <LPin1 
                  onPointerUp={() => window.appHistory.push("/slot-time")}
                />
              </group>
              <a.group position={[45, 3, -40]}>
                <Text 
                  height={20} 
                  scale={0.2} 
                  color={expand2 ? "white" : "red"} receiveShadow castShadow 
                  onPointerUp={() => window.appHistory.push("/slot-time")}
                  >
                  Slot Time
                </Text>
              </a.group>
              <group
                onPointerOver={() => setExpand1(true)}
                onPointerOut={() => setExpand1(false)}                
              >
                <LPin2 
                  onPointerUp={() => window.appHistory.push("/law-library")}
                />
              </group>
              <a.group position={[0, 3, 0]}>
                <Text 
                  height={20} 
                  scale={0.2} 
                  color={expand1 ? "white" : "red"} receiveShadow castShadow 
                  onPointerUp={() => window.appHistory.push("/law-library")}
                >
                  Law Library
                </Text>
              </a.group>
          <Effects />
          <Controls />
        </Suspense>
        <Sky scale={10000} sunPosition={[500, 150, -1000]} turbidity={0.01} />
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  )
}