import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useNavigate } from "react-router-dom";

export function MyDatePicker() {
  const [selected, setSelected] = useState<Date>();
  const navigate = useNavigate();

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setSelected(date);
      navigate(`/journal/${date.toISOString().split("T")[0]}`);
    }
  };

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={handleSelect}
      footer={
        selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
      }
    />
  );
}