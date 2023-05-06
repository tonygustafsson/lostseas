import styles from "./Spinner.module.css"

const Spinner = () => (
  <div className={styles.overlay}>
    <span className={styles.spinner}></span>
  </div>
)

export default Spinner
