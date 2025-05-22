"use client"
import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import type React from "react"
import styles from "./form.module.css"
import Button from "./button"
import Input from "./input"
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault()

  //   if (!validateForm()) return

  //   setIsLoading(true)

  //   // Simulate API call
  //   setTimeout(() => {
  //     console.log("Login submitted:", formData)
  //     setIsLoading(false)
  //     router.push("/dashboard")
  //   }, 1500)
  // }
  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return
    setIsLoading(true)
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setIsLoading(false)
      router.push("/dashboard");
    } catch (error) {
      setIsLoading(false)
      alert(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Welcome back</h2>

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
      />

      <div className={styles.forgotPassword}>
        <a href="#" onClick={(e) => e.preventDefault()}>
          Forgot password?
        </a>
      </div>

      <Button type="submit" isLoading={isLoading}>
        Login
      </Button>

      <div className={styles.socialLogin}>
        <span className={styles.socialLoginText}>Or continue with</span>
      </div>
    </form>
  )
}
