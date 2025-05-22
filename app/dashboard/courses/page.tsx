import AllCoursesTable from "@/components/all-courses-table"
import styles from "../dashboard.module.css"

export default function CoursesPage() {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.pageTitle}>Available Courses</h1>

      <div className={styles.filterSection}>
        <div className={styles.searchBar}>
          <input type="text" placeholder="Search courses..." />
          <button>Search</button>
        </div>

        <div className={styles.filters}>
          <select defaultValue="">
            <option value="" disabled>
              Department
            </option>
            <option value="cs">Computer Science</option>
            <option value="eng">Engineering</option>
            <option value="bus">Business</option>
          </select>

          <select defaultValue="">
            <option value="" disabled>
              Level
            </option>
            <option value="100">100 Level</option>
            <option value="200">200 Level</option>
            <option value="300">300 Level</option>
            <option value="400">400 Level</option>
          </select>

          <select defaultValue="">
            <option value="" disabled>
              Semester
            </option>
            <option value="first">First Semester</option>
            <option value="second">Second Semester</option>
          </select>
        </div>
      </div>

      <div className={styles.tableSection}>
        <AllCoursesTable />
      </div>
    </div>
  )
}
