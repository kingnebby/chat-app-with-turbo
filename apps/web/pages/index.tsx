import { UsersList } from "ui";
import { Canvas, ThreeElements, useFrame, useThree } from '@react-three/fiber'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Graphic from "./Graphic";
import styles from './components/login-form.module.css'

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
      <h1 className="display-1">A Better Social
        <hr />
      </h1>


      {/* Login form */}
      <div
        className="container d-flex flex-column align-items-center justify-content-center position-relative"
        style={{ height: "600px" }}
      >

        <form>
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


        {/* Graphic fun */}
        <div className="position-absolute border w-75 h-100">
          <Canvas >
          </Canvas>
        </div>
      </div>



    </div >
  );
}
