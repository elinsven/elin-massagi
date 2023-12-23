"use client";

import Link from "next/link";
import styles from "../styles/components/Card.module.css";
import { useRouter } from "next/navigation";

interface CardProps {
  title: string;
  subtitle: string;
  route: string;
}

export default function Card({ title, subtitle, route }: CardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(route);
  };

  return (
    <div className={styles["card"]} onClick={handleCardClick}>
      <h2 className={styles["card-title"]}>
        <Link className={styles["card-link"]} href={route}>
          {title}
        </Link>
      </h2>
      <p className={`subtitle ${styles["card-subtitle"]}`}>{subtitle}</p>
    </div>
  );
}
