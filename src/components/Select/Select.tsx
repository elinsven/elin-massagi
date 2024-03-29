import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Select.module.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface SelectProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  options: { value: number; label: string }[];
  register: UseFormRegister<T>;
  errors: FieldErrors;
  required?: boolean;
}

const Select = <T extends FieldValues>({
  label,
  name,
  options,
  register,
  errors,
  required,
}: SelectProps<T>) => {
  const error = errors[name];

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div className={styles.wrapper}>
        <select
          id={name}
          aria-describedby={`${name}-error-message`}
          {...(errors[name] ? { "aria-invalid": true } : {})}
          {...register(name, {
            required: required,
            valueAsNumber: true,
            min: 1,
          })}
        >
          <option value={0} disabled>
            Choose a {label.toLowerCase()}
          </option>
          {options.map(
            (value: { value: number; label: string }, index: number) => (
              <option key={index} value={value.value}>
                {value.label}
              </option>
            )
          )}
        </select>
        <FontAwesomeIcon
          className={styles.arrow}
          icon={faChevronDown}
          fontSize={14}
        />
      </div>

      {error &&
        (error.type === "required" ||
          (error.type === "min" && (
            <div
              role="alert"
              id={`${name}-error-message`}
              className="form-error-message"
            >
              This field is required
            </div>
          )))}
    </div>
  );
};

export default Select;
