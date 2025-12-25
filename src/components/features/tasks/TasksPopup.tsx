import { useEffect, useState } from "react";

import type { Option } from "@/types/ui/select/select";
import type { SingleValue } from "react-select";
import type { ITask } from "@/types/tasks/tasks";

import { useAppDispatch } from "@/store/store";
import { getObjectById } from "@/store/slices/objectSlice";

import Modal from "@/components/shared/ui/Modal/Modal";
import SelectUI from "@/components/shared/ui/Select/SelectUI/SelectUI";
import { usePlannerOptions } from "@/hook/usePlannerOptions/usePlannerOptions";

import DatePickerStartForTasks from "@/components/shared/ui/DatePicker/DatePickerStartForTasks/DatePickerStartForTasks";
import TimePickerStartEndTasks from "@/components/shared/ui/DatePicker/TimePickerStartEndTasks/TimePickerStartEndTasks";

import "./TasksPopup.scss";

interface TasksPopupProps {
  mode?: "add" | "edit";
  loading: boolean;
  initialData?: ITask | null;
  isOpen: boolean;
  handleModalClose: () => void;
  onSubmit: (props: ITask) => void;
}

const TasksPopup: React.FC<TasksPopupProps> = ({
  mode,
  loading,
  initialData,
  isOpen,
  handleModalClose,
  onSubmit,
}) => {
  const initFormData = (initialData?: ITask | null) => ({
    id: initialData?.id || "",
    name: initialData?.name || "",
    description: initialData?.description || "",

    id_object: initialData?.id_object || 0,
    name_object: initialData?.name_object || "",

    id_zone: initialData?.id_zone || 0,
    name_zone: initialData?.name_zone || "",

    id_user: initialData?.id_user || 0,
    name_user: initialData?.name_user || "",
    surname_user: initialData?.surname_user || "",

    id_team: initialData?.id_team || 0,
    name_team: initialData?.name_team || "",

    date_start: initialData?.date_start || "",
    time_start: initialData?.time_start || "",
    time_end: initialData?.time_end || "",
    duration: initialData?.duration || null,

    status: initialData?.status || 0,
    binding_planner: initialData?.binding_planner || null,
    data_create: initialData?.data_create || "",
    data_end: initialData?.data_end || "",
    day: initialData?.day || null,
    period: initialData?.period || null,
    why_name: initialData?.why_name || null,
    why_pause: initialData?.why_pause || null,
    why_description: initialData?.why_description || null,
    why_pause_photo: initialData?.why_pause_photo || null,
    time_current: initialData?.time_current || null,
  });

  const [formData, setFormData] = useState(initFormData(initialData));

  const [activeTab, setActiveTab] = useState<"user" | "team">(
    formData.id_team ? "team" : "user"
  );

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
      id_zone: 0,
      id_user: 0,
      id_team: 0,
      name_zone: "",
    }));

    setFormData((prev) => ({
      ...prev,
      id_object: selected ? Number(selected.value) : 0,
      name_object: selected ? selected.label : "",
      name_zone: "",
    }));
  };

  const handleZoneSelect = async (selected: SingleValue<Option>) => {
    setFormData((prev) => ({
      ...prev,
      id_zone: selected ? Number(selected.value) : 0,
      name_zone: selected ? selected.label : "",
    }));
  };

  const handleUsersSelect = async (selected: SingleValue<Option>) => {
    setFormData((prev) => ({
      ...prev,
      id_user: selected ? Number(selected.value) : 0,
      name_user: selected ? selected.label : "",
      id_team: 0,
      name_team: "",
    }));
  };

  const handleTeamSelect = async (selected: SingleValue<Option>) => {
    setFormData((prev) => ({
      ...prev,
      id_team: selected ? Number(selected.value) : 0,
      name_team: selected ? selected.label : "",
      id_user: 0,
      name_user: "",
    }));
  };

  const handleClose = () => {
    handleModalClose();
  };

  const handeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const btnDisabled =
    loading ||
    !formData.name ||
    !formData.id_object ||
    !formData.id_zone ||
    !(formData.id_team || formData.id_user) ||
    !formData.description ||
    !formData.date_start ||
    !formData.time_start ||
    !formData.time_end;

  useEffect(() => {
    setFormData(initFormData(initialData));
  }, [initialData]);

  useEffect(() => {
    if (formData.id_object) {
      dispatch(getObjectById(String(formData.id_object)));
    }
  }, [formData.id_object, dispatch]);

  useEffect(() => {
    setActiveTab(formData.id_team ? "team" : "user");
  }, [formData.id_team, dispatch]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="popup-tasks">
        <div className="popup-tasks__head">
          {mode !== "add" ? formData.name : "Новая задача"}
        </div>

        <form className="popup-tasks__form" onSubmit={handeSubmit}>
          <div className="popup-tasks__col">
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
                formData.id_object
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

            <div className="popup-tasks__users">
              <>
                <div className="popup-tasks__users__tabs">
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
                      formData.id_zone
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
                      formData.id_zone
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
              <label htmlFor="description">Описание задачи</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          <div className="popup-tasks__col">
            <div className="input-item input-item--times">
              <label htmlFor="date_start">Дата выполнения</label>
              <div className="popup-tasks__times">
                <DatePickerStartForTasks
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </div>

            <div className="input-date">
              <label>Время выполнения:</label>

              <div className="tab-input-date tab-input-date--time">
                <div className="tab-input-date__body">
                  <TimePickerStartEndTasks
                    formData={formData}
                    setFormData={setFormData}
                  />
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

export default TasksPopup;
