import DatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";
import { ru } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

import { useFormatedTime } from "@/utils/forPlanner/useFormatedTime";
import { normalizeTime } from "@/utils/forPlanner/normalizeTime";

import type { Planner } from "@/types/planner/planner";

interface TimePickerStartEndProps {
  formData: Planner;
  setFormData: React.Dispatch<React.SetStateAction<Planner>>;
}

const TimePickerStartEnd = ({
  formData,
  setFormData,
}: TimePickerStartEndProps) => {
  return (
    <div className="blockDatePicker">
      <div className="blockDatePicker__time">
        <span>Начало:</span>

        {formData.time_start && (
          <span className="blockDatePicker__info">
            {normalizeTime(formData.time_start)}
          </span>
        )}

        <DatePicker
          id="time_start"
          className="datepicker-input datepicker-input--time"
          selected={
            formData.time_start
              ? new Date(`1970-01-01T${normalizeTime(formData.time_start)}`)
              : null
          }
          onChange={(date: Date | null) => {
            if (date) {
              setFormData((prev) => ({
                ...prev,
                time_start: useFormatedTime(date), // делаем вот такой форма 00:00
              }));
            }
          }}
          autoComplete="off"
          showTimeSelect
          showTimeSelectOnly
          timeFormat="HH:mm"
          timeIntervals={5}
          dateFormat="HH:mm"
          locale={ru}
          minTime={setHours(setMinutes(new Date(), 0), 0)} // всегда от 00:00
          maxTime={
            formData.time_end
              ? new Date(`1970-01-01T${normalizeTime(formData.time_end)}`)
              : setHours(setMinutes(new Date(), 59), 23)
          }
        />
      </div>

      <div className="blockDatePicker__time">
        <span>Окончание:</span>

        {formData.time_end && (
          <span className="blockDatePicker__info">
            {normalizeTime(formData.time_end)}
          </span>
        )}

        <DatePicker
          id="time_end"
          className="datepicker-input datepicker-input--time"
          selected={
            formData.time_end
              ? new Date(`1970-01-01T${normalizeTime(formData.time_end)}`)
              : null
          }
          onChange={(date: Date | null) => {
            if (date) {
              setFormData((prev) => ({
                ...prev,
                time_end: useFormatedTime(date), // делаем вот такой форма 00:00
              }));
            }
          }}
          autoComplete="off"
          showTimeSelect
          showTimeSelectOnly
          timeFormat="HH:mm"
          timeIntervals={5}
          dateFormat="HH:mm"
          locale={ru}
          minTime={
            formData.time_start
              ? new Date(`1970-01-01T${normalizeTime(formData.time_start)}`)
              : setHours(setMinutes(new Date(), 0), 0)
          }
          maxTime={setHours(setMinutes(new Date(), 59), 23)} // всегда до конца дня
        />
      </div>
    </div>
  );
};

export default TimePickerStartEnd;
