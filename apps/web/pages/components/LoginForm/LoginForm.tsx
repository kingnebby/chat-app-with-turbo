import React from 'react'
import styles from './login-form.module.css'

function LoginForm() {
  return (
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

  )
}

export default LoginForm