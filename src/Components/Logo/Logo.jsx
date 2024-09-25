import styles from "./Logo.module.css";
function Logo() {
  return (
    <div className={styles.logoContainer}>
      <img src="./icons/Logo.png" alt="logo" />
    </div>
  );
}

export default Logo;
