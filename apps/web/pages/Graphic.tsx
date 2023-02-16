import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { Canvas, ThreeElements, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import gsap from 'gsap'
import styles from './Graphic.module.css'

export default function Graphic() {

  return (
    <div className={styles.graphic}>
      <Canvas id='graphic'>
        <PerspectiveCamera fov={100}></PerspectiveCamera>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[1, 0, 0]} />
        <OrbitControls makeDefault enableDamping enablePan={false} enableZoom={false}
        />
        {/* // autoRotate={true} autoRotateSpeed={5} */}
      </Canvas>
    </div>
  )
}

function Box(props: ThreeElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)

  let camera = useThree(state => state.camera)

  useLayoutEffect(() => {
    console.log(camera)
    gsap.to(camera.position, { z: -10 })
  })

  useLayoutEffect(() => {
    // console.log(mesh.current.position)
    gsap.fromTo(mesh.current.scale, { x: 0, y: 0, z: 0 }, { x: 2, y: 2, z: 2 })
    gsap.fromTo(mesh.current.position, { x: -1, y: -1, z: -1 }, { x: 2, y: 2, z: 2 })
  })


  // const obj = 

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[1, 1, 1]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'hotpink'} />
    </mesh>
  )

}
