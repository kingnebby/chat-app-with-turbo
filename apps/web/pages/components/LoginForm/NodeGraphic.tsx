
import React from 'react'

export type NodeGraphicProps = {
  position: [number, number, number]
}

function NodeGraphic(props: NodeGraphicProps) {
  return (

    <mesh position={props.position} scale={[1, 1, 1]} >
      <sphereGeometry />
      <meshPhysicalMaterial color={"#8888ff"} />
    </mesh >
  )
}

export default NodeGraphic