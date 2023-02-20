import { UsersList } from "ui";
import { Canvas, ThreeElements, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Graphic from "./components/LoginForm/Graphic";
import styles from './components/login-form.module.css'
import NodeGraphic from "./components/LoginForm/NodeGraphic";

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
        <div className="position-absolute w-75 h-100">
          <Graphic />
        </div>

        <form style={{ zIndex: 1 }}>
          <ul className={styles["form-column"]}>
            <li className={styles["form-input"]}><input type="text" placeholder="username" /></li>
            <li className={styles["form-input"]}><input type="text" placeholder="password" /></li>
          </ul>
          <div className={styles["form-column"]}>
            <div style={{ position: "relative" }}>
              <button className="btn btn-success" style={{ float: 'right' }}>Go</button>
            </div>
          </div>
        </form>

      </div>



    </div >
  );
}
