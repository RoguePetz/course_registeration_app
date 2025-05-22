"use client"
import { useState } from "react"
import Login from "@/components/login"
import SignUp from "@/components/signup"
import styles from "./page.module.css"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.illustrationSide}>
            <div className={styles.logoArea}>
              <div className={styles.logo}>
                <span>Academia</span>
              </div>
            </div>
            <div className={styles.illustrationContent}>
              <h2>Expand Your Knowledge</h2>
              <p>Register for courses and begin your learning journey today.</p>
              <div className={styles.decorativeElement}></div>
            </div>
          </div>

          <div className={styles.formSide}>
            <div className={styles.formHeader}>
              <h1>Course Registration</h1>
              <div className={styles.tabs}>
                <button
                  className={`${styles.tab} ${activeTab === "login" ? styles.active : ""}`}
                  onClick={() => setActiveTab("login")}
                >
                  Login
                </button>
                <button
                  className={`${styles.tab} ${activeTab === "signup" ? styles.active : ""}`}
                  onClick={() => setActiveTab("signup")}
                >
                  Sign Up
                </button>
              </div>
            </div>
            <div className={styles.formContainer}>{activeTab === "login" ? <Login /> : <SignUp />}</div>
          </div>
        </div>
      </div>
    </main>
  )
}
