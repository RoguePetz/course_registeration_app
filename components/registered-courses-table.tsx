"use client"

import { useEffect, useState } from "react"
import styles from "./components.module.css"

// Define the course type based on the data structure
interface Course {
  id: string
  title: string
  units: number
  status?: string
  lecturer: string
  registeredDate?: string
  type?: string
  department?: string
  level?: string
  year?: string
  semester?: string
  isCarryOver?: boolean
  originalYear?: string
  originalSemester?: string
}

export default function RegisteredCoursesTable() {
  const [courses, setCourses] = useState<Course[]>([])
  const [totalUnits, setTotalUnits] = useState(0)
  const [loading, setLoading] = useState(true)
  const [currentYear, setCurrentYear] = useState("")
  const [currentSemester, setCurrentSemester] = useState("")

  useEffect(() => {
    // Access localStorage only on the client side
    try {
      const storedCourses = localStorage.getItem("registeredCourses")

      if (storedCourses) {
        const parsedData = JSON.parse(storedCourses)

        // Find the most recent array of courses
        let mostRecentCourses: Course[] = []
        let mostRecentYear = ""
        let mostRecentSemester = ""

        // Sort years in descending order (assuming higher numbers are more recent)
        const sortedYears = Object.keys(parsedData).sort((a, b) => Number(b) - Number(a))

        // Find the first non-empty array of courses
        for (const year of sortedYears) {
          const semesters = ["Second", "First"] // Check second semester first as it's later in the academic year

          for (const semester of semesters) {
            if (
              parsedData[year] &&
              parsedData[year][semester] &&
              Array.isArray(parsedData[year][semester]) &&
              parsedData[year][semester].length > 0
            ) {
              mostRecentCourses = parsedData[year][semester]
              mostRecentYear = year
              mostRecentSemester = semester
              break
            }
          }

          if (mostRecentCourses.length > 0) break
        }

        // Set the current year and semester for display
        setCurrentYear(mostRecentYear)
        setCurrentSemester(mostRecentSemester)

        // Add status and registeredDate if not present
        const processedCourses = mostRecentCourses.map((course) => ({
          ...course,
          status: course.status || "Approved",
          registeredDate: course.registeredDate || new Date().toLocaleDateString(),
        }))

        setCourses(processedCourses)

        // Calculate total units
        const units = processedCourses.reduce((total, course) => total + course.units, 0)
        setTotalUnits(units)
      }

      setLoading(false)
    } catch (error) {
      console.error("Error accessing localStorage:", error)
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <div>Loading courses...</div>
  }

  return (
    <div className={styles.tableContainer}>
      <h3>
        {currentYear && currentSemester
          ? `${currentSemester} Semester ${currentYear} Registered Courses`
          : "Most Recently Registered Courses"}
      </h3>
      {courses.length > 0 ? (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Title</th>
                <th>Units</th>
                <th>Lecturer</th>
                <th>Status</th>
                <th>Registered Date</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.title}</td>
                  <td>{course.units}</td>
                  <td>{course.lecturer}</td>
                  <td>
                    <span className={`${styles.status} ${styles[(course.status || "approved").toLowerCase()]}`}>
                      {course.status || "Approved"}
                    </span>
                  </td>
                  <td>{course.registeredDate || "Recent"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.tableFooter}>
            <div className={styles.tableSummary}>
              <span>Total Courses: {courses.length}</span>
              <span>Total Units: {totalUnits}</span>
            </div>
            <button className={styles.viewAllButton}>View All Courses</button>
          </div>
        </>
      ) : (
        <p>No courses found in localStorage. Please register a course first.</p>
      )}
    </div>
  )
}
