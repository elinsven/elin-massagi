import styles from "../styles/components/Header.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header>
      <nav aria-label="Home navigation" role="navigation">
        <ul className={styles["menubar-navigation"]}>
          <li className={styles["menubar-hidden"]} aria-hidden="true"></li>
          <li>
            <Link className={styles["menubar-title"]} href="/">
              {title}
            </Link>
          </li>
          <li>
            <Link
              className={styles["menubar-add-icon"]}
              aria-label="New booking"
              href="/new-booking"
            >
              <FontAwesomeIcon icon={faPlus} fontSize={16} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
