import styles from "./components/styles/Layout.module.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const LayoutAdmin = ({ children }: LayoutProps) => {
  return (
    <div className={styles.gridContainer}>
      <Navbar rol={1} />
      <Sidebar rol={1} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};
