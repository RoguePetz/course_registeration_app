"use client"
import UserInfoCard from "@/components/user-info-card"
import RegisteredCoursesTable from "@/components/registered-courses-table"
import RegistrationStats from "@/components/registration-stats"
import UpcomingDeadlines from "@/components/upcoming-deadlines"
import styles from "./dashboard.module.css"
import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

// Define the user data interface (should match your UserInfoCard's UserData interface)
interface UserData {
  name?: string;
  mat_no?: string;
  department?: string;
  faculty?: string;
  level?: number;
  email?: string;
  // Add other fields as needed
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch additional user data
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData); // Type assertion here
        }
      } else {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  console.log(userData);
  
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.pageTitle}>Dashboard</h1>

      <UserInfoCard userData={userData || {}} /> {/* Pass empty object if null */}

      <div className={styles.statsRow}>
        <RegistrationStats />
        <UpcomingDeadlines />
      </div>

      <div className={styles.tableSection}>
        <h2 className={styles.sectionTitle}>Recently Registered Courses</h2>
        <RegisteredCoursesTable />
      </div>
    </div>
  )
}