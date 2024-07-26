import "./global.css";
import Link from 'next/link';
import type { NextPage } from "next";
import Component from "../components/component";
import styles from "./index.module.css";
import Image from "next/image";
import ButtonMain from "../components/button.Main";



const SplashScreen: NextPage = () => {
  const buttonMainLinks = [
    { href: "/today", text: "오늘 할 일" },
    { href: "/first-steps", text: "First Steps" },
    { href: "/add-task", text: "작업 추가" }
  ];

  return (
    <section className={styles.frameParent}>
      <div className={styles.buttonMainParent}>
        {
          buttonMainLinks.map((link, index) => (
            <ButtonMain key={index} href={link.href} text={link.text} iconSrc={`/icon-2-${index + 1}.svg`} />
          ))
        }
      </div>
      <Component />
    </section>
  );
};



export default SplashScreen;