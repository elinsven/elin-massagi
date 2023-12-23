import styles from "../styles/components/Input.module.css";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: any;
  errors: any;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  errors,
}) => {
  const ariaInvalidProps = () => ({
    "aria-invalid": errors.name ? "true" : "false",
  });

  return (
    <div className={styles.input}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...ariaInvalidProps()}
        {...register(name, { required: true })}
      />
      {errors.name && errors.name.type === "required" && (
        <span role="alert">This is required</span>
      )}
    </div>
  );
};

export default Input;
