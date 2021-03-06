/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Shirt({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/Shirt1.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.T_Shirt_V2.geometry}
        material={materials.wire_177148027}
        position={[0.03, 0.19, -0.05]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={1}
      />
    </group>
  )
}

useGLTF.preload('/Shirt1.glb')
