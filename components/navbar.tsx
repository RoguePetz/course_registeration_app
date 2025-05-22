"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from "./navbar.module.css"
import { useEffect, useState } from "react"
import { auth, db } from "@/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"

// Define a proper type for the user data
interface UserData {
  firstName?: string
  lastName?: string
  email?: string
  // Add other user properties as needed
}

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<UserData | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid))
        if (userDoc.exists()) {
          setUser(userDoc.data() as UserData)
        }
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/")
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarBrand}>
          <Link href="/dashboard">
            <span className={styles.logo}>Academia</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className={styles.mobileMenuButton} onClick={toggleMobileMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? (
            <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop navbar links */}
        <div className={`${styles.navbarLinks} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
          <Link href="/dashboard" className={pathname === "/dashboard" ? styles.active : ""} onClick={closeMobileMenu}>
            Dashboard
          </Link>
          <Link
            href="/dashboard/courses"
            className={pathname === "/dashboard/courses" ? styles.active : ""}
            onClick={closeMobileMenu}
          >
            Courses
          </Link>
          <Link
            href="/dashboard/registration"
            className={pathname === "/dashboard/registration" ? styles.active : ""}
            onClick={closeMobileMenu}
          >
            Registration
          </Link>
          <Link
            href="/dashboard/profile"
            className={pathname === "/dashboard/profile" ? styles.active : ""}
            onClick={closeMobileMenu}
          >
            Profile
          </Link>
          <button className={styles.dropdownItem} onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className={styles.navbarRight}>
          <div className={styles.navbarSearch}>
            <input type="text" placeholder="Search..." />
          </div>

          <div className={styles.navbarUser}>
            <button className={styles.userButton} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {/* Now using the user state properly */}
              <div className={styles.userAvatar}>
                {user ? `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}` : "JD"}
              </div>
              <span className={styles.userName}>
                {user ? `${user.firstName || ""} ${user.lastName || ""}` : "User Center"}
              </span>
            </button>

            {isDropdownOpen && (
              <div className={styles.userDropdown}>
                <Link
                  href="/dashboard/profile"
                  className={styles.dropdownItem}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Profile
                </Link>
                {/* <Link href="/dashboard/settings" className={styles.dropdownItem} onClick={() => setIsDropdownOpen(false)}>
                  Settings
                </Link> */}
                <div className={styles.dropdownDivider}></div>
                <button className={styles.dropdownItem} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
