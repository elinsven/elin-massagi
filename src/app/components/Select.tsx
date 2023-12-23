import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/components/Input.module.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface SelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  register: any;
  errors: any;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  register,
  errors,
}) => {
  return (
    <div className={styles.input}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.selectWrapper}>
        <select id={name} {...register(name, { required: true })}>
          {options.map(
            (value: { value: string; label: string }, index: number) => (
              <option key={index} value={value.value}>
                {value.label}
              </option>
            )
          )}
        </select>
        <FontAwesomeIcon
          className={styles.selectArrow}
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
