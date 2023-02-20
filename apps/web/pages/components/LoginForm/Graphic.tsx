
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import NodeGraphic from './NodeGraphic'

export const Graphic = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 16] }}
    >
      {/* <ambientLight intensity={0.01} /> */}
      <OrbitControls />
      {/* <PerspectiveCamera makeDefault position={[20, 20, 20]} /> */}
      {/* <perspectiveCamera position={[100, 100, 100]} /> */}
      <spotLight position={[20, 20, 20]} />
      {/* <axesHelper /> */}

      <NodeGraphic position={[-2, 2.5, 0]} />
      <NodeGraphic position={[5, 5, 0]} />
      <NodeGraphic position={[-3.5, -3, 0]} />
      <NodeGraphic position={[3.5, -4, 0]} />
    </Canvas>
  )
}

export default Graphic