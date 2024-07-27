import type { NextPage } from "next";
import All from "./all";
import styles from "./component.module.css";


export type AllType = {
  className?: string;
  icon1?: string;
  icon2?: string;
  icon3?: string;
  icon4?: string;
  icon5?: string;
};

const Component:NextPage = () => {
  return (
  <div className={styles.div}>
  <div className={styles.div1}>
  <div className={styles.unionWrapper}>
  <img className={styles.unionIcon} alt="" src="Union.svg" />
  </div>
  <b className={styles.title}>문제의 제목 제목 ...</b>
  <div className={styles.chevrondownWrapper}>
  <img className={styles.chevrondownIcon} alt="" src="chevronDown$.png" />
  </div>
  </div>
  <div className={styles.frameParent}>
      <div className={styles.parent}>
        <div className={styles.div2}>
          <div className={styles.title1}>문제 그룹</div>
          <div className={styles.icon}>
            <img className={styles.icon1} alt="" src="Icon.svg" />
          </div>
        </div>
        <div className={styles.frameGroup}>
          <div className={styles.chevrondownWrapper}>
            <div className={styles.checkbox} />
          </div>
          <div className={styles.sample22Parent}>
            <div className={styles.sample2}>액션칩 1</div>
            <img className={styles.chevrondownIcon} alt="" src="chevronDown$.png" />
          </div>
        </div>
        <div className={styles.frameGroup}>
          <div className={styles.vectorWrapper}>
            <img className={styles.frameChild} alt="" src="Vector 13.svg" />
          </div>
          <div className={styles.chevrondownWrapper}>
            <div className={styles.checkbox} />
          </div>
          <div className={styles.sample22Parent}>
            <div className={styles.sample2}> 액션칩 뎁스 1</div>
            <img className={styles.chevrondownIcon} alt="" src="chevronDown$.png" />
          </div>
        </div>
      </div>
  <div className={styles.all}>
  <div className={styles.div2}>
  <div className={styles.title1}>문제 그룹</div>
  <div className={styles.icon}>
  <img className={styles.icon1} alt="" src="Icon.svg" />
  </div>
  </div>
  <div className={styles.div4}>
  <div className={styles.div5}>
  <div className={styles.checkboxlabel}>
  <div className={styles.checkbox2}>
  <img className={styles.checkboxChild} alt="" src="Frame 52.svg" />
  </div>
  <div className={styles.label}>{`sample 하위 문제 `}</div>
  </div>
  </div>
  <div className={styles.all}>
  <div className={styles.div7}>
  <div className={styles.checkboxlabel1}>
  <div className={styles.checkbox3}>
  <div className={styles.checkbox4} />
  </div>
  <div className={styles.sample2}>sample 2차 하위 문제 2차 하위 문제 2차 하위 문제 2차 하...</div>
  </div>
  </div>
  <div className={styles.div8}>
  <div className={styles.checkboxlabel1}>
  <div className={styles.checkbox3}>
  <div className={styles.checkbox4} />
  </div>
  <div className={styles.sample2}>sample 2차 하위 문제</div>
  </div>
  </div>
  <div className={styles.div8}>
  <div className={styles.checkboxlabel1}>
  <div className={styles.checkbox3}>
  <div className={styles.checkbox4} />
  </div>
  <div className={styles.sample2}>sample 2차 하위 문제</div>
  </div>
  </div>
  </div>
  </div>
  <div className={styles.div10}>
  <div className={styles.checkboxlabel}>
  <div className={styles.checkbox3}>
  <div className={styles.checkbox4} />
  </div>
  <div className={styles.label}>{`sample 하위 문제 `}</div>
  </div>
  </div>
  </div>
  <div className={styles.all}>
  <div className={styles.div2}>
  <div className={styles.title1}>문제 그룹</div>
  <div className={styles.icon}>
  <img className={styles.icon1} alt="" src="Icon.svg" />
  </div>
  </div>
  <div className={styles.div4}>
  <div className={styles.div5}>
  <div className={styles.checkboxlabel}>
  <div className={styles.checkbox2}>
  <img className={styles.checkboxChild} alt="" src="Frame 52.svg" />
  </div>
  <div className={styles.label}>{`sample 하위 문제 `}</div>
  </div>
  </div>
  <div className={styles.all}>
  <div className={styles.div7}>
  <div className={styles.checkboxlabel1}>
  <div className={styles.checkbox3}>
  <div className={styles.checkbox4} />
  </div>
  <div className={styles.sample2}>sample 2차 하위 문제 2차 하위 문제 2차 하위 문제 2차 하...</div>
  </div>
  </div>
  <div className={styles.div8}>
  <div className={styles.checkboxlabel1}>
  <div className={styles.checkbox3}>
  <div className={styles.checkbox4} />
  </div>
  <div className={styles.sample2}>sample 2차 하위 문제</div>
  </div>
  </div>
  <div className={styles.div8}>
  <div className={styles.checkboxlabel1}>
  <div className={styles.checkbox3}>
  <div className={styles.checkbox4} />
  </div>
  <div className={styles.sample2}>sample 2차 하위 문제</div>
  </div>
  </div>
  </div>
  </div>
  <div className={styles.div18}>
  <div className={styles.checkboxlabel}>
  <div className={styles.checkbox3}>
  <div className={styles.checkbox4} />
  </div>
  <div className={styles.label}>{`sample 하위 문제 `}</div>
  </div>
  </div>
  </div>
  </div>
  </div>);
  };

export default Component;
