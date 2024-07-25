import type { NextPage } from "next";
import All from "./all";
import styles from "./component.module.css";

export type ComponentType = {
  className?: string;
};

const Component: NextPage<ComponentType> = ({ className = "" }) => {
  return (
    <div className={[styles.div, className].join(" ")}>
      <div className={styles.div1}>
        <div className={styles.unionWrapper}>
          <img
            className={styles.unionIcon}
            loading="lazy"
            alt=""
            src="/union.svg"
          />
        </div>
        <h3 className={styles.title}>문제의 제목 제목 ...</h3>
        <div className={styles.chevrondownWrapper}>
          <img
            className={styles.chevrondownIcon}
            loading="lazy"
            alt=""
            src="/chevrondown@2x.png"
          />
        </div>
      </div>
      <div className={styles.frameParent}>
        <div className={styles.parent}>
          <div className={styles.div2}>
            <div className={styles.title1}>문제 그룹</div>
            <div className={styles.icon}>
              <img className={styles.icon1} alt="" src="/icon-1.svg" />
            </div>
          </div>
          <div className={styles.div3}>
            <div className={styles.checkboxlabel}>
              <input className={styles.checkbox} type="checkbox" />
              <div className={styles.label}>{`sample 하위 문제 `}</div>
              <img className={styles.icon2} alt="" src="/icon.svg" />
            </div>
          </div>
        </div>
        <All
          icon1="/icon.svg"
          icon2="/icon.svg"
          icon3="/icon.svg"
          icon4="/icon.svg"
          icon5="/icon.svg"
        />
        <All
          icon1="/icon.svg"
          icon2="/icon.svg"
          icon3="/icon.svg"
          icon4="/icon.svg"
          icon5="/icon.svg"
        />
      </div>
      <div className={styles.vectorWrapper}>
        <img className={styles.vectorIcon} alt="" src="/vector.svg" />
      </div>
    </div>
  );
};

export default Component;
