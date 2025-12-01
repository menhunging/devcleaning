import DatePicker from "react-datepicker";
import { ru } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

import type { Planner } from "@/types/planner/planner";
import { useFormatedDate } from "@/utils/forPlanner/useFormatedDate";

interface TimePickerStartEndProps {
  formData: Planner;
  setFormData: React.Dispatch<React.SetStateAction<Planner>>;
  mode: "repeat_start" | "repeat_end";
}

const DatePickerRepeat = ({
  formData,
  setFormData,
  mode,
}: TimePickerStartEndProps) => {
  // утилита для форматирования в YYYY-MM-DD
  const formatDate = (date: Date | null) =>
    date
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(date.getDate()).padStart(2, "0")}`
      : "";

  return (
    <div className="blockDatePicker">
      {mode === "repeat_start" ? (
        <>
          {formData.repeat_start && (
            <span className="blockDatePicker__info">
              {useFormatedDate(formData.repeat_start)}
            </span>
          )}

          <DatePicker
            className="datepicker-input datepicker-input--date"
            selected={
              formData.repeat_start ? new Date(formData.repeat_start) : null
            }
            onChange={(date: Date | null) =>
              setFormData((prev) => ({
                ...prev,
                repeat_start: formatDate(date),
                // если новая дата старта позже конца — сбрасываем конец
                repeat_end:
                  prev.repeat_end && date && new Date(prev.repeat_end) < date
                    ? ""
                    : prev.repeat_end,
              }))
            }
            autoComplete="off"
            dateFormat="dd.MM.yyyy"
            placeholderText="Начало"
            locale={ru}
            // конец не может быть раньше старта
            maxDate={
              formData.repeat_end ? new Date(formData.repeat_end) : undefined
            }
          />
        </>
      ) : (
        <>
          {formData.repeat_end && (
            <span className="blockDatePicker__info">
              {useFormatedDate(formData.repeat_end)}
            </span>
          )}

          <DatePicker
            className="datepicker-input datepicker-input--date"
            selected={
              formData.repeat_end ? new Date(formData.repeat_end) : null
            }
            onChange={(date: Date | null) =>
              setFormData((prev) => ({
                ...prev,
                repeat_end: formatDate(date),
              }))
            }
            autoComplete="off"
            dateFormat="dd.MM.yyyy"
            placeholderText="Окончание"
            locale={ru}
            // конец не может быть раньше старта
            minDate={
              formData.repeat_start
                ? new Date(formData.repeat_start)
                : undefined
            }
          />
        </>
      )}
    </div>
  );
};

export default DatePickerRepeat;
