import { useEffect, useState } from "react";

import type { Option } from "@/types/ui/select/select";
import type { SingleValue } from "react-select";
import type { Planner } from "@/types/planner/planner";

import { useAppDispatch } from "@/store/store";
import { getObjectById } from "@/store/slices/objectSlice";

import Modal from "@/components/shared/ui/Modal/Modal";
import SelectUI from "@/components/shared/ui/Select/SelectUI/SelectUI";
import { usePlannerOptions } from "@/hook/usePlannerOptions/usePlannerOptions";
import TimePickerStartEnd from "@/components/shared/ui/DatePicker/TimePickerStartEnd/TimePickerStartEnd";
import DatePickerStart from "@/components/shared/ui/DatePicker/DatePickerStart/DatePickerStart";

import "./PlannerPopup.scss";
import DatePickerRepeat from "@/components/shared/ui/DatePicker/DatePickerRepeat/DatePickerRepeat";

interface PlannerPopupProps {
  mode?: "add" | "edit" | "addAppels";
  loading: boolean;
  loadingObject: boolean;
  initialData?: Planner | null;
  isOpen: boolean;
  handleModalClose: () => void;
  onSubmit: (props: Planner) => void;
}

const PlannerPopup: React.FC<PlannerPopupProps> = ({
  mode,
  loading,
  loadingObject,
  initialData,
  isOpen,
  handleModalClose,
  onSubmit,
}) => {
  const initFormData = (initialData?: Planner | null) => ({
    id: initialData?.id || null,
    name: initialData?.name || "",
    description: initialData?.description || "",

    id_object: initialData?.id_object || "",
    name_object: initialData?.name_object || "",

    id_zone: initialData?.id_zone || "",
    name_zone: initialData?.name_zone || "",

    id_user: initialData?.id_user || "",
    name_user: initialData?.name_user || "",
    surname_user: initialData?.surname_user || "",

    status: initialData?.status || 0,
    name_status: initialData?.name_status || "",

    id_team: initialData?.id_team || "",
    name_team: initialData?.name_team || "",

    data_create: initialData?.data_create || "",

    date: initialData?.date || [],
    data_end: initialData?.data_end || "",

    time_start: initialData?.time_start || "",
    time_end: initialData?.time_end || "",

    repeat_start: initialData?.repeat_start || "",
    repeat_end: initialData?.repeat_end || "",

    duration: initialData?.duration || null,
    period: initialData?.period || null,

    days: initialData?.days || [],
  });

  const [formData, setFormData] = useState(initFormData(initialData));

  const [activeTab, setActiveTab] = useState<"user" | "team">(
    formData.id_team ? "team" : "user"
  ); // табы для сотрудников и команды

  const [activeDateTab, setActiveDateTab] = useState<"day" | "week">(
    formData.days?.length ? "week" : "day"
  ); // табя для даты

  const [activeTimeTab, setActiveTimeTab] = useState<"period" | "exact">(
    "exact"
  ); // табя для времени

  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const toggleDay = (day: string) => {
    setFormData((prevFormData) => {
      const prevDays = prevFormData.days || [];
      const updatedDays = prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day];

      return {
        ...prevFormData,
        days: updatedDays,
      };
    });
  };

  const { optionsObjects, optionsZones, optionsUsers, optionsTeams } =
    usePlannerOptions();

  const dispatch = useAppDispatch();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleObjectSelect = async (selected: SingleValue<Option>) => {
    setFormData((prev) => ({
      ...prev,
      id_zone: "",
      id_user: "",
      id_team: "",
      name_zone: "",
    }));

    // const result = await dispatch(getObjectById(String(selected?.value)));

    setFormData((prev) => ({
      ...prev,
      id_object: selected ? selected.value : "",
      name_object: selected ? selected.label : "",
      name_zone: "",
    }));

    // if (getObjectById.fulfilled.match(result)) {
    // }
  };

  const handleZoneSelect = async (selected: SingleValue<Option>) => {
    setFormData((prev) => ({
      ...prev,
      id_zone: selected ? selected.value : "",
      name_zone: selected ? selected.label : "",
    }));
  };

  const handleUsersSelect = async (selected: SingleValue<Option>) => {
    setFormData((prev) => ({
      ...prev,
      id_user: selected ? selected.value : "",
      name_user: selected ? selected.label : "",
      id_team: "",
      name_team: "",
    }));
  };

  const handleTeamSelect = async (selected: SingleValue<Option>) => {
    setFormData((prev) => ({
      ...prev,
      id_team: selected ? selected.value : "",
      name_team: selected ? selected.label : "",
      id_user: "",
      name_user: "",
    }));
  };

  const resetScheduleFields = () => {
    setFormData((prev) => ({
      ...prev,
      date: [],
      days: [],
      repeat_start: "",
      repeat_end: "",
      time_start: "",
      time_end: "",
    }));
  };

  const handleClose = () => {
    resetScheduleFields();
    handleModalClose();
  };

  const handeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const hasDates =
    formData.date.length > 0 ||
    (formData.days.length > 0 && formData.repeat_start && formData.repeat_end);

  const btnDisabled =
    loading ||
    loadingObject ||
    !formData.name ||
    !formData.id_object ||
    !formData.id_zone ||
    !(formData.id_team || formData.id_user) ||
    !formData.description ||
    !hasDates ||
    !formData.time_start ||
    !formData.time_end;

  useEffect(() => {
    setFormData(initFormData(initialData));
  }, [initialData]);

  useEffect(() => {
    if (formData.id_object) {
      dispatch(getObjectById(formData.id_object));
    }
  }, [formData.id_object, dispatch]);

  useEffect(() => {
    setActiveTab(formData.id_team ? "team" : "user");
  }, [formData.id_team, dispatch]);

  useEffect(() => {
    setActiveDateTab(formData.days?.length ? "week" : "day");
  }, [formData.days]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="popup-planer">
        <div className="popup-planer__head">
          {mode !== "add" ? formData.name : "Новое задание"}
        </div>

        <form className="popup-planer__form" onSubmit={handeSubmit}>
          <div className="popup-planer__col">
            <div className="input-item">
              <label htmlFor="name">Название</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-item">
              <div className="selectWrap">
                <label htmlFor="address">Объект</label>
                <div className="selectWrap__wrap">
                  <SelectUI
                    options={optionsObjects}
                    value={
                      optionsObjects?.find(
                        (opt) =>
                          Number(opt.value) === Number(formData.id_object)
                      ) || null
                    }
                    onChange={(event) => {
                      handleObjectSelect(event);
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className={
                formData.id_object && !loadingObject
                  ? "input-item"
                  : "input-item input-item--disabled"
              }
            >
              <div className="selectWrap">
                <label htmlFor="address">Зона</label>
                <div className="selectWrap__wrap">
                  <SelectUI
                    options={optionsZones}
                    value={
                      optionsZones?.find(
                        (opt) => Number(opt.value) === Number(formData.id_zone)
                      ) || null
                    }
                    onChange={(event) => {
                      handleZoneSelect(event);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="popup-planer__users">
              <>
                <div className="popup-planer__users__tabs">
                  <span
                    className={activeTab === "user" ? "active" : ""}
                    onClick={() => setActiveTab("user")}
                  >
                    исполнитель
                  </span>
                  <span
                    className={activeTab === "team" ? "active" : ""}
                    onClick={() => setActiveTab("team")}
                  >
                    команда
                  </span>
                </div>

                {activeTab === "user" && (
                  <div
                    className={
                      formData.id_zone && !loadingObject
                        ? "input-item"
                        : "input-item input-item--disabled"
                    }
                  >
                    <div className="selectWrap">
                      <label htmlFor="address">Сотрудники</label>
                      <div className="selectWrap__wrap">
                        <SelectUI
                          options={optionsUsers}
                          value={
                            optionsUsers?.find(
                              (opt) =>
                                Number(opt.value) === Number(formData.id_user)
                            ) || null
                          }
                          onChange={handleUsersSelect}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "team" && (
                  <div
                    className={
                      formData.id_zone && !loadingObject
                        ? "input-item"
                        : "input-item input-item--disabled"
                    }
                  >
                    <div className="selectWrap">
                      <label htmlFor="address">Команда</label>
                      <div className="selectWrap__wrap">
                        <SelectUI
                          options={optionsTeams}
                          value={
                            optionsTeams?.find(
                              (opt) =>
                                Number(opt.value) === Number(formData.id_team)
                            ) || null
                          }
                          onChange={handleTeamSelect}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            </div>

            <div className="input-item">
              <label htmlFor="name">Описание задачи</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          <div
            className={
              mode !== "edit"
                ? "popup-planer__col"
                : "popup-planer__col popup-planer__col--disabled"
            }
          >
            <div className="input-date">
              <label>Дата выполнения:</label>

              <div className="tab-input-date tab-input-date--date">
                <div className="tab-input-date__head">
                  <span
                    className={`input-date__title ${
                      activeDateTab === "day" ? "active" : ""
                    }`}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        days: [],
                        repeat_start: "",
                        repeat_end: "",
                      }));
                      setActiveDateTab("day");
                    }}
                  >
                    Выбрать дни
                  </span>
                  <span
                    className={`input-date__title ${
                      activeDateTab === "week" ? "active" : ""
                    }`}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        date: [],
                      }));
                      setActiveDateTab("week");
                    }}
                  >
                    Каждую неделю
                  </span>
                </div>

                <div className="tab-input-date__body">
                  {activeDateTab === "day" && (
                    <DatePickerStart
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )}
                  {activeDateTab === "week" && (
                    <>
                      <div className="dayCircle">
                        {days.map((day) => (
                          <span
                            key={day}
                            className={`dayCircle__circle ${
                              formData.days.includes(day) ? "active" : ""
                            }`}
                            onClick={() => toggleDay(day)}
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                      <div className="blockDatePicker">
                        <div className="blockDatePicker__time">
                          <span>Начало повторов:</span>
                          <DatePickerRepeat
                            formData={formData}
                            setFormData={setFormData}
                            mode={"repeat_start"}
                          />
                        </div>
                        <div className="blockDatePicker__time">
                          <span>Конец повторов:</span>
                          <DatePickerRepeat
                            formData={formData}
                            setFormData={setFormData}
                            mode={"repeat_end"}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="input-date">
              <label>Время выполнения:</label>

              <div className="tab-input-date tab-input-date--time">
                <div className="tab-input-date__head">
                  <span
                    className={`input-date__title ${
                      activeTimeTab === "period" ? "active" : ""
                    }`}
                    onClick={() => setActiveTimeTab("period")}
                  >
                    Указать период
                  </span>
                  <span
                    className={`input-date__title ${
                      activeTimeTab === "exact" ? "active" : ""
                    }`}
                    onClick={() => setActiveTimeTab("exact")}
                  >
                    Точное время
                  </span>
                </div>

                <div className="tab-input-date__body">
                  {activeTimeTab === "exact" && (
                    <TimePickerStartEnd
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )}
                  {activeTimeTab === "period" && (
                    <TimePickerStartEnd
                      mode="period"
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="btn-controls btn-controls--right">
            <button
              type="button"
              className="btn btn--transparent"
              onClick={handleClose}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="btn btn--green"
              disabled={btnDisabled}
            >
              {loading
                ? "Сохранение..."
                : mode === "edit"
                ? "Сохранить изменения"
                : "Применить"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PlannerPopup;
