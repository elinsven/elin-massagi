import { ReactNode } from "react";
import styles from "../styles/components/Button.module.css";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  link?: boolean;
  url?: string;
}

export function Button({ children, type, link = false, url }: ButtonProps) {
  return (
    <>
      {link ? (
        <Link href={url as string} className={styles.button}>
          {children}
        </Link>
      ) : (
        <button className={styles.button} type={type}>
          {children}
        </button>
      )}
    </>
  );
}
