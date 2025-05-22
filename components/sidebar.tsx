"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from "./sidebar.module.css"

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        {/* <div className={styles.userInfo}>
          <div className={styles.userAvatar}>JD</div>
          <div className={styles.userDetails}>
            <h3 className={styles.userName}>John Doe</h3>
            <p className={styles.userRole}>Computer Science</p>
          </div>
        </div> */}

        <nav className={styles.sidebarNav}>
          <Link href="/dashboard" className={`${styles.navItem} ${pathname === "/dashboard" ? styles.active : ""}`}>
            <span className={styles.navIcon}>📊</span>
            <span className={styles.navText}>Dashboard</span>
          </Link>

          <Link
            href="/dashboard/courses"
            className={`${styles.navItem} ${pathname === "/dashboard/courses" ? styles.active : ""}`}
          >
            <span className={styles.navIcon}>📚</span>
            <span className={styles.navText}>Courses</span>
          </Link>

          <Link
            href="/dashboard/registration"
            className={`${styles.navItem} ${pathname === "/dashboard/registration" ? styles.active : ""}`}
          >
            <span className={styles.navIcon}>📝</span>
            <span className={styles.navText}>Registration</span>
          </Link>

          <Link
            href="/dashboard/profile"
            className={`${styles.navItem} ${pathname === "/dashboard/profile" ? styles.active : ""}`}
          >
            <span className={styles.navIcon}>👤</span>
            <span className={styles.navText}>Profile</span>
          </Link>

          {/* <div className={styles.navDivider}></div> */}

          {/* <Link
            href="/dashboard/settings"
            className={`${styles.navItem} ${pathname === "/dashboard/settings" ? styles.active : ""}`}
          >
            <span className={styles.navIcon}>⚙️</span>
            <span className={styles.navText}>Settings</span>
          </Link> */}

          {/* <Link href="/" className={styles.navItem}>
            <span className={styles.navIcon}>🚪</span>
            <span className={styles.navText}>Logout</span>
          </Link> */}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.semesterInfo}>
            <span className={styles.semesterLabel}>Current Semester</span>
            <span className={styles.semesterValue}>First Semester 2023/2024</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
