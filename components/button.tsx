"use client"

import type { ReactNode } from "react"
import styles from "./form.module.css"

interface ButtonProps {
  children: ReactNode
  type?: "button" | "submit" | "reset"
  onClick?: () => void
  isLoading?: boolean
  variant?: "primary" | "secondary"
}

export default function Button({
  children,
  type = "button",
  onClick,
  isLoading = false,
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`${styles.button} ${styles[variant]} ${isLoading ? styles.loading : ""}`}
    >
      {isLoading ? (
        <span className={styles.spinner}>
          <span className={styles.spinnerDot}></span>
          <span className={styles.spinnerDot}></span>
          <span className={styles.spinnerDot}></span>
        </span>
      ) : (
        children
      )}
    </button>
  )
}
