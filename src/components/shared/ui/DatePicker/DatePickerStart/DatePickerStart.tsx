import DatePicker from "react-datepicker";
import { ru } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

import type { Planner } from "@/types/planner/planner";
import { useFormatedDate } from "@/utils/forPlanner/useFormatedDate";

interface TimePickerStartEndProps {
  formData: Planner;
  setFormData: React.Dispatch<React.SetStateAction<Planner>>;
}

const DatePickerStart = ({
  formData,
  setFormData,
}: TimePickerStartEndProps) => {
  return (
    <div className="blockDatePicker">
      {formData.date_start && (
        <span className="blockDatePicker__info">
          {useFormatedDate(formData.date_start)}
        </span>
      )}

      <DatePicker
        className="datepicker-input datepicker-input--date"
        selected={formData.date_start ? new Date(formData.date_start) : null}
        onChange={
          (date: Date | null) =>
            setFormData((prev) => ({
              ...prev,
              date_start: date
                ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
                    2,
                    "0"
                  )}-${String(date.getDate()).padStart(2, "0")}`
                : "",
            })) // тут проблема, поэтому так, во первых формат даты непонятно какой надо на бэк отправлять. Плюс проблема смещения на один в DatePicker
        }
        autoComplete="off"
        dateFormat="dd.MM.yyyy"
        placeholderText=""
        locale={ru}
      />
    </div>
  );
};

export default DatePickerStart;
