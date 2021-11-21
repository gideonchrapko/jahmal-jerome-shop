import React, { useRef, useEffect } from 'react'
import { extend, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

export default function Controls({ disable, ...props }) {
  const { camera, gl } = useThree()
  const ref = useRef()
  useFrame(() => ref.current.update())

  useEffect(() => {
    if (disable) {
      ref.current.addEventListener('start', () => disable(true))
      ref.current.addEventListener('end', () => disable(false))
    }
  }, [disable])

  return (
    <orbitControls
      ref={ref}
      target={[0, 0, 0]}
      enableDamping
      enableZoom={false}
      enablePan={false}
      enableRotate={true}
      dampingFactor={0.1}
      rotateSpeed={0.01}
      minPolarAngle={Math.PI / 2.7}
      maxPolarAngle={Math.PI / 2.7}
      {...props}
      args={[camera, gl.domElement]}
    />
  )
}

