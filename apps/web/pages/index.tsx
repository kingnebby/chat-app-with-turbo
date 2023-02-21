import { useSession } from "next-auth/react";
import Graphic from "./components/LoginForm/Graphic";
import LoginForm from "./components/LoginForm/LoginForm";

export default function App() {
  const { data: session } = useSession()
  console.log(session);

  if (!session) {
    return (
      <Home />
    )
  }

  return (
    <>
      <div className="container display-1">
        Welcome {session.user?.name}
        <hr />
      </div>
      <div>
        <a href="/api/auth/signout" className="btn btn-success">Leave</a>
      </div>
    </>
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

        {/* <LoginForm /> */}
        <div style={{ zIndex: 1 }}>
          <a href="/api/auth/signin" className="btn btn-success">Enter</a>
        </div>

      </div>



    </div >
  );
}
