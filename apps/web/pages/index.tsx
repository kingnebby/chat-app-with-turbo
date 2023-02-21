import { UsersList } from "ui";
import { Canvas, ThreeElements, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Graphic from "./components/LoginForm/Graphic";
import NodeGraphic from "./components/LoginForm/NodeGraphic";
import LoginForm from "./components/LoginForm/LoginForm";

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  )

}

export function Home() {
  return (
    <div>
      {/* Header component */}
      <div className="container">
        <h1 className="display-1">A Better Social
          <hr />
        </h1>
      </div>

      {/* Login form */}
      <div
        className="container d-flex flex-column align-items-center justify-content-center position-relative"
        style={{ height: "600px" }}
      >

        {/* Graphic fun */}
        <div className="position-absolute w-75 h-100 opacity-50">
          <Graphic />
        </div>

        <LoginForm />

      </div>



    </div >
  );
}
