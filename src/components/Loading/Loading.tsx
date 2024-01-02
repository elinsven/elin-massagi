import styles from "./Loading.module.css";

interface LoadingProps {
  size?: "small" | "large";
}

const Loading: React.FC<LoadingProps> = ({ size = "large" }) => {
  return (
    <div
      className={`${styles.spinner} ${
        size === "large" ? styles.large : styles.small
      }`}
    ></div>
  );
};

export default Loading;
