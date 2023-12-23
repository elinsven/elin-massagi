import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import styles from "./Input.module.css";

interface InputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

const Input = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  type = "text",
  placeholder,
  required,
}: InputProps<T>) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name as string}>{label}</label>
      <input
        id={name as string}
        type={type}
        placeholder={placeholder}
        {...(errors.name ? { "aria-invalid": true } : {})}
        {...register(name, { required: required })}
      />
      {errors.name && errors.name.type === "required" && (
        <span role="alert">This is required</span>
      )}
    </div>
  );
};

export default Input;
