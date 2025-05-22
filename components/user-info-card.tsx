import styles from "./components.module.css"
interface UserData {
  name?: string;
  mat_no?: string;
  department?: string;
  faculty?: string;
  level?: number;
  // Add other fields as needed
}

interface UserInfoCardProps {
  userData: UserData;
}
export default function UserInfoCard({userData}: UserInfoCardProps) {
  console.log('card',userData)
  return (
    <div className={styles.userInfoCard}>
      <div className={styles.userInfoHeader}>
        <h2 className={styles.userInfoTitle}>Student Information</h2>
      </div>

      <div className={styles.userInfoContent}>
        <div className={styles.userInfoGrid}>
          <div className={styles.userInfoItem}>
            <span className={styles.userInfoLabel}>Full Name</span>
            <span className={styles.userInfoValue}>{userData?.name||'----'}</span>
          </div>

          <div className={styles.userInfoItem}>
            <span className={styles.userInfoLabel}>Matric Number</span>
            <span className={styles.userInfoValue}>{userData?.mat_no||'----'}</span>
          </div>

          <div className={styles.userInfoItem}>
            <span className={styles.userInfoLabel}>Department</span>
            <span className={styles.userInfoValue}>{userData?.department||'----'}</span>
          </div>

          <div className={styles.userInfoItem}>
            <span className={styles.userInfoLabel}>Faculty</span>
            <span className={styles.userInfoValue}>{userData?.faculty||'----'}</span>
          </div>

          <div className={styles.userInfoItem}>
            <span className={styles.userInfoLabel}>Level</span>
            <span className={styles.userInfoValue}>{userData?.level||'----'} Level</span>
          </div>

          <div className={styles.userInfoItem}>
            <span className={styles.userInfoLabel}>CGPA</span>
            <span className={styles.userInfoValue}>4.2/5.0</span>
          </div>

          <div className={styles.userInfoItem}>
            <span className={styles.userInfoLabel}>Academic Status</span>
            <span className={styles.userInfoValue}>Good Standing</span>
          </div>

          <div className={styles.userInfoItem}>
            <span className={styles.userInfoLabel}>Advisor</span>
            <span className={styles.userInfoValue}>Dr. Sarah Johnson</span>
          </div>
        </div>
      </div>
    </div>
  )
}
