import type { NextPage } from "next";
import styles from "./all.module.css";

export type AllType = {
  className?: string;
  icon1?: string;
  icon2?: string;
  icon3?: string;
  icon4?: string;
  icon5?: string;
};

const All: NextPage<AllType> = ({
  className = "",
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
}) => {
  return (
    <div className={[styles.all, className].join(" ")}>
      <div className={styles.div}>
        <div className={styles.title}>문제 그룹</div>
        <div className={styles.icon}>
          <img className={styles.icon1} alt="" src="/icon-1.svg" />
        </div>
      </div>
      <div className={styles.div1}>
        <div className={styles.div2}>
          <div className={styles.checkboxlabel}>
            <div className={styles.checkbox}>
              <img
                className={styles.checkboxChild}
                loading="lazy"
                alt=""
                src="/frame-52.svg"
              />
            </div>
            <div className={styles.label}>{`sample 하위 문제 `}</div>
            <img className={styles.icon2} alt="" src={icon1} />
          </div>
        </div>
        <div className={styles.div3}>
          <div className={styles.div4}>
            <div className={styles.checkboxlabel1}>
              <input className={styles.checkbox1} type="checkbox" />
              <div className={styles.label1}>
                sample 2차 하위 문제 2차 하위 문제 2차 하위 문제 2차 하...
              </div>
              <img className={styles.icon3} alt="" src={icon2} />
            </div>
          </div>
          <div className={styles.div5}>
            <div className={styles.checkboxlabel2}>
              <input className={styles.checkbox2} type="checkbox" />
              <div className={styles.label2}>sample 2차 하위 문제</div>
              <img className={styles.icon4} alt="" src={icon3} />
            </div>
          </div>
          <div className={styles.div6}>
            <div className={styles.checkboxlabel3}>
              <input className={styles.checkbox3} type="checkbox" />
              <div className={styles.label3}>sample 2차 하위 문제</div>
              <img className={styles.icon5} alt="" src={icon4} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.div7}>
        <div className={styles.checkboxlabel4}>
          <input className={styles.checkbox4} type="checkbox" />
          <div className={styles.label4}>{`sample 하위 문제 `}</div>
          <img className={styles.icon6} alt="" src={icon5} />
        </div>
      </div>
    </div>
  );
};

export default All;
