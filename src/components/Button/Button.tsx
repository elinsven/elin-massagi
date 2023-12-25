import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";
import Link from "next/link";

interface CommonButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  link?: boolean;
}

type ButtonProps = CommonButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

type LinkProps = CommonButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>;

type Props = ButtonProps | LinkProps;

const Button: React.FC<Props> = ({
  children,
  type,
  link = false,
  ...props
}) => {
  if (link) {
    const { href, ...linkProps } = props as LinkProps;
    return (
      <Link href={href as string} className={styles.button} {...linkProps}>
        {children}
      </Link>
    );
  } else {
    return (
      <button className={styles.button} type={type} {...(props as ButtonProps)}>
        {children}
      </button>
    );
  }
};

export default Button;
