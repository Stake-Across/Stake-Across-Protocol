import styles from "./Loader.module.scss";

export default function Loader() {
  return (
    <div className={styles.Loader}>
      <p className={styles.Loader_message}>
        Loading
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </p>
    </div>
  );
}
