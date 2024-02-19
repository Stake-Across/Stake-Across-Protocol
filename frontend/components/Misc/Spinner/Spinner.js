import React from "react";
import styles from "./Spinner.module.scss";

export default function Spinner() {
  return <div className={styles.spinner}>
    <div className={styles.subspinner}></div>
  </div>;
}
