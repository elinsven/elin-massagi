import styles from "../styles/components/EmptyState.module.css";
import { Button } from "./Button";

interface EmptyStateProps {
  title: string;
  body: string;
  buttonText?: string;
  url?: string;
}

export function EmptyState({ title, body, buttonText, url }: EmptyStateProps) {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <p>{body}</p>
      {buttonText && (
        <Button link url={url}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}
