import type { NextPage } from "next";
import styles from "./navigation1.module.css";

export type Navigation1Type = {
  className?: string;
};

const Navigation1: NextPage<Navigation1Type> = ({ className = "" }) => {
  return (
    <div className={[styles.navigation, className].join(" ")}>
      <div className={styles.navigationIconWrapper}>
        <img
          className={styles.navigationIcon}
          loading="lazy"
          alt=""
          src="/vector.svg"
        />
      </div>
      <footer className={styles.rectangleParent}>
        <div className={styles.frameChild} />
        <div className={styles.frameItem} />
      </footer>
    </div>
  );
};

export default Navigation1;
