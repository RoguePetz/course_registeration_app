import styles from "./components.module.css"

export default function UpcomingDeadlines() {
  const deadlines = [
    {
      id: 1,
      title: "Course Registration Deadline",
      date: "August 15, 2023",
      daysLeft: 3,
    },
    {
      id: 2,
      title: "Fee Payment Deadline",
      date: "August 20, 2023",
      daysLeft: 8,
    },
    {
      id: 3,
      title: "Add/Drop Period Ends",
      date: "August 25, 2023",
      daysLeft: 13,
    },
  ]

  return (
    <div className={styles.deadlinesCard}>
      <h2 className={styles.deadlinesTitle}>Upcoming Deadlines</h2>

      <div className={styles.deadlinesList}>
        {deadlines.map((deadline) => (
          <div key={deadline.id} className={styles.deadlineItem}>
            <div className={styles.deadlineInfo}>
              <h3 className={styles.deadlineTitle}>{deadline.title}</h3>
              <p className={styles.deadlineDate}>{deadline.date}</p>
            </div>
            <div className={styles.deadlineCountdown}>
              <span className={styles.daysLeft}>{deadline.daysLeft}</span>
              <span className={styles.daysLabel}>days left</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
