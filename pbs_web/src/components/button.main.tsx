'use client'
import type { NextPage } from "next";
import Link from 'next/link';
import styles from "./button.main.module.css";
import { useState } from "react";

export default function ButtonMain({ href, text, iconSrc }: 
    { href: string; text: string; iconSrc: string }) {
        return (
        <Link href={href} passHref legacyBehavior>
            <a className={styles.button}>
            <div className={styles.buttonMain}>
                <div className={styles.iconLParent}>
                <img className={styles.iconL} alt={text} src={iconSrc} />
                <div className={styles.buttonText}>{text}</div>
                </div>
                <img className={styles.iconR1} alt="" src="/icon-r.svg" />
            </div>
            </a>
        </Link>
    );
  }
