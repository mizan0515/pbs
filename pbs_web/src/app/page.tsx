import "./global.css";
import Link from 'next/link';
import type { NextPage } from "next";
import Component from "../components/component";
import styles from "./index.module.css";

const SplashScreen: NextPage = () => {
  return (
    <section className={styles.frameParent}>
      <div className={styles.buttonParent}>
        <Link href="/today" passHref legacyBehavior>
          <a className={styles.button}>
            <div className={styles.buttonMain}>
              <div className={styles.iconLParent}>
                <img className={styles.iconL} alt="" src="/icon-l.svg" />
                <div className={styles.buttonText}>오늘 할 일</div>
              </div>
              <img className={styles.iconR} alt="" src="/icon-r.svg" />
            </div>
          </a>
        </Link>
        <Link href="/first-steps" passHref legacyBehavior>
          <a className={styles.button}>
            <div className={styles.buttonMain}>
              <div className={styles.iconLParent}>
                <img className={styles.iconL} alt="" src="/icon-l-1.svg" />
                <div className={styles.buttonText}>First Steps</div>
              </div>
              <img className={styles.iconR} alt="" src="/icon-r.svg" />
            </div>
          </a>
        </Link>
        <Link href="/add-task" passHref legacyBehavior>
          <a className={styles.button}>
            <div className={styles.buttonMain}>
              <div className={styles.iconLParent}>
                <img className={styles.iconL} alt="" src="/icon-l-2.svg" />
                <div className={styles.buttonText}>작업 추가</div>
              </div>
              <img className={styles.iconR} alt="" src="/icon-r.svg" />
            </div>
          </a>
        </Link>
      </div>
      <Component />
    </section>
  );
};

export default SplashScreen;