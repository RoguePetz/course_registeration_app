"use client"
import styles from "./components.module.css"
import { useEffect, useState } from "react"

// Define the Course type
interface Course {
  id: string
  title: string
  units: number
  type: string
  department: string
  level: string
  year: string
  semester: string
  lecturer: string
  isCarryOver: boolean
  originalYear: string
  originalSemester: string
}

// Define the CourseData structure
type CourseData = {
  [year: string]: {
    First: Course[]
    Second: Course[]
  }
}

// Sample course data - renamed to sampleCourseData to avoid conflict


// Calculate stats for the most recent semester only
const calculateStats = (data: CourseData) => {
  const yearKeys = Object.keys(data)
    .map(Number)
    .sort((a, b) => b - a) // Descending: 5 → 4 → 3 ...

  const semesterOrder: ("Second" | "First")[] = ["Second", "First"]

  for (const year of yearKeys) {
    const yearData = data[year.toString()]
    for (const semester of semesterOrder) {
      const courses = yearData[semester]
      if (courses.length > 0) {
        const registeredCourses = courses.length
        const maxUnits = 24
        const registeredUnits = courses.reduce((sum, course) => sum + (course.isCarryOver ? 0 : course.units), 0)
        const remainingUnits = maxUnits - registeredUnits
        const progressPercentage = maxUnits === 0 ? 0 : Math.round((registeredUnits / maxUnits) * 100)

        return {
          registeredCourses,
          maxUnits,
          registeredUnits,
          remainingUnits,
          progressPercentage,
          year,
          semester,
        }
      }
    }
  }

  // If no courses at all
  return {
    registeredCourses: 0,
    maxUnits: 0,
    registeredUnits: 0,
    remainingUnits: 0,
    progressPercentage: 0,
    year: null,
    semester: null,
  }
}

export default function RegistrationStats() {
  // Fixed the type to match CourseData instead of an array
  const [courses, setCourses] = useState<CourseData>(() => {
    // Initialize with empty structure that matches CourseData
    return {
      "1": { First: [], Second: [] },
      "2": { First: [], Second: [] },
      "3": { First: [], Second: [] },
      "4": { First: [], Second: [] },
      "5": { First: [], Second: [] },
    }
  })

  useEffect(() => {
    const storedData = localStorage.getItem("registeredCourses")
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        // Ensure the parsed data matches our CourseData structure
        if (parsedData && typeof parsedData === "object") {
          setCourses(parsedData)
        }
      } catch (error) {
        console.error("Error parsing course data from localStorage:", error)
      }
    } else {
      // If no data in localStorage, you could use the sample data instead
      // setCourses(sampleCourseData);
    }
  }, [])

  const { registeredCourses, maxUnits, registeredUnits, remainingUnits, progressPercentage, year, semester } =
    calculateStats(courses)

  return (
    <div className={styles.statsCard}>
      <h2 className={styles.statsTitle}>Registration Summary {year && semester ? `(${year} - ${semester})` : ""}</h2>

      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{registeredCourses}</span>
          <span className={styles.statLabel}>Registered Courses</span>
        </div>

        <div className={styles.statItem}>
          <span className={styles.statValue}>{maxUnits}</span>
          <span className={styles.statLabel}>Maximum Units</span>
        </div>

        <div className={styles.statItem}>
          <span className={styles.statValue}>{registeredUnits}</span>
          <span className={styles.statLabel}>Registered Units</span>
        </div>

        <div className={styles.statItem}>
          <span className={styles.statValue}>{remainingUnits}</span>
          <span className={styles.statLabel}>Remaining Units</span>
        </div>
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progressLabel}>
          <span>Credit Units Progress</span>
          <span>{`${registeredUnits}/${maxUnits}`}</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>
    </div>
  )
}
