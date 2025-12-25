import DatePicker from "react-datepicker";
import { ru } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

import { useFormatedDate } from "@/utils/forPlanner/useFormatedDate";
import type { ITask } from "@/types/tasks/tasks";

interface TimePickerMultiProps {
  formData: ITask;
  setFormData: React.Dispatch<React.SetStateAction<ITask>>;
}

const DatePickerMulti = ({ formData, setFormData }: TimePickerMultiProps) => {
  // массив выбранных дат
  const selectedDates = formData.date_start || "";

  const handleChange = (date: Date | null) => {
    if (!date) return;

    const formatted = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    setFormData((prev) => {
      return {
        ...prev,
        date_start: formatted,
      };
    });
  };

  return (
    <div className="blockDatePicker">
      {selectedDates && (
        <span className="blockDatePicker__info">
          {useFormatedDate(selectedDates)}
        </span>
      )}

      <DatePicker
        className="datepicker-input datepicker-input--date"
        selected={null} // одиночный выбор отключаем
        onChange={handleChange}
        autoComplete="off"
        dateFormat="dd.MM.yyyy"
        placeholderText="Выберите дату"
        locale={ru}
      />
    </div>
  );
};

export default DatePickerMulti;
