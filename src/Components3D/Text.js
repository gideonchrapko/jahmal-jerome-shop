import React from 'react'
import data from '@compai/font-inter/data/typefaces/normal-800.json'
import * as THREE from 'three'
import { useMemo } from 'react'

const font = new THREE.FontLoader().parse(data)

function Text({ children, scale = 0.2, height = 10, color = '#000000', ...props }) {
  const config = useMemo(
    () => ({
      font,
      size: 25,
      height,
      curveSegments: 32,
      bevelEnabled: true,
      bevelThickness: 4,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 16
    }),
    [height]
  )
  
  return (
    <mesh scale={scale} {...props}>
      <textGeometry args={[children, config]} />
      <meshPhysicalMaterial color={color} clearcoat={1} clearcoatRoughness={0.1} metalness={0.1} roughness={0.1} />
    </mesh>
  )
}

export default Text