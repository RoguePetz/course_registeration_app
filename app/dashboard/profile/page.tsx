"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { auth, db } from "@/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"

interface UserData {
  name?: string
  email?: string
  phone_number?: string
  DOB?: string
  gender?: string
  address?: string
  mat_no?: string
  department?: string
  faculty?: string
  level?: number
  entry_year?: string
  expected_graduation?: string
  cgpa?: string
  academic_status?: string
  // Add other fields as needed
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch additional user data
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data() as UserData
          setUserData(data)
          setFormData(data)
        }
      } else {
        router.push("/")
      }
    })

    return () => unsubscribe()
  }, [router])

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const isMobile = windowWidth < 768

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const toggleEditMode = () => {
    if (isEditing) {
      // Reset form data to original data if canceling
      setFormData(userData)
    }
    setIsEditing(!isEditing)
  }

  const saveChanges = async () => {
    if (!formData || !auth.currentUser) return;
  
    setIsLoading(true);
    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, formData as Partial<UserData>);
      setUserData(formData);
      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Responsive styles
  const styles = {
    dashboard: {
      padding: isMobile ? "15px" : "20px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    pageTitle: {
      fontSize: isMobile ? "20px" : "24px",
      fontWeight: "bold",
      marginBottom: isMobile ? "15px" : "20px",
      textAlign: isMobile ? ("center" as const) : ("left" as const),
    },
    profileContainer: {
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    },
    profileHeader: {
      display: "flex",
      flexDirection: isMobile ? ("column" as const) : ("row" as const),
      alignItems: "center",
      padding: isMobile ? "15px" : "20px",
      borderBottom: "1px solid #eaeaea",
      gap: isMobile ? "10px" : "0",
    },
    profileAvatar: {
      width: isMobile ? "80px" : "60px",
      height: isMobile ? "80px" : "60px",
      borderRadius: "50%",
      backgroundColor: "#4f46e5",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: isMobile ? "28px" : "24px",
      fontWeight: "bold",
      marginRight: isMobile ? "0" : "20px",
      marginBottom: isMobile ? "10px" : "0",
    },
    profileInfo: {
      flex: 1,
      textAlign: isMobile ? ("center" as const) : ("left" as const),
      marginBottom: isMobile ? "15px" : "0",
    },
    profileName: {
      fontSize: isMobile ? "18px" : "20px",
      fontWeight: "bold",
      margin: "0 0 5px 0",
    },
    profileDetail: {
      margin: "0",
      color: "#666",
      fontSize: isMobile ? "14px" : "16px",
    },
    editButton: {
      backgroundColor: "#4f46e5",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "8px 16px",
      cursor: "pointer",
      fontWeight: "500",
      width: isMobile ? "100%" : "auto",
    },
    buttonOutline: {
      backgroundColor: "white",
      color: "#4f46e5",
      border: "1px solid #4f46e5",
      borderRadius: "4px",
      padding: "8px 16px",
      cursor: "pointer",
      fontWeight: "500",
      marginRight: isMobile ? "0" : "10px",
      marginBottom: isMobile ? "10px" : "0",
      width: isMobile ? "100%" : "auto",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: isMobile ? ("column" as const) : ("row" as const),
      width: isMobile ? "100%" : "auto",
    },
    profileSections: {
      padding: isMobile ? "15px" : "20px",
    },
    profileSection: {
      marginBottom: "30px",
    },
    sectionTitle: {
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: "bold",
      marginBottom: "15px",
      paddingBottom: "10px",
      borderBottom: "1px solid #eaeaea",
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))",
      gap: isMobile ? "15px" : "20px",
    },
    infoItem: {
      display: "flex",
      flexDirection: "column",
    },
    infoLabel: {
      fontSize: isMobile ? "12px" : "14px",
      color: "#666",
      marginBottom: "5px",
    },
    infoValue: {
      fontSize: isMobile ? "14px" : "16px",
    },
    editInput: {
      width: "100%",
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      fontSize: isMobile ? "14px" : "16px",
    },
    nonEditableField: {
      backgroundColor: "#f5f5f5",
      color: "#666",
    },
  }

  // Render field based on edit mode
  const renderField = (label: string, name: keyof UserData, type = "text", editable = true) => {
    const value = formData?.[name] || ""

    if (isEditing && editable) {
      return (
        <div style={styles.infoItem}>
          <span style={styles.infoLabel}>{label}</span>
          <input
            type={type}
            name={name as string}
            value={value as string}
            onChange={handleInputChange}
            style={styles.editInput}
          />
        </div>
      )
    }

    // For non-editable fields in edit mode, show a visual distinction
    const fieldStyle = isEditing && !editable ? { ...styles.infoValue, ...styles.nonEditableField } : styles.infoValue

    return (
      <div style={styles.infoItem}>
        <span style={styles.infoLabel}>{label}</span>
        <span style={fieldStyle}>
          {userData?.[name] || "----"}
          {isEditing && !editable && (
            <span style={{ fontSize: "11px", display: "block", marginTop: "3px" }}>(This field cannot be edited)</span>
          )}
        </span>
      </div>
    )
  }

  // Render select field for gender
  const renderSelectField = (label: string, name: keyof UserData, options: { value: string; label: string }[]) => {
    if (isEditing) {
      return (
        <div style={styles.infoItem}>
          <span style={styles.infoLabel}>{label}</span>
          <select
            name={name as string}
            value={(formData?.[name] as string) || ""}
            onChange={handleSelectChange}
            style={styles.editInput}
          >
            <option value="" disabled>
              Select {label}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )
    }

    return (
      <div style={styles.infoItem}>
        <span style={styles.infoLabel}>{label}</span>
        <span style={styles.infoValue}>{userData?.[name] || "----"}</span>
      </div>
    )
  }

  return (
    <div style={styles.dashboard}>
      <h1 style={styles.pageTitle}>Student Profile</h1>

      <div style={styles.profileContainer}>
        <div style={styles.profileHeader}>
          <div style={styles.profileAvatar}>
            <span>
              {userData?.name
                ?.split(" ")
                .map((n) => n?.[0])
                .join("") || "JD"}
            </span>
          </div>
          <div style={styles.profileInfo}>
            <h2 style={styles.profileName}>{userData?.name || "----"}</h2>
            <p style={styles.profileDetail}>
              {userData?.department || "----"} • {userData?.level || "----"} level
            </p>
            <p style={styles.profileDetail}>Matric Number: {userData?.mat_no || "----"}</p>
          </div>
          <div style={{ width: isMobile ? "100%" : "auto" }}>
            {isEditing ? (
              <div style={styles.buttonContainer}>
                <button style={styles.buttonOutline} onClick={toggleEditMode} disabled={isLoading}>
                  Cancel
                </button>
                <button style={styles.editButton} onClick={saveChanges} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            ) : (
              <button style={styles.editButton} onClick={toggleEditMode}>
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div style={styles.profileSections}>
          <div style={styles.profileSection}>
            <h3 style={styles.sectionTitle}>Personal Information</h3>
            <div style={styles.infoGrid}>
              {renderField("Full Name", "name")}
              {renderField("Email", "email", "email")}
              {renderField("Phone", "phone_number", "tel")}
              {renderField("Date of Birth", "DOB", "date")}
              {renderSelectField("Gender", "gender", [
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
                { value: "Prefer not to say", label: "Prefer not to say" },
              ])}
              {renderField("Address", "address")}
            </div>
          </div>

          <div style={styles.profileSection}>
            <h3 style={styles.sectionTitle}>Academic Information</h3>
            <div style={styles.infoGrid}>
              {renderField("Matric Number", "mat_no")}
              {renderField("Department", "department")}
              {renderField("Faculty", "faculty")}
              {renderField("Level", "level")}
              {renderField("Entry Year", "entry_year", "text", false)}
              {renderField("Expected Graduation", "expected_graduation", "text", false)}
              {renderField("CGPA", "cgpa", "text", false)}
              {renderField("Academic Status", "academic_status", "text", false)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
