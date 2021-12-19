/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'

export default function LPin({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/LPin.glb')
  const [expand, setExpand] = useState(false)

  const position = [55, 50, -46]

  const [spring, set] = useSpring(() => ({
    position: [...position],
    config: { 
      mass: 20, 
      friction: 70, 
      tension: 400
    },
  }))

  const animatedProps = useSpring({
    hovered: expand ? [0, -2, 0] : [0, 0, 0],
  });

      useEffect(() => {
        set({ 
          position: [55, 10, -46],
        })
      })

  return (
    <a.group
      position={animatedProps.hovered}
      onPointerOver={() => setExpand(true)}
      onPointerOut={() => setExpand(false)}
    >
      <a.group 
        ref={group} 
        {...props} 
        dispose={null} 
        scale={[3, 3, 3]} 
        {...spring}
      >
        <mesh geometry={nodes.Sphere.geometry} material={materials['Material.001']} position={[0, 3.14, 0]} />
        <mesh
          geometry={nodes.Cylinder.geometry}
          material={materials['Material.002']}
          position={[0, -1.41, 0]}
          scale={1.53}
        />
      </a.group>
    </a.group>
  )
}

useGLTF.preload('/LPin.glb')
