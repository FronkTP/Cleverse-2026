import { useState, useCallback, type ChangeEvent } from "react";
import type { LogFormData, LogFormProps } from "./types";

const emptyForm: LogFormData = {
  passengerName: "",
  airport: "",
  timestamp: "",
};

function LogForm(props: LogFormProps) {
  const { type, onSubmit } = props;

  const [formData, setFormData] = useState<LogFormData>(emptyForm);

  const handleSubmit = useCallback(() => {
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
    <div style={{ display: "flex", columnGap: 8 }}>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", rowGap: 4 }}
      >
        <label htmlFor="passengerName" style={{ fontWeight: "bold" }}>
          Passenger Name:
        </label>
        <input
          type="text"
          id="passengerName"
          name="passengerName"
          value={formData.passengerName}
          onChange={handleChange}
        />
      </div>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", rowGap: 4 }}
      >
        <label htmlFor="airport" style={{ fontWeight: "bold" }}>
          Airport:
        </label>
        <input
          type="text"
          id="airport"
          name="airport"
          value={formData.airport}
          onChange={handleChange}
        />
      </div>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", rowGap: 4 }}
      >
        <label htmlFor="timestamp" style={{ fontWeight: "bold" }}>
          Date/Time:
        </label>
        <input
          type="datetime-local"
          id="timestamp"
          name="timestamp"
          value={formData.timestamp}
          onChange={handleChange}
        />
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end" }}>
        <button style={{ cursor: "pointer" }} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default LogForm;
