import { ReactNode } from "react";
import styles from "./Button.module.css";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  link?: boolean;
  url?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  link = false,
  url,
}) => {
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
};

export default Button;
