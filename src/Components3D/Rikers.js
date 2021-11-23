/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'

export default function Rikers({ ...props }) {
  const [expand, setExpand] = useState(null)
  const group = useRef()
  const { nodes, materials } = useGLTF('/rikers1.glb')

  const position = [5, -15, 75]

  const [spring, set] = useSpring(() => ({
    position: [...position],
    config: { 
      mass: 10, 
      friction: 100, 
      tension: 200
    },
  }))

  const animatedProps = useSpring({
    hovered: expand ? [1.01, 1.01, 1.01] : [1, 1, 1]
  });

      useEffect(() => {
        set({ 
          position: [5, -8.5, 75],
        })
      })

  return (
    <a.group
      receiveShadow
      castShadow
      ref={group} 
      {...spring} 
      {...props} 
      scale={animatedProps.hovered}
      onPointerOver={() => setExpand(true)}
      onPointerLeave={() => setExpand(false)}
      dispose={null} 
      // scale={[1, 1, 1]}
      // position={[5, -8, 75]}
      rotation={[0, Math.PI / -3, 0]}
    >
      <group position={[0, 0, -2.2]} rotation={[0, 0, Math.PI / 2]} scale={[0.1, 0.1, 0.1]} receiveShadow castShadow>
        <mesh geometry={nodes['BuildingMesh-00008_1'].geometry} material={materials['BuildingMat-00008.001']} />
        <mesh geometry={nodes['BuildingMesh-00008_2'].geometry} material={materials['BuildingMat-00005']} />
        <mesh geometry={nodes['BuildingMesh-00008_3'].geometry} material={materials['BuildingMat-00021']} />
        <mesh geometry={nodes['BuildingMesh-00008_4'].geometry} material={materials['BuildingMat-00022']} />
        <mesh geometry={nodes['BuildingMesh-00008_5'].geometry} material={materials['BuildingMat-00026']} />
        <mesh geometry={nodes['BuildingMesh-00008_6'].geometry} material={materials['BuildingMat-00028']} />
        <mesh geometry={nodes['BuildingMesh-00008_7'].geometry} material={materials['BuildingMat-00029']} />
        <mesh geometry={nodes['BuildingMesh-00008_8'].geometry} material={materials['BuildingMat-00032']} />
        <mesh geometry={nodes['BuildingMesh-00008_9'].geometry} material={materials['BuildingMat-00033']} />
        <mesh geometry={nodes['BuildingMesh-00008_10'].geometry} material={materials['BuildingMat-00035']} />
        <mesh geometry={nodes['BuildingMesh-00008_11'].geometry} material={materials['BuildingMat-00036']} />
        <mesh geometry={nodes['BuildingMesh-00008_12'].geometry} material={materials['BuildingMat-00038']} />
        <mesh geometry={nodes['BuildingMesh-00008_13'].geometry} material={materials['BuildingMat-00039']} />
        <mesh geometry={nodes['BuildingMesh-00008_14'].geometry} material={materials['BuildingMat-00042']} />
        <mesh geometry={nodes['BuildingMesh-00008_15'].geometry} material={materials['BuildingMat-00043']} />
        <mesh geometry={nodes['BuildingMesh-00008_16'].geometry} material={materials['BuildingMat-00045']} />
        <mesh geometry={nodes['BuildingMesh-00008_17'].geometry} material={materials['BuildingMat-00046']} />
        <mesh geometry={nodes['BuildingMesh-00008_18'].geometry} material={materials['BuildingMat-00049']} />
        <mesh geometry={nodes['BuildingMesh-00008_19'].geometry} material={materials['BuildingMat-00050']} />
        <mesh geometry={nodes['BuildingMesh-00008_20'].geometry} material={materials['BuildingMat-00051']} />
        <mesh geometry={nodes['BuildingMesh-00008_21'].geometry} material={materials['BuildingMat-00052']} />
        <mesh geometry={nodes['BuildingMesh-00008_22'].geometry} material={materials['BuildingMat-00053']} />
        <mesh geometry={nodes['BuildingMesh-00008_23'].geometry} material={materials['BuildingMat-00054']} />
        <mesh geometry={nodes['BuildingMesh-00008_24'].geometry} material={materials['BuildingMat-00056']} />
        <mesh geometry={nodes['BuildingMesh-00008_25'].geometry} material={materials['BuildingMat-00060']} />
        <mesh geometry={nodes['BuildingMesh-00008_26'].geometry} material={materials['BuildingMat-00061']} />
        <mesh geometry={nodes['BuildingMesh-00008_27'].geometry} material={materials['BuildingMat-00063']} />
        <mesh geometry={nodes['BuildingMesh-00008_28'].geometry} material={materials['BuildingMat-00078']} />
      </group>
      {/* <mesh
        geometry={nodes['BuildingMesh-00008001'].geometry}
        material={materials.Material}
        position={[0, -0.01, -2.2]}
        rotation={[0, 0, Math.PI / 2]}
        scale={[0.1, 0.1, 0.1]}
      /> */}
    </a.group>
  )
}

useGLTF.preload('/rikers1.glb')
