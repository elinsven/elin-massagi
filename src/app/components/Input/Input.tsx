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
  const error = errors[name];

  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        aria-describedby={`${name}-error-message`}
        type={type}
        placeholder={placeholder}
        {...(errors[name] ? { "aria-invalid": true } : {})}
        {...register(name, { required: required })}
      />

      {error && error.type === "required" && (
        <div
          role="alert"
          id={`${name}-error-message`}
          className="form-error-message"
        >
          This field is required
        </div>
      )}
    </div>
  );
};

export default Input;
