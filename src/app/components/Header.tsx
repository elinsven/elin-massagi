"use client";

import styles from "../styles/components/Header.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header>
      <nav aria-label="Home navigation" role="navigation">
        <ul className={styles["menubar-navigation"]}>
          <li>
            {pathname !== "/" ? (
              <button
                className={styles["menubar-add-icon"]}
                type="button"
                aria-label="Go back to previous page"
                onClick={() => router.back()}
              >
                <FontAwesomeIcon icon={faChevronLeft} fontSize={16} />
              </button>
            ) : (
              <div
                className={styles["menubar-hidden"]}
                aria-hidden="true"
              ></div>
            )}
          </li>
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
