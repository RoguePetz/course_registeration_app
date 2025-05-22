import styles from "./components.module.css"

export default function AllCoursesTable() {
  const courses = [
    {
      id: "CSC301",
      title: "Data Structures and Algorithms",
      units: 3,
      type: "Core",
      department: "Computer Science",
      level: "300",
      semester: "First",
      lecturer: "Dr. James Wilson",
    },
    {
      id: "CSC305",
      title: "Operating Systems",
      units: 3,
      type: "Core",
      department: "Computer Science",
      level: "300",
      semester: "First",
      lecturer: "Prof. Linda Chen",
    },
    {
      id: "CSC309",
      title: "Web Development",
      units: 2,
      type: "Elective",
      department: "Computer Science",
      level: "300",
      semester: "First",
      lecturer: "Dr. Michael Brown",
    },
    {
      id: "MTH301",
      title: "Linear Algebra",
      units: 3,
      type: "Required",
      department: "Mathematics",
      level: "300",
      semester: "First",
      lecturer: "Dr. Robert Taylor",
    },
    {
      id: "GES301",
      title: "Entrepreneurship Studies",
      units: 2,
      type: "General",
      department: "General Studies",
      level: "300",
      semester: "First",
      lecturer: "Dr. Elizabeth Adams",
    },
    {
      id: "CSC311",
      title: "Computer Networks",
      units: 3,
      type: "Core",
      department: "Computer Science",
      level: "300",
      semester: "First",
      lecturer: "Dr. Thomas Lee",
    },
    {
      id: "CSC315",
      title: "Database Management Systems",
      units: 3,
      type: "Core",
      department: "Computer Science",
      level: "300",
      semester: "First",
      lecturer: "Prof. Sarah Johnson",
    },
  ]

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Title</th>
            <th>Units</th>
            <th>Type</th>
            <th>Department</th>
            <th>Level</th>
            <th>Lecturer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.title}</td>
              <td>{course.units}</td>
              <td>
                <span className={`${styles.courseType} ${styles[course.type.toLowerCase()]}`}>{course.type}</span>
              </td>
              <td>{course.department}</td>
              <td>{course.level}</td>
              <td>{course.lecturer}</td>
              <td>
                <button className={styles.registerButton}>Register</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.tablePagination}>
        <button className={styles.paginationButton} disabled>
          Previous
        </button>
        <div className={styles.paginationPages}>
          <button className={`${styles.pageButton} ${styles.activePage}`}>1</button>
          <button className={styles.pageButton}>2</button>
          <button className={styles.pageButton}>3</button>
        </div>
        <button className={styles.paginationButton}>Next</button>
      </div>
    </div>
  )
}
