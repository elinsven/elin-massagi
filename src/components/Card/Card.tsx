"use client";

import Link from "next/link";
import styles from "./Card.module.css";
import { useRouter } from "next/navigation";

interface CardProps {
  title: string;
  subtitle: string;
  route: string;
}

const Card: React.FC<CardProps> = ({ title, subtitle, route }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(route);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <h2 className={styles.title}>
        <Link className={styles.link} href={route}>
          {title}
        </Link>
      </h2>
      <p className={`subtitle ${styles.subtitle}`}>{subtitle}</p>
    </div>
  );
};

export default Card;
