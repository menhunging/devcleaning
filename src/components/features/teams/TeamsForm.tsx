import { useState } from "react";

import type { ObjectItem } from "@/types/objects/objects";
import type { MultiValue, SingleValue } from "react-select";
import type { Option } from "@/types/ui/select/select";
import type { TeamsFormData } from "@/types/teams/teams";

import { getOptionForObjects } from "@/utils/getOptionForObjects";

import { mergedUsers } from "@/utils/mergedUsers";

import SelectUI from "@/components/shared/ui/Select/SelectUI/SelectUI";
import SelectUIMulti from "@/components/shared/ui/Select/SelectUIMulti/SelectUIMulti";

import "./TeamsForm.scss";

interface TeamsFormProps {
  mode?: "add" | "edit";
  initialData?: TeamsFormData | null;
  objects?: ObjectItem[];
  users?:
    | {
        id: string | number;
        id_object: string | number;
        login: string;
        name: string;
        role: number;
        surname: string;
      }[]
    | undefined;
  loading?: boolean;
  onSuccess: (object: TeamsFormData) => void;
  onClose: () => void;
}

const TeamsForm: React.FC<TeamsFormProps> = ({
  mode = "add",
  initialData,
  objects,
  users,
  loading,
  onSuccess,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    id: initialData?.id || undefined,
    name: initialData?.name || "",
    description: initialData?.description || "",
    id_object: initialData?.id_object || "",
    id_user: initialData?.id_user || "",
    users: initialData?.users || [], // тут id_user
  });

  const optionsUsers: Option[] = (users || [])
    .filter(
      (user) =>
        user.role === 3 &&
        (!formData.id_object || user.id_object === Number(formData.id_object))
    )
    .map((user) => ({
      value: String(user.id),
      label: `${user.name} ${user.surname}`,
    }));

  const optionsObjects = getOptionForObjects(objects) || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selected: MultiValue<Option> | null) => {
    if (!selected?.length) {
      setFormData((prev) => ({ ...prev, users: [], id_user: "" }));
      return;
    }

    const newUsers = selected.map((opt) => ({
      id_user: Number(opt.value),
      name: opt.label,
    }));

    // строка id юзеров через запятую, так нужно на бэк отправить
    const newUsersIDs = newUsers.map((u) => u.id_user).join(",");

    // объединяем с полными данными из users
    const merged = mergedUsers(newUsers, users);

    setFormData((prev) => ({
      ...prev,
      id_user: newUsersIDs,
      users: merged,
    }));
  };

  const handleSelectSingleChange = (selected: SingleValue<Option>) => {
    setFormData((prev) => ({
      ...prev,
      id_object: selected ? selected.value : "",
      users: [],
      id_user: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(formData);
  };

  let btnDisabled = loading || !formData.name;

  return (
    <div className="users-popup">
      <span className="users-popup__title">
        {mode === "edit" ? "Редактирование команды" : "Новая команда"}
      </span>

      <form className="users-popup__form" onSubmit={handleSubmit}>
        <div className="input-item">
          <label htmlFor="name">Название</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="input-item">
          <label htmlFor="name">Описание</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="input-item">
          <div className="selectWrap">
            <label htmlFor="address">Объект</label>
            <div className="selectWrap__wrap">
              <SelectUI
                options={optionsObjects}
                value={optionsObjects.find(
                  (opt) => opt.value === String(formData.id_object)
                )}
                onChange={(event) => {
                  handleSelectSingleChange(event);
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
            <label htmlFor="address">Сотрудники</label>
            <div className="selectWrap__wrap">
              <SelectUIMulti
                options={optionsUsers}
                notOptionsPlaceholder="В выбранном вами обьекте нет сотрудников"
                value={formData.users.map((user) => ({
                  value: String(user.id_user),
                  label: `${user.name} ${user.surname}`,
                }))}
                onChange={handleSelectChange}
              />
            </div>
          </div>
        </div>

        <div className="btn-controls btn-controls--right">
          <button
            type="button"
            className="btn btn--transparent"
            onClick={onClose}
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
              ? "Применить"
              : "Применить"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamsForm;
