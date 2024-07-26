import { ReactNode } from 'react';
import Link from 'next/link';
import styles from "./index.module.css";

// 메타데이터 정의
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

// RootLayout 컴포넌트의 props 타입 정의
// children 속성은 ReactNode 타입으로, 이 컴포넌트의 자식 요소들을 나타냅니다.
interface RootLayoutProps {
  children: ReactNode;
}

// 이 함수는 전체 애플리케이션의 레이아웃을 구성합니다.
// @param {RootLayoutProps} props - 컴포넌트의 props
// @param {ReactNode} props.children - 레이아웃 내부에 렌더링될 자식 컴포넌트들
// @returns {JSX.Element} 전체 레이아웃을 나타내는 JSX 요소
export default function RootLayout({ children }: 
  RootLayoutProps): 
  JSX.Element {
  return (
    
    <html lang="kr">
      {/* head 태그는 비어있지만, Next.js가 자동으로 필요한 메타 태그를 삽입합니다. */}
      <head />
      <body>
        <div className={styles.splashscreen}>
          <main className={styles.mainscreen}>
            {/* 네비게이션 바 */}
            <header className={styles.header}>
              <div className={styles.logo}>
                <div className={styles.logo1}>
                  <img
                    className={styles.logoIcon}
                    loading="lazy"
                    alt=""
                    src="/logo.svg"
                  />
                  <b className={styles.name}>Company</b>
                </div>
                <a className={styles.logo2}>Logo</a>
              </div>
              <div className={styles.itemR}>
                <div className={styles.search}>
                  <img
                    className={styles.icon}
                    loading="lazy"
                    alt=""
                    src="/icon.svg"
                  />
                </div>
              </div>
            </header>
            {children}
          </main>
        </div>

        {/* 튜토용 */}
        <div className="navbar">
          {/* '/' 경로로 이동하는 홈 링크 */}
          <Link href="/">Home</Link>
          {/* '/list' 경로로 이동하는 목록 페이지 링크 */}
          <Link href="/list">List</Link>
        </div>
        {/* 자식 컴포넌트 렌더링 */}
        {/* 이 부분에 각 페이지의 고유한 컨텐츠가 렌더링됩니다. */}
        
      </body>
    </html>
  );
}



