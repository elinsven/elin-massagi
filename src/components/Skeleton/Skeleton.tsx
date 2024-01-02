import styles from "./Skeleton.module.css";

interface SkeletonProps {
  height: string;
  width: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  height = "4rem",
  width = "4rem",
}) => {
  return (
    <div
      className={styles.skeleton}
      style={
        {
          "--container-width": width,
          "--container-height": height,
        } as React.CSSProperties
      }
    ></div>
  );
};

export default Skeleton;
