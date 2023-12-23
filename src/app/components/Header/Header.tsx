"use client";

import styles from "./Header.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header>
      <nav aria-label="Home navigation" role="navigation">
        <ul className={styles.navigation}>
          <li>
            {pathname !== "/" ? (
              <button
                className={styles.icon}
                type="button"
                aria-label="Go back to previous page"
                onClick={() => router.back()}
              >
                <FontAwesomeIcon icon={faChevronLeft} fontSize={16} />
              </button>
            ) : (
              <div
                className={styles.hidden}
                aria-hidden="true"
              ></div>
            )}
          </li>
          <li>
            <Link className={styles.title} href="/">
              {title}
            </Link>
          </li>
          <li>
            <Link
              className={styles.icon}
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
};

export default Header;
