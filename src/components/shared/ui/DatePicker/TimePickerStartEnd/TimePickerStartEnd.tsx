import DatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";
import { ru } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

import { useFormatedTime } from "@/utils/forPlanner/useFormatedTime";
import { normalizeTime } from "@/utils/forPlanner/normalizeTime";

import SelectUI from "../../Select/SelectUI/SelectUI";

import type { Planner } from "@/types/planner/planner";
import type { SingleValue } from "react-select";
import type { Option } from "@/types/ui/select/select";

interface TimePickerStartEndProps {
  formData: Planner;
  setFormData: React.Dispatch<React.SetStateAction<Planner>>;
  mode?: "period" | "exact";
}

const TimePickerStartEnd = ({
  formData,
  setFormData,
  mode,
}: TimePickerStartEndProps) => {
  const onChangeDuration = (selected: SingleValue<Option>) => {
    setFormData((prev) => ({
      ...prev,
      duration: selected ? Number(selected.value) : null,
    }));
  };

  const onChangePeriod = (selected: SingleValue<Option>) => {
    setFormData((prev) => ({
      ...prev,
      period: selected ? Number(selected.value) : null,
    }));
  };

  const options = [
    {
      value: "10",
      label: "10 мин",
    },
    {
      value: "20",
      label: "20 мин",
    },
    {
      value: "30",
      label: "30 мин",
    },
    {
      value: "40",
      label: "40 мин",
    },
    {
      value: "50",
      label: "50 мин",
    },
    {
      value: "60",
      label: "60 мин",
    },
    {
      value: "70",
      label: "70 мин",
    },
    {
      value: "80",
      label: "80 мин",
    },
  ];

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

      <div className="blockDatePicker__time">
        <span>Длительность:</span>
        <span
          className={
            !formData.duration
              ? "blockDatePicker__empty"
              : "blockDatePicker__info"
          }
        >
          <SelectUI
            options={options}
            value={
              options?.find(
                (opt) => String(opt.value) === String(formData.duration)
              ) || null
            }
            placeholder={!formData.duration ? "Не выбрано" : ""}
            onChange={onChangeDuration}
          />
        </span>
      </div>

      {mode && (
        <div className="blockDatePicker__time">
          <span>Период:</span>

          <span
            className={
              !formData.period
                ? "blockDatePicker__empty"
                : "blockDatePicker__info"
            }
          >
            <SelectUI
              options={options}
              value={
                options?.find(
                  (opt) => String(opt.value) === String(formData.period)
                ) || null
              }
              placeholder={!formData.period ? "Не выбрано" : ""}
              onChange={onChangePeriod}
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default TimePickerStartEnd;
