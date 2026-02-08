import { useState, useCallback, type ChangeEvent } from "react";
import type { LogFormData, LogFormProps } from "./types";
import styles from "./LogForm.module.css";

const emptyForm: LogFormData = {
  passengerName: "",
  airport: "",
  timestamp: "",
};

function LogForm(props: LogFormProps) {
  const { type, onSubmit } = props;

  const [formData, setFormData] = useState<LogFormData>(emptyForm);

  const handleSubmit = useCallback(() => {
    if (!formData.passengerName || formData.passengerName.trim() === "") {
      alert("Passenger name is required");
      return;
    }

    if (!formData.airport || formData.airport.trim() === "") {
      alert("Airport is required");
      return;
    }

    onSubmit({ ...formData, type });
    setFormData(emptyForm);
  }, [formData, type, onSubmit]);

  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      const field = target.name as keyof LogFormData;
      setFormData((prev) => ({
        ...prev,
        [field]: target.value,
      }));
    },
    []
  );

  return (
    <div className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="passengerName" className={styles.label}>
          Passenger Name:
        </label>
        <input
          type="text"
          id="passengerName"
          name="passengerName"
          placeholder="cherprang"
          required
          value={formData.passengerName}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="airport" className={styles.label}>
          Airport:
        </label>
        <input
          type="text"
          id="airport"
          name="airport"
          placeholder={
            type === "departure" ? "bangkok" : "tokyo"
          }
          required
          value={formData.airport}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="timestamp" className={styles.label}>
          Date/Time:
        </label>
        <input
          type="datetime-local"
          id="timestamp"
          name="timestamp"
          value={formData.timestamp}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <div className={styles.submitRow}>
        <button
          className={`${styles.submitButton} ${type === "arrival" ? styles.arrival : ""
            }`}
          onClick={handleSubmit}
        >
          {type === "arrival" ? "Submit Arrival" : "Submit Departure"}
        </button>
      </div>
    </div>
  );
}

export default LogForm;
