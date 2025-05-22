"use client"
import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import type React from "react"

import styles from "./form.module.css"
import Button from "./button"
import Input from "./input"
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth"
import {auth, db} from '@/firebase'
export default function SignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    department:"",
    matNo:"",
    role:"student",
    phoneNumber:'',
    level:100,
    faculty:'',
    DOB:'',
    gender:'',
    address:'',
    registeredCourses:[]
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

    if (!formData.fullName) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault()

  //   if (!validateForm()) return

  //   setIsLoading(true)
    
  //   // // Simulate API call
  //   // setTimeout(() => {
  //   //   console.log("Sign up submitted:", formData)
  //   //   setIsLoading(false)
  //   //   router.push("/dashboard")
  //   // }, 1500)
  // }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return
    setIsLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData?.email, formData?.password);
      const user = userCredential.user;

      // Store additional info in Firestore under collection "users" with doc id = user.uid
      await setDoc(doc(db, "users", user.uid), {
        name: formData?.fullName,
        department: formData?.department || null,
        mat_no: formData?.matNo||null,
        role: formData?.role||null,
        email: formData?.email,
        phone_number:formData?.phoneNumber,
        level:formData?.level,
        faculty:formData?.faculty,
        DOB:formData?.DOB,
        gender:formData?.gender,
        Address:formData?.address,
        registeredCourses:formData?.registeredCourses
      });
      setIsLoading(false)
      router.push("/dashboard");
    } catch (error) {
      setIsLoading(false)
      alert(error);
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Create your account</h2>

      <Input
        label="Full Name"
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        error={errors.fullName}
        required
      />

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

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        required
      />

      <Button type="submit" isLoading={isLoading}>
        Create Account
      </Button>

      <p className={styles.termsText}>
        By creating an account, you agree to our
        <a href="#" onClick={(e) => e.preventDefault()}>
          {" "}
          Terms of Service
        </a>{" "}
        and
        <a href="#" onClick={(e) => e.preventDefault()}>
          {" "}
          Privacy Policy
        </a>
      </p>
    </form>
  )
}
