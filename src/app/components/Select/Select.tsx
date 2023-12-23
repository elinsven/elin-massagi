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
  options: { value: string; label: string }[];
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
  return (
    <div className={styles.input}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.wrapper}>
        <select id={name} {...register(name, { required: required })}>
          {options.map(
            (value: { value: string; label: string }, index: number) => (
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

      {errors.name && errors.name.type === "required" && (
        <span role="alert">This is required</span>
      )}
    </div>
  );
};

export default Select;
