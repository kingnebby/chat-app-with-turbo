
import { Line, OrbitControls } from '@react-three/drei'
import { Canvas, Vector3 } from '@react-three/fiber'
import React from 'react'
import HoverCamera from './HoverCamera'
import NodeGraphic from './NodeGraphic'

// TODO: move
export type Triplet = [number, number, number]

export const Graphic = () => {
  const vectors: Array<Triplet> = [
    [-2, 2.5, 2],
    [5, 5, 0],
    [-3.5, -3, -2],
    [3.5, -4, 0],
  ]

  const nodes = vectors.map(vector => {
    return <NodeGraphic position={vector} />
  })

  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <OrbitControls />
      <HoverCamera />
      <pointLight position={[20, 20, 20]} />
      <axesHelper />
      {nodes}
      <Line
        points={vectors}
        lineWidth={2}
        color={"#88ff88"}
      />
    </Canvas>
  )
}

export default Graphic