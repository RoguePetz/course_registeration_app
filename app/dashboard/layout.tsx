import type React from "react"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import styles from "./dashboard.module.css"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.dashboardLayout}>
      <Navbar />
      <div className={styles.contentContainer}>
        <Sidebar />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  )
}
