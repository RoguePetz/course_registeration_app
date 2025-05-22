"use client"

import type { ChangeEvent } from "react"
import styles from "./form.module.css"

interface InputProps {
  label: string
  type: string
  name: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
  required?: boolean
}

export default function Input({ label, type, name, value, onChange, error, required = false }: InputProps) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name} className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  )
}
