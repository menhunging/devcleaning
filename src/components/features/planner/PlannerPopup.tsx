import { useEffect, useState } from "react";

import type { Option } from "@/types/ui/select/select";
import type { SingleValue } from "react-select";
import type { Planner } from "@/types/planner/planner";

import { useAppDispatch } from "@/store/store";
import { getObjectById } from "@/store/slices/objectSlice";

import Modal from "@/components/shared/ui/Modal/Modal";
import SelectUI from "@/components/shared/ui/Select/SelectUI/SelectUI";
import { usePlannerOptions } from "@/hook/usePlannerOptions/usePlannerOptions";

import { ru } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./PlannerPopup.scss";

interface PlannerPopupProps {
  mode?: "add" | "edit";
  initialData?: Planner | null;
  isOpen: boolean;
  handleModalClose: () => void;
  onSubmit: (props: Planner) => void;
}

const PlannerPopup: React.FC<PlannerPopupProps> = ({
  mode,
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

    status: initialData?.status || null,
    name_status: initialData?.name_status || "",

    id_team: initialData?.id_team || "",
    name_team: initialData?.name_team || "",

    data_create: initialData?.data_create || "",

    date_start: initialData?.date_start || "",
    time_start: initialData?.time_start || "",
    data_end: initialData?.data_end || "",
    time_end: initialData?.time_end || "",
  });

  const [formData, setFormData] = useState(initFormData(initialData));

  const [activeTab, setActiveTab] = useState<"user" | "team">(
    formData.name_team ? "team" : "user"
  ); // табы для сотрудников и команды

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
      name_zone: "",
    }));

    const result = await dispatch(getObjectById(String(selected?.value)));

    if (getObjectById.fulfilled.match(result)) {
      setFormData((prev) => ({
        ...prev,
        id_object: selected ? selected.value : "",
        name_object: selected ? selected.label : "",
        name_zone: "",
      }));
    }
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

  const handeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const btnDisabled =
    !formData.name ||
    !formData.id_object ||
    !formData.id_zone ||
    !(formData.id_team || formData.id_user) ||
    !formData.description;

  useEffect(() => {
    setFormData(initFormData(initialData));
  }, [initialData]);

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <div className="popup-planer">
        <div className="popup-planer__head">
          {mode === "edit" ? formData.name : "Новое задание"}
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
                    // value={
                    //   getOptionForObjects(objects)?.find(
                    //     (opt) =>
                    //       Number(opt.value) === Number(formData.id_object)
                    //   ) || null
                    // }
                    onChange={(event) => {
                      handleObjectSelect(event);
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className={
                formData.name_object
                  ? "input-item"
                  : "input-item input-item--disabled"
              }
            >
              <div className="selectWrap">
                <label htmlFor="address">Зона</label>
                <div className="selectWrap__wrap">
                  <SelectUI
                    options={optionsZones}
                    // value={
                    //   optionsZones?.find(
                    //     (opt) =>
                    //       Number(opt.value) === Number(formData.name_zone)
                    //   ) || null
                    // }
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
                      formData.name_zone
                        ? "input-item"
                        : "input-item input-item--disabled"
                    }
                  >
                    <div className="selectWrap">
                      <label htmlFor="address">Сотрудники</label>
                      <div className="selectWrap__wrap">
                        <SelectUI
                          options={optionsUsers}
                          // value={
                          //   formData.users?.map((user) => ({
                          //     value: String(user.id_user),
                          //     label: `${user.name}`,
                          //   })) || []
                          // }
                          onChange={handleUsersSelect}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "team" && (
                  <div
                    className={
                      formData.name_zone
                        ? "input-item"
                        : "input-item input-item--disabled"
                    }
                  >
                    <div className="selectWrap">
                      <label htmlFor="address">Команда</label>
                      <div className="selectWrap__wrap">
                        <SelectUI
                          options={optionsTeams}
                          // value={
                          //   formData.team
                          //     ? {
                          //         value: String(formData.team.id),
                          //         label: formData.team.name,
                          //       }
                          //     : null
                          // }
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

          <div className="popup-planer__col">
            <div className="input-date">
              <label htmlFor="date_start">Дата выполнения:</label>
              <div className="blockDatePicker">
                <DatePicker
                  className="datepicker-input"
                  selected={
                    formData.date_start ? new Date(formData.date_start) : null
                  }
                  onChange={(date: Date | null) =>
                    setFormData((prev) => ({
                      ...prev,
                      date_start: date ? date.toISOString().split("T")[0] : "",
                    }))
                  }
                  dateFormat="dd.MM.yyyy"
                  placeholderText="Выбрать дни"
                  locale={ru}
                />
              </div>
            </div>

            <div className="input-date">
              <label htmlFor="date_start">Время выполнения:</label>
              <div className="blockDatePicker">
                <DatePicker
                  id="time_start"
                  className="datepicker-input"
                  selected={
                    formData.time_start
                      ? new Date(`1970-01-01T${formData.time_start}:00`)
                      : null
                  }
                  onChange={(date: Date | null) => {
                    if (date) {
                      const formatted = date.toLocaleTimeString("ru-RU", {
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      setFormData((prev) => ({
                        ...prev,
                        time_start: formatted, // делаем вот такой форма 00:00
                      }));
                    }
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeFormat="HH:mm"
                  timeIntervals={5}
                  dateFormat="HH:mm"
                  locale={ru}
                  placeholderText="Выберите время"
                />
              </div>
            </div>
          </div>
          <div className="btn-controls btn-controls--right">
            <button
              type="button"
              className="btn btn--transparent"
              onClick={handleModalClose}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="btn btn--green"
              disabled={btnDisabled}
            >
              Применить
              {/* {loading
                  ? "Сохранение..."
                  : mode === "edit"
                  ? "Применить"
                  : "Применить"} */}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PlannerPopup;
