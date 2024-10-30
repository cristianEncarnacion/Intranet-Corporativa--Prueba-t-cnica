import styles from "./components/stylesComponents/Layout.module.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const LayoutEmpleado = ({ children }: LayoutProps) => {
  return (
    <div className={styles.gridContainer}>
      <Navbar rol={2} />
      <Sidebar rol={2} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};
