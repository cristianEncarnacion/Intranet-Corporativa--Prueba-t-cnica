import React from "react";
import styles from "./stylesComponents/FormComponent.module.css";

type Field = {
  type: string;
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  options?: Array<{ value: string; label: string }>;
};

type Props = {
  fields: Field[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
};

const FormComponent = ({ fields, handleSubmit, title }: Props) => {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {fields.map((field) => (
        <div key={field.name} className={styles.field}>
          <label className={styles.label}>{field.label}</label>
          {field.type === "select" ? (
            <select
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              className={styles.select}
            >
              <option value="" key="default">
                Seleccione una opcion
              </option>
              {field.options?.map((option, index) => (
                <option key={`${option.value}-${index}`} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              placeholder={field.placeholder}
              className={styles.input}
            />
          )}
        </div>
      ))}
      <button type="submit" className={styles.submitButton}>
        {title}
      </button>
    </form>
  );
};

export default FormComponent;
