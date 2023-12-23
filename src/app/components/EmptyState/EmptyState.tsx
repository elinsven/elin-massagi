import Button from "../Button/Button";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  title: string;
  body: string;
  buttonText?: string;
  url?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  body,
  buttonText,
  url,
}) => {
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
};

export default EmptyState;
