import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css";
import { SearchType } from "../../types";
import Alert from "../Alert/Alert";

type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>;
};

export default function Form({ fetchWeather }: FormProps) {
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });
  const [alert, setAlert] = useState("");
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(search).includes("")) {
      setAlert("All fields are required");
      return;
    }
    fetchWeather(search);
  };

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {alert && <Alert>{alert}</Alert>}
      <div className={styles.field}>
        <label htmlFor="city">City:</label>
        <input
          id="city"
          type="text"
          name="city"
          placeholder="City"
          value={search.city}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="country">Country:</label>
        <select
          id="country"
          value={search.country}
          name="country"
          onChange={handleChange}
          autoComplete="true"
        >
          <option value="country">--- Select a Country ---</option>
          {countries.map((country) => (
            <option key={country.code}>{country.name}</option>
          ))}
        </select>
      </div>

      <input type="submit" value="check weather" className={styles.submit} />
    </form>
  );
}
