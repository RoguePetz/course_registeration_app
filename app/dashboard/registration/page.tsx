'use client'; 

import { useState, useEffect } from "react"
export default function CoursePage() {
  // State for active tabs
  const [activeMainTab, setActiveMainTab] = useState("available")
  const [activeYear, setActiveYear] = useState("1")
  const [activeSemester, setActiveSemester] = useState("First")
  const [activeRegisteredYear, setActiveRegisteredYear] = useState("1")
  const [activeRegisteredSemester, setActiveRegisteredSemester] = useState("First")

  // State for carry-over course selection
  const [showCarryOver, setShowCarryOver] = useState(false)
  const [carryOverYear, setCarryOverYear] = useState("1")
  const [carryOverSemester, setCarryOverSemester] = useState("First")

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [carryOverPage, setCarryOverPage] = useState(1)
  const coursesPerPage = 5

  // Get saved courses from localStorage before initializing state
  const [registeredCourses, setRegisteredCourses] = useState({
    "1": { First: [], Second: [] },
    "2": { First: [], Second: [] },
    "3": { First: [], Second: [] },
    "4": { First: [], Second: [] },
    "5": { First: [], Second: [] },
  });

  // Load saved courses from localStorage after component mounts
  useEffect(() => {
    const savedCoursesFromStorage = localStorage.getItem("registeredCourses");
    if (savedCoursesFromStorage) {
      setRegisteredCourses(JSON.parse(savedCoursesFromStorage));
    }
  }, []);

  // State for registered courses - organized by year and semester
  // const [registeredCourses, setRegisteredCourses] =
  //   useState<Record<string, Record<string, any[]>>>(initialRegisteredCourses)

  // State variable for maximum units
  const maxUnits = 24 // Fixed credit unit limit

  // Sample course data with year information
  const courses = [
    // Year 1 - First Semester Courses
    {
      id: "CSC101",
      title: "Introduction to Computer Science",
      units: 3,
      type: "Core",
      department: "Computer Science",
      level: "100",
      year: "1",
      semester: "First",
      lecturer: "Dr. James Wilson",
    },
    {
      id: "MTH101",
      title: "Elementary Mathematics I",
      units: 3,
      type: "Required",
      department: "Mathematics",
      level: "100",
      year: "1",
      semester: "First",
      lecturer: "Prof. Linda Chen",
    },
    {
      id: "PHY101",
      title: "General Physics I",
      units: 3,
      type: "Required",
      department: "Physics",
      level: "100",
      year: "1",
      semester: "First",
      lecturer: "Dr. Michael Brown",
    },
    {
      id: "CHM101",
      title: "General Chemistry I",
      units: 3,
      type: "Required",
      department: "Chemistry",
      level: "100",
      year: "1",
      semester: "First",
      lecturer: "Dr. Robert Taylor",
    },
    {
      id: "GES101",
      title: "Communication Skills in English",
      units: 2,
      type: "General",
      department: "General Studies",
      level: "100",
      year: "1",
      semester: "First",
      lecturer: "Dr. Elizabeth Adams",
    },

    // Year 1 - Second Semester Courses
    {
      id: "CSC102",
      title: "Introduction to Programming",
      units: 3,
      type: "Core",
      department: "Computer Science",
      level: "100",
      year: "1",
      semester: "Second",
      lecturer: "Dr. Thomas Lee",
    },
    {
      id: "MTH102",
      title: "Elementary Mathematics II",
      units: 3,
      type: "Required",
      department: "Mathematics",
      level: "100",
      year: "1",
      semester: "Second",
      lecturer: "Prof. Sarah Johnson",
    },
    {
      id: "PHY102",
      title: "General Physics II",
      units: 3,
      type: "Required",
      department: "Physics",
      level: "100",
      year: "1",
      semester: "Second",
      lecturer: "Dr. Emily Parker",
    },
    {
      id: "CHM102",
      title: "General Chemistry II",
      units: 3,
      type: "Required",
      department: "Chemistry",
      level: "100",
      year: "1",
      semester: "Second",
      lecturer: "Prof. David Miller",
    },
    {
      id: "GES102",
      title: "Use of Library",
      units: 2,
      type: "General",
      department: "General Studies",
      level: "100",
      year: "1",
      semester: "Second",
      lecturer: "Dr. Jessica White",
    },

    // Year 2 - First Semester Courses
    {
      id: "CSC201",
      title: "Computer Programming I",
      units: 3,
      type: "Core",
      department: "Computer Science",
      level: "200",
      year: "2",
      semester: "First",
      lecturer: "Dr. William Green",
    },
    {
      id: "CSC203",
      title: "Discrete Structures",
      units: 3,
      type: "Core",
      department: "Computer Science",
      level: "200",
      year: "2",
      semester: "First",
      lecturer: "Dr. Patricia Harris",
    },
    {
      id: "MTH201",
      title: "Mathematical Methods",
      units: 3,
      type: "Required",
      department: "Mathematics",
      level: "200",
      year: "2",
      semester: "First",
      lecturer: "Dr. Richard Davis",
    },
    {
      id: "STA201",
      title: "Statistics for Physical Sciences",
      units: 3,
      type: "Required",
      department: "Statistics",
      level: "200",
      year: "2",
      semester: "First",
      lecturer: "Prof. Jennifer Smith",
    },
    {
      id: "GES201",
      title: "Nigerian People and Culture",
      units: 2,
      type: "General",
      department: "General Studies",
      level: "200",
      year: "2",
      semester: "First",
      lecturer: "Dr. Charles Brown",
    },

    // Year 2 - Second Semester Courses
    {
      id: "CSC202",
      title: "Computer Programming II",
      units: 3,
      type: "Core",
      department: "Computer Science",
      level: "200",
      year: "2",
      semester: "Second",
      lecturer: "Dr. Laura Wilson",
    },
    {
      id: "CSC204",
      title: "Basic Digital Electronics",
      units: 3,
      type: "Core",
      department: "Computer Science",
      level: "200",
      year: "2",
      semester: "Second",
      lecturer: "Prof. Mark Johnson",
    },
    {
      id: "MTH202",
      title: "Linear Algebra",
      units: 3,
      type: "Required",
      department: "Mathematics",
      level: "200",
      year: "2",
      semester: "Second",
      lecturer: "Dr. Susan Miller",
    },
    {
      id: "STA202",
      title: "Probability Theory",
      units: 3,
      type: "Required",
      department: "Statistics",
      level: "200",
      year: "2",
      semester: "Second",
      lecturer: "Prof. Daniel White",
    },
    {
      id: "GES202",
      title: "Philosophy and Logic",
      units: 2,
      type: "General",
      department: "General Studies",
      level: "200",
      year: "2",
      semester: "Second",
      lecturer: "Dr. Karen Taylor",
    },

    // Year 3 - First Semester Courses
    {
      id: "CSC301",
      title: "Data Structures and Algorithms",
      units: 3,
      type: "Core",
      department: "Computer Science",
      level: "300",
      year: "3",
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
      year: "3",
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
      year: "3",
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
      year: "3",
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
      year: "3",
      semester: "First",
      lecturer: "Dr. Elizabeth Adams",
    },

    // Year 3 - Second Semester Courses
    {
      id: "CSC302",
      title: "Artificial Intelligence",
      units: 3,
      type: "Core",
      department: "Computer Science",
      level: "300",
      year: "3",
      semester: "Second",
      lecturer: "Dr. Emily Parker",
    },
    {
      id: "CSC306",
      title: "Software Engineering",
      units: 3,
      type: "Core",
      department: "Computer Science",
      level: "300",
      year: "3",
      semester: "Second",
      lecturer: "Prof. David Miller",
    },
    {
      id: "CSC310",
      title: "Mobile App Development",
      units: 2,
      type: "Elective",
      department: "Computer Science",
      level: "300",
      year: "3",
      semester: "Second",
      lecturer: "Dr. Jessica White",
    },
    {
      id: "MTH302",
      title: "Numerical Analysis",
      units: 3,
      type: "Required",
      department: "Mathematics",
      level: "300",
      year: "3",
      semester: "Second",
      lecturer: "Dr. William Green",
    },
    {
      id: "GES302",
      title: "Business Creation and Growth",
      units: 2,
      type: "General",
      department: "General Studies",
      level: "300",
      year: "3",
      semester: "Second",
      lecturer: "Dr. Patricia Harris",
    },

    // Year 4 - First Semester Courses
    {
      id: "CSC401",
      title: "Database Management Systems",
      units: 3,
      type: "Core",
      department: "Computer Science",
      level: "400",
      year: "4",
      semester: "First",
      lecturer: "Dr. Richard Davis",
    },
    {
      id: "CSC403",
      title: "Computer Networks",
      units: 3,
      type: "Core",
      department: "Computer Science",
      level: "400",
      year: "4",
      semester: "First",
      lecturer: "Prof. Jennifer Smith",
    },
    {
      id: "CSC405",
      title: "Computer Graphics",
      units: 3,
      type: "Elective",
      department: "Computer Science",
      level: "400",
      year: "4",
      semester: "First",
      lecturer: "Dr. Charles Brown",
    },
    {
      id: "CSC407",
      title: "Project Management",
      units: 2,
      type: "Required",
      department: "Computer Science",
      level: "400",
      year: "4",
      semester: "First",
      lecturer: "Dr. Laura Wilson",
    },
    {
      id: "CSC409",
      title: "Information Security",
      units: 3,
      type: "Elective",
      department: "Computer Science",
      level: "400",
      year: "4",
      semester: "First",
      lecturer: "Prof. Mark Johnson",
    },

    // Year 4 - Second Semester Courses
    {
      id: "CSC402",
      title: "Compiler Construction",
      units: 3,
      type: "Core",
      department: "Computer Science",
      level: "400",
      year: "4",
      semester: "Second",
      lecturer: "Dr. Susan Miller",
    },
    {
      id: "CSC404",
      title: "Cloud Computing",
      units: 3,
      type: "Core",
      department: "Computer Science",
      level: "400",
      year: "4",
      semester: "Second",
      lecturer: "Prof. Daniel White",
    },
    {
      id: "CSC406",
      title: "Machine Learning",
      units: 3,
      type: "Elective",
      department: "Computer Science",
      level: "400",
      year: "4",
      semester: "Second",
      lecturer: "Dr. Karen Taylor",
    },
    {
      id: "CSC408",
      title: "Final Year Project",
      units: 6,
      type: "Required",
      department: "Computer Science",
      level: "400",
      year: "4",
      semester: "Second",
      lecturer: "Multiple Supervisors",
    },
    {
      id: "CSC410",
      title: "Human-Computer Interaction",
      units: 2,
      type: "Elective",
      department: "Computer Science",
      level: "400",
      year: "4",
      semester: "Second",
      lecturer: "Dr. John Anderson",
    },

    // Year 5 - First Semester Courses
    {
      id: "CSC501",
      title: "Advanced Database Systems",
      units: 3,
      type: "Core",
      department: "Computer Science",
      level: "500",
      year: "5",
      semester: "First",
      lecturer: "Dr. Mary Johnson",
    },
    {
      id: "CSC503",
      title: "Distributed Systems",
      units: 3,
      type: "Core",
      department: "Computer Science",
      level: "500",
      year: "5",
      semester: "First",
      lecturer: "Prof. Robert Wilson",
    },
    {
      id: "CSC505",
      title: "Advanced Artificial Intelligence",
      units: 3,
      type: "Elective",
      department: "Computer Science",
      level: "500",
      year: "5",
      semester: "First",
      lecturer: "Dr. Sarah Thompson",
    },
    {
      id: "CSC507",
      title: "Research Methodology",
      units: 2,
      type: "Required",
      department: "Computer Science",
      level: "500",
      year: "5",
      semester: "First",
      lecturer: "Dr. David Clark",
    },
    {
      id: "CSC509",
      title: "Internet of Things",
      units: 3,
      type: "Elective",
      department: "Computer Science",
      level: "500",
      year: "5",
      semester: "First",
      lecturer: "Prof. Lisa Brown",
    },

    // Year 5 - Second Semester Courses
    {
      id: "CSC502",
      title: "Advanced Software Engineering",
      units: 3,
      type: "Core",
      department: "Computer Science",
      level: "500",
      year: "5",
      semester: "Second",
      lecturer: "Dr. James Martin",
    },
    {
      id: "CSC504",
      title: "Big Data Analytics",
      units: 3,
      type: "Core",
      department: "Computer Science",
      level: "500",
      year: "5",
      semester: "Second",
      lecturer: "Prof. Emily Davis",
    },
    {
      id: "CSC506",
      title: "Blockchain Technology",
      units: 3,
      type: "Elective",
      department: "Computer Science",
      level: "500",
      year: "5",
      semester: "Second",
      lecturer: "Dr. Michael Wilson",
    },
    {
      id: "CSC508",
      title: "Final Project",
      units: 6,
      type: "Required",
      department: "Computer Science",
      level: "500",
      year: "5",
      semester: "Second",
      lecturer: "Multiple Supervisors",
    },
    {
      id: "CSC510",
      title: "Quantum Computing",
      units: 2,
      type: "Elective",
      department: "Computer Science",
      level: "500",
      year: "5",
      semester: "Second",
      lecturer: "Dr. Linda Roberts",
    },
  ]

  // Save registered courses to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("registeredCourses", JSON.stringify(registeredCourses))
  }, [registeredCourses])

  // Filter courses by year and semester
  const filteredCourses = courses.filter((course) => course.year === activeYear && course.semester === activeSemester)

  // Filter courses for carry-over section
  const carryOverCourses = courses.filter(
    (course) => course.year === carryOverYear && course.semester === carryOverSemester,
  )

  // Calculate pagination for regular courses
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse)
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage)

  // Calculate pagination for carry-over courses
  const indexOfLastCarryOverCourse = carryOverPage * coursesPerPage
  const indexOfFirstCarryOverCourse = indexOfLastCarryOverCourse - coursesPerPage
  const currentCarryOverCourses = carryOverCourses.slice(indexOfFirstCarryOverCourse, indexOfLastCarryOverCourse)
  const totalCarryOverPages = Math.ceil(carryOverCourses.length / coursesPerPage)

  // Handle course registration
  const handleRegisterCourse = (course: any, isCarryOver = false) => {
    // Create a copy of the course with carry-over flag if needed
    const courseToRegister = {
      ...course,
      isCarryOver: isCarryOver,
      originalYear: course.year,
      originalSemester: course.semester,
    }

    // Check if course is already registered
    const isAlreadyRegistered = registeredCourses[activeYear][activeSemester].some((c) => c.id === course.id)

    if (isAlreadyRegistered) {
      alert(`Course ${course.id} is already registered!`)
      return
    }

    // Calculate current total units for the active year and semester
    const currentTotalUnits = calculateTotalUnits(activeYear, activeSemester)

    // Check if adding this course would exceed the maximum units
    if (currentTotalUnits + course.units > maxUnits) {
      alert(`Cannot register for ${course.id}. It would exceed the maximum of ${maxUnits} credit units.`)
      return
    }

    // Add course to registered courses for current year and semester
    setRegisteredCourses((prev) => ({
      ...prev,
      [activeYear]: {
        ...prev[activeYear],
        [activeSemester]: [...prev[activeYear][activeSemester], courseToRegister],
      },
    }))
  }

  // Handle course unregistration
  const handleUnregisterCourse = (courseId: string) => {
    setRegisteredCourses((prev) => ({
      ...prev,
      [activeRegisteredYear]: {
        ...prev[activeRegisteredYear],
        [activeRegisteredSemester]: prev[activeRegisteredYear][activeRegisteredSemester].filter(
          (c) => c.id !== courseId,
        ),
      },
    }))
  }

  // Get badge color based on course type
  const getBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "core":
        return { backgroundColor: "#FEE2E2", color: "#991B1B" }
      case "elective":
        return { backgroundColor: "#DCFCE7", color: "#166534" }
      case "required":
        return { backgroundColor: "#DBEAFE", color: "#1E40AF" }
      case "general":
        return { backgroundColor: "#FEF3C7", color: "#92400E" }
      default:
        return { backgroundColor: "#F3F4F6", color: "#1F2937" }
    }
  }

  // Calculate total units for a year and semester
  const calculateTotalUnits = (year: string, semester: string) => {
    return registeredCourses[year][semester].reduce((sum, course) => sum + course.units, 0)
  }

  // Toggle carry-over section
  const toggleCarryOver = () => {
    setShowCarryOver(!showCarryOver)
    if (!showCarryOver) {
      // Default to year 1 when opening carry-over section
      setCarryOverYear("1")
      setCarryOverSemester("First")
      setCarryOverPage(1)
    }
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "32px 16px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "32px",
          color: "#111827",
        }}
      >
        Course Registration
      </h1>

      {/* Main Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #E5E7EB",
          marginBottom: "24px",
        }}
      >
        <button
          onClick={() => setActiveMainTab("available")}
          style={{
            padding: "12px 24px",
            fontWeight: activeMainTab === "available" ? "bold" : "normal",
            borderBottom: activeMainTab === "available" ? "2px solid #2563EB" : "none",
            // Fixed border properties:
            borderWidth: 0,
            borderStyle: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            color: activeMainTab === "available" ? "#2563EB" : "#6B7280",
            transition: "all 0.2s",
          }}
        >
          Available Courses
        </button>
        <button
          onClick={() => setActiveMainTab("registered")}
          style={{
            padding: "12px 24px",
      fontWeight: activeMainTab === "registered" ? "bold" : "normal",
      borderBottom: activeMainTab === "registered" ? "2px solid #2563EB" : "none",
      // Fixed border properties:
      borderWidth: 0,
      borderStyle: "none",
      backgroundColor: "transparent",
      cursor: "pointer",
      color: activeMainTab === "registered" ? "#2563EB" : "#6B7280",
      transition: "all 0.2s",
          }}
        >
          Registered Courses
        </button>
      </div>

      {/* Available Courses Tab Content */}
      {activeMainTab === "available" && (
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "16px",
              color: "#111827",
            }}
          >
            Available Courses
          </h2>

          {/* Year Tabs */}
          <div
            style={{
              display: "flex",
              maxWidth: "600px",
              margin: "0 auto 16px auto",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid #E5E7EB",
            }}
          >
            {["1", "2", "3", "4", "5"].map((year) => (
              <button
                key={year}
                onClick={() => {
                  setActiveYear(year)
                  setCurrentPage(1)
                }}
                style={{
                  flex: 1,
                  padding: "8px 16px",
                  backgroundColor: activeYear === year ? "#2563EB" : "white",
                  color: activeYear === year ? "white" : "#6B7280",
                  borderWidth: 0,
                  borderStyle: "none",
                  cursor: "pointer",
                  fontWeight: activeYear === year ? "bold" : "normal",
                  transition: "all 0.2s",
                }}
              >
                Year {year}
              </button>
            ))}
          </div>

          {/* Semester Tabs */}
          <div
            style={{
              display: "flex",
              maxWidth: "400px",
              margin: "0 auto 24px auto",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid #E5E7EB",
            }}
          >
            <button
              onClick={() => {
                setActiveSemester("First")
                setCurrentPage(1)
              }}
              style={{
                flex: 1,
                padding: "8px 16px",
                backgroundColor: activeSemester === "First" ? "#2563EB" : "white",
                color: activeSemester === "First" ? "white" : "#6B7280",
                borderWidth: 0,
                borderStyle: "none",
                cursor: "pointer",
                fontWeight: activeSemester === "First" ? "bold" : "normal",
                transition: "all 0.2s",
              }}
            >
              First Semester
            </button>
            <button
              onClick={() => {
                setActiveSemester("Second")
                setCurrentPage(1)
              }}
              style={{
                flex: 1,
                padding: "8px 16px",
                backgroundColor: activeSemester === "Second" ? "#2563EB" : "white",
                color: activeSemester === "Second" ? "white" : "#6B7280",
                borderWidth: 0,
                borderStyle: "none",
                cursor: "pointer",
                fontWeight: activeSemester === "Second" ? "bold" : "normal",
                transition: "all 0.2s",
              }}
            >
              Second Semester
            </button>
          </div>

          {/* Carry-Over Toggle Button */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button
              onClick={toggleCarryOver}
              style={{
                backgroundColor: showCarryOver ? "#4B5563" : "#2563EB",
                color: "white",
                borderWidth: 0,
                borderStyle: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                fontSize: "14px",
                cursor: "pointer",
                fontWeight: "500",
                transition: "background-color 0.2s",
              }}
            >
              {showCarryOver ? "Hide Carry-Over Courses" : "Register Carry-Over Courses"}
            </button>
          </div>

          {/* Courses Table */}
          <div
            style={{
              border: "1px solid #E5E7EB",
              borderRadius: "6px",
              overflowX: "auto",
              overflowY: "auto",  // Enable vertical scrolling
              maxHeight: "400px", // Set maximum height for scroll container
              marginBottom: "16px",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#F9FAFB" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>
                    Course Code
                  </th>
                  <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>
                    Course Title
                  </th>
                  <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>Units</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>Type</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>
                    Department
                  </th>
                  <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>Level</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>
                    Lecturer
                  </th>
                  <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentCourses.map((course) => (
                  <tr key={course.id} style={{ borderBottom: "1px solid #E5E7EB" }}>
                    <td style={{ padding: "12px 16px", fontWeight: "500" }}>{course.id}</td>
                    <td style={{ padding: "12px 16px" }}>{course.title}</td>
                    <td style={{ padding: "12px 16px" }}>{course.units}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "500",
                          ...getBadgeColor(course.type),
                        }}
                      >
                        {course.type}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>{course.department}</td>
                    <td style={{ padding: "12px 16px" }}>{course.level}</td>
                    <td style={{ padding: "12px 16px" }}>{course.lecturer}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <button
                        onClick={() => handleRegisterCourse(course)}
                        style={{
                          backgroundColor: "#2563EB",
                          color: "white",
                          borderWidth: 0,
                          borderStyle: "none",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          cursor: "pointer",
                          fontWeight: "500",
                          transition: "background-color 0.2s",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1D4ED8")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563EB")}
                      >
                        Register
                      </button>
                    </td>
                  </tr>
                ))}

                {currentCourses.length === 0 && (
                  <tr>
                    <td colSpan={8} style={{ padding: "16px", textAlign: "center" }}>
                      No courses available for Year {activeYear}, {activeSemester} Semester
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                marginTop: "16px",
                marginBottom: showCarryOver ? "32px" : "0",
              }}
            >
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{
                  padding: "6px 12px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "4px",
                  backgroundColor: "white",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  opacity: currentPage === 1 ? 0.5 : 1,
                }}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  style={{
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #E5E7EB",
                    borderRadius: "4px",
                    backgroundColor: currentPage === index + 1 ? "#2563EB" : "white",
                    color: currentPage === index + 1 ? "white" : "#6B7280",
                    cursor: "pointer",
                  }}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                style={{
                  padding: "6px 12px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "4px",
                  backgroundColor: "white",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  opacity: currentPage === totalPages ? 0.5 : 1,
                }}
              >
                Next
              </button>
            </div>
          )}

          {/* Carry-Over Courses Section */}
          {showCarryOver && (
            <div style={{ marginTop: "32px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "16px",
                  color: "#111827",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#EF4444",
                  }}
                ></span>
                Carry-Over Courses Registration
              </h3>

              <p style={{ marginBottom: "16px", color: "#6B7280" }}>
                Select courses from previous years to register as carry-overs in your current year ({activeYear}).
              </p>

              {/* Carry-Over Year Tabs */}
              <div
                style={{
                  display: "flex",
                  maxWidth: "600px",
                  margin: "0 auto 16px auto",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid #E5E7EB",
                }}
              >
                {["1", "2", "3", "4"]
                  .filter((year) => Number.parseInt(year) < Number.parseInt(activeYear))
                  .map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        setCarryOverYear(year)
                        setCarryOverPage(1)
                      }}
                      style={{
                        flex: 1,
                        padding: "8px 16px",
                        backgroundColor: carryOverYear === year ? "#EF4444" : "white",
                        color: carryOverYear === year ? "white" : "#6B7280",
                        borderWidth: 0,
                        borderStyle: "none",
                        cursor: "pointer",
                        fontWeight: carryOverYear === year ? "bold" : "normal",
                        transition: "all 0.2s",
                      }}
                    >
                      Year {year}
                    </button>
                  ))}
              </div>

              {/* Carry-Over Semester Tabs */}
              <div
                style={{
                  display: "flex",
                  maxWidth: "400px",
                  margin: "0 auto 24px auto",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid #E5E7EB",
                }}
              >
                <button
                  onClick={() => {
                    setCarryOverSemester("First")
                    setCarryOverPage(1)
                  }}
                  style={{
                    flex: 1,
                    padding: "8px 16px",
                    backgroundColor: carryOverSemester === "First" ? "#EF4444" : "white",
                    color: carryOverSemester === "First" ? "white" : "#6B7280",
                    borderWidth: 0,
                    borderStyle: "none",
                    cursor: "pointer",
                    fontWeight: carryOverSemester === "First" ? "bold" : "normal",
                    transition: "all 0.2s",
                  }}
                >
                  First Semester
                </button>
                <button
                  onClick={() => {
                    setCarryOverSemester("Second")
                    setCarryOverPage(1)
                  }}
                  style={{
                    flex: 1,
                    padding: "8px 16px",
                    backgroundColor: carryOverSemester === "Second" ? "#EF4444" : "white",
                    color: carryOverSemester === "Second" ? "white" : "#6B7280",
                    borderWidth: 0,
                    borderStyle: "none",
                    cursor: "pointer",
                    fontWeight: carryOverSemester === "Second" ? "bold" : "normal",
                    transition: "all 0.2s",
                  }}
                >
                  Second Semester
                </button>
              </div>

              {/* Carry-Over Courses Table */}
              <div
                style={{
                  border: "1px solid #E5E7EB",
                  borderRadius: "6px",
                  overflowX: "auto",
                  overflowY: "auto",  
                  marginBottom: "16px",
                  backgroundColor: "#FEFAFA",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#FEF2F2" }}>
                      <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>
                        Course Code
                      </th>
                      <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>
                        Course Title
                      </th>
                      <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>
                        Units
                      </th>
                      <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>
                        Type
                      </th>
                      <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>
                        Department
                      </th>
                      <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>
                        Level
                      </th>
                      <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>
                        Lecturer
                      </th>
                      <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCarryOverCourses.map((course) => (
                      <tr key={course.id} style={{ borderBottom: "1px solid #E5E7EB" }}>
                        <td style={{ padding: "12px 16px", fontWeight: "500" }}>{course.id}</td>
                        <td style={{ padding: "12px 16px" }}>{course.title}</td>
                        <td style={{ padding: "12px 16px" }}>{course.units}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontWeight: "500",
                              ...getBadgeColor(course.type),
                            }}
                          >
                            {course.type}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>{course.department}</td>
                        <td style={{ padding: "12px 16px" }}>{course.level}</td>
                        <td style={{ padding: "12px 16px" }}>{course.lecturer}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <button
                            onClick={() => handleRegisterCourse(course, true)}
                            style={{
                              backgroundColor: "#EF4444",
                              color: "white",
                              borderWidth: 0,
                              borderStyle: "none",
                              padding: "6px 12px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              cursor: "pointer",
                              fontWeight: "500",
                              transition: "background-color 0.2s",
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#DC2626")}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#EF4444")}
                          >
                            Register as Carry-Over
                          </button>
                        </td>
                      </tr>
                    ))}

                    {currentCarryOverCourses.length === 0 && (
                      <tr>
                        <td colSpan={8} style={{ padding: "16px", textAlign: "center" }}>
                          No courses available for Year {carryOverYear}, {carryOverSemester} Semester
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Carry-Over Pagination */}
              {totalCarryOverPages > 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "16px",
                  }}
                >
                  <button
                    onClick={() => setCarryOverPage((prev) => Math.max(prev - 1, 1))}
                    disabled={carryOverPage === 1}
                    style={{
                      padding: "6px 12px",
                      border: "1px solid #E5E7EB",
                      borderRadius: "4px",
                      backgroundColor: "white",
                      cursor: carryOverPage === 1 ? "not-allowed" : "pointer",
                      opacity: carryOverPage === 1 ? 0.5 : 1,
                    }}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalCarryOverPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCarryOverPage(index + 1)}
                      style={{
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #E5E7EB",
                        borderRadius: "4px",
                        backgroundColor: carryOverPage === index + 1 ? "#EF4444" : "white",
                        color: carryOverPage === index + 1 ? "white" : "#6B7280",
                        cursor: "pointer",
                      }}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCarryOverPage((prev) => Math.min(prev + 1, totalCarryOverPages))}
                    disabled={carryOverPage === totalCarryOverPages}
                    style={{
                      padding: "6px 12px",
                      border: "1px solid #E5E7EB",
                      borderRadius: "4px",
                      backgroundColor: "white",
                      cursor: carryOverPage === totalCarryOverPages ? "not-allowed" : "pointer",
                      opacity: carryOverPage === totalCarryOverPages ? 0.5 : 1,
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Registered Courses Tab Content */}
      {activeMainTab === "registered" && (
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "16px",
              color: "#111827",
            }}
          >
            Registered Courses
          </h2>

          {/* Year Tabs */}
          <div
            style={{
              display: "flex",
              maxWidth: "600px",
              margin: "0 auto 16px auto",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid #E5E7EB",
            }}
          >
            {["1", "2", "3", "4", "5"].map((year) => (
              <button
                key={year}
                onClick={() => setActiveRegisteredYear(year)}
                style={{
                  flex: 1,
                  padding: "8px 16px",
                  backgroundColor: activeRegisteredYear === year ? "#2563EB" : "white",
                  color: activeRegisteredYear === year ? "white" : "#6B7280",
                  borderWidth: 0,
                  borderStyle: "none",
                  cursor: "pointer",
                  fontWeight: activeRegisteredYear === year ? "bold" : "normal",
                  transition: "all 0.2s",
                }}
              >
                Year {year}
              </button>
            ))}
          </div>

          {/* Semester Tabs */}
          <div
            style={{
              display: "flex",
              maxWidth: "400px",
              margin: "0 auto 24px auto",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid #E5E7EB",
            }}
          >
            <button
              onClick={() => setActiveRegisteredSemester("First")}
              style={{
                flex: 1,
                padding: "8px 16px",
                backgroundColor: activeRegisteredSemester === "First" ? "#2563EB" : "white",
                color: activeRegisteredSemester === "First" ? "white" : "#6B7280",
                borderWidth: 0,
                borderStyle: "none",
                cursor: "pointer",
                fontWeight: activeRegisteredSemester === "First" ? "bold" : "normal",
                transition: "all 0.2s",
              }}
            >
              First Semester
            </button>
            <button
              onClick={() => setActiveRegisteredSemester("Second")}
              style={{
                flex: 1,
                padding: "8px 16px",
                backgroundColor: activeRegisteredSemester === "Second" ? "#2563EB" : "white",
                color: activeRegisteredSemester === "Second" ? "white" : "#6B7280",
                borderWidth: 0,
                borderStyle: "none",
                cursor: "pointer",
                fontWeight: activeRegisteredSemester === "Second" ? "bold" : "normal",
                transition: "all 0.2s",
              }}
            >
              Second Semester
            </button>
          </div>

          {/* Registration Summary */}
          <div
            style={{
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "24px",
              backgroundColor: "#F9FAFB",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "600",
                marginBottom: "12px",
                color: "#111827",
              }}
            >
              Registration Summary - Year {activeRegisteredYear}, {activeRegisteredSemester} Semester
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "16px",
              }}
            >
              <div>
                <p style={{ fontSize: "14px", color: "#6B7280" }}>Total Courses</p>
                <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                  {registeredCourses[activeRegisteredYear][activeRegisteredSemester].length}
                </p>
              </div>
              <div>
                <p style={{ fontSize: "14px", color: "#6B7280" }}>Total Units</p>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color:
                      calculateTotalUnits(activeRegisteredYear, activeRegisteredSemester) > maxUnits
                        ? "#DC2626"
                        : "inherit",
                  }}
                >
                  {calculateTotalUnits(activeRegisteredYear, activeRegisteredSemester)}
                  {calculateTotalUnits(activeRegisteredYear, activeRegisteredSemester) > maxUnits && (
                    <span style={{ fontSize: "14px", color: "#DC2626", marginLeft: "4px" }}>(Exceeds limit)</span>
                  )}
                </p>
              </div>
              <div>
                <p style={{ fontSize: "14px", color: "#6B7280" }}>Carry-Over Courses</p>
                <p style={{ fontSize: "24px", fontWeight: "bold", color: "#DC2626" }}>
                  {
                    registeredCourses[activeRegisteredYear][activeRegisteredSemester].filter((c) => c.isCarryOver)
                      .length
                  }
                </p>
              </div>
            </div>
            <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "14px", color: "#6B7280" }}>
                Maximum Credit Units: <strong>{maxUnits}</strong>
              </span>
              <span
                style={{
                  fontSize: "14px",
                  marginLeft: "16px",
                  color:
                    calculateTotalUnits(activeRegisteredYear, activeRegisteredSemester) > maxUnits
                      ? "#DC2626"
                      : "#6B7280",
                  fontWeight:
                    calculateTotalUnits(activeRegisteredYear, activeRegisteredSemester) > maxUnits ? "bold" : "normal",
                }}
              >
                {calculateTotalUnits(activeRegisteredYear, activeRegisteredSemester) > maxUnits
                  ? `Warning: Exceeds maximum by ${calculateTotalUnits(activeRegisteredYear, activeRegisteredSemester) - maxUnits} units`
                  : "Units within limit"}
              </span>
            </div>
            <div style={{ marginTop: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                <span>Credit Units Used</span>
                <span>
                  {calculateTotalUnits(activeRegisteredYear, activeRegisteredSemester)} / {maxUnits}
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "8px",
                  backgroundColor: "#E5E7EB",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${Math.min((calculateTotalUnits(activeRegisteredYear, activeRegisteredSemester) / maxUnits) * 100, 100)}%`,
                    height: "100%",
                    backgroundColor:
                      calculateTotalUnits(activeRegisteredYear, activeRegisteredSemester) > maxUnits
                        ? "#DC2626"
                        : "#2563EB",
                    transition: "width 0.3s ease",
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Registered Courses Table */}
          <div
            style={{
              border: "1px solid #E5E7EB",
              borderRadius: "6px",
              overflowX: "auto",
              overflowY: "auto",  
              overflow: "hidden",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#F9FAFB" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>
                    Course Code
                  </th>
                  <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>
                    Course Title
                  </th>
                  <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>Units</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>Type</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>
                    Department
                  </th>
                  <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>Level</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>Status</th>
                  <th style={{ padding: "12px 16px", textAlign: "left", borderBottom: "1px solid #E5E7EB" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {registeredCourses[activeRegisteredYear][activeRegisteredSemester].map((course) => (
                  <tr
                    key={course.id}
                    style={{
                      borderBottom: "1px solid #E5E7EB",
                      backgroundColor: course.isCarryOver ? "#FEF2F2" : "transparent",
                    }}
                  >
                    <td style={{ padding: "12px 16px", fontWeight: "500" }}>{course.id}</td>
                    <td style={{ padding: "12px 16px" }}>{course.title}</td>
                    <td style={{ padding: "12px 16px" }}>{course.units}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "500",
                          ...getBadgeColor(course.type),
                        }}
                      >
                        {course.type}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>{course.department}</td>
                    <td style={{ padding: "12px 16px" }}>{course.level}</td>
                    <td style={{ padding: "12px 16px" }}>
                      {course.isCarryOver ? (
                        <span
                          style={{
                            display: "inline-block",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: "500",
                            backgroundColor: "#FEE2E2",
                            color: "#991B1B",
                          }}
                        >
                          Carry-Over (Year {course.originalYear})
                        </span>
                      ) : (
                        <span
                          style={{
                            display: "inline-block",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: "500",
                            backgroundColor: "#DCFCE7",
                            color: "#166534",
                          }}
                        >
                          Regular
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <button
                        onClick={() => handleUnregisterCourse(course.id)}
                        style={{
                          backgroundColor: "#EF4444",
                          color: "white",
                          borderWidth: 0,
                          borderStyle: "none",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          cursor: "pointer",
                          fontWeight: "500",
                          transition: "background-color 0.2s",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#DC2626")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#EF4444")}
                      >
                        Unregister
                      </button>
                    </td>
                  </tr>
                ))}

                {registeredCourses[activeRegisteredYear][activeRegisteredSemester].length === 0 && (
                  <tr>
                    <td colSpan={8} style={{ padding: "16px", textAlign: "center" }}>
                      No courses registered for Year {activeRegisteredYear}, {activeRegisteredSemester} Semester
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
