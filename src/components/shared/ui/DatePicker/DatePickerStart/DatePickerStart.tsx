import DatePicker from "react-datepicker";
import { ru } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

import type { Planner } from "@/types/planner/planner";
import { useFormatedDate } from "@/utils/forPlanner/useFormatedDate";

interface TimePickerMultiProps {
  formData: Planner;
  setFormData: React.Dispatch<React.SetStateAction<Planner>>;
}

const DatePickerMulti = ({ formData, setFormData }: TimePickerMultiProps) => {
  // массив выбранных дат
  const selectedDates = formData.date || [];

  const handleChange = (date: Date | null) => {
    if (!date) return;

    const formatted = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    setFormData((prev) => {
      const alreadySelected = prev.date?.includes(formatted);

      return {
        ...prev,
        date: alreadySelected
          ? prev.date?.filter((d) => d !== formatted) // убираем если повторный клик
          : [...(prev.date || []), formatted], // добавляем новую дату
      };
    });
  };

  return (
    <div className="blockDatePicker">
      {selectedDates?.length > 0 &&
        selectedDates.map((d) => {
          return (
            <span className="blockDatePicker__info">{useFormatedDate(d)}</span>
          );
        })}

      <DatePicker
        className="datepicker-input datepicker-input--date"
        selected={null} // одиночный выбор отключаем
        onChange={handleChange}
        autoComplete="off"
        dateFormat="dd.MM.yyyy"
        placeholderText="Выберите даты"
        locale={ru}
      />
    </div>
  );
};

export default DatePickerMulti;
