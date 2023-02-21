import { PerspectiveCamera } from '@react-three/drei'
import { useFrame, Vector3 } from '@react-three/fiber'
import { useRef } from 'react'

function HoverCamera() {
  const ref = useRef<THREE.Camera>()

  useFrame((state) => {
    const yOffset = Math.cos(state.clock.elapsedTime / 2) * 0.05
    const xOffset = Math.cos(state.clock.elapsedTime / 1.5) * 0.05
    state.camera.position.y += yOffset
    state.camera.position.x += xOffset
  })

  // defaults
  const cameraOptions = { fov: 75, near: 0.1, far: 1000 }
  const position: Vector3 = [0, 0, 14]

  return (
    <PerspectiveCamera
      ref={ref}
      makeDefault
      position={position}
      {...cameraOptions}
    />
  )
}

export default HoverCamera