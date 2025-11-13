import { useState } from "react";

import type { ObjectItem } from "@/types/objects/objects";
import type { MultiValue, SingleValue } from "react-select";
import type { Option, OptionRole } from "@/types/ui/select/select";
import type { UserFormData } from "@/types/users/users";

import { getOptionForObjects } from "@/utils/getOptionForObjects";

import SelectUI from "@/components/shared/ui/Select/SelectUI/SelectUI";
import SelectUIMulti from "@/components/shared/ui/Select/SelectUIMulti/SelectUIMulti";

import "./UsersForm.scss";

interface UsersFormProps {
  mode?: "add" | "edit";
  initialData?: UserFormData | null;
  loading?: boolean;
  objects?: ObjectItem[];
  onSuccess: (object: UserFormData) => void;
  onClose: () => void;
}

const UsersForm: React.FC<UsersFormProps> = ({
  mode = "add",
  initialData,
  loading,
  objects,
  onSuccess,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    id: initialData?.id || undefined,
    email: initialData?.email || "",
    login: initialData?.login || "",
    password: initialData?.password || "",
    role: initialData?.role || undefined,
    name: initialData?.name || "",
    surname: initialData?.surname || "",
    phone: initialData?.phone || "",
    object: initialData?.object || [],
    teams: initialData?.teams || [],
  });

  const optionsRole: OptionRole[] = [
    { value: 2, label: "Менеджер" },
    { value: 3, label: "Сотрудник" },
  ];

  const options: Option[] = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanilla1", label: "Vanilla1" },
    { value: "vanilla2", label: "Vanilla2" },
    { value: "vanilla3", label: "Vanilla3" },
    { value: "vanilla4", label: "Vanilla4" },
    { value: "vanilla5", label: "Vanilla5" },
    { value: "vanilla6", label: "Vanilla6" },
    { value: "vanilla7", label: "Vanilla7" },
    { value: "vanilla8", label: "Vanilla8" },
    { value: "vanilla9", label: "Vanilla9" },
    { value: "vanilla10", label: "Vanilla10" },
    { value: "Иванов Иван", label: "Иванов Иван" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanilla", label: "Vanilla" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (
    filed: "object" | "teams" | "role",
    selected: MultiValue<Option>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [filed]: selected
        ? selected.map((opt) => ({ id: opt.value, name: opt.label }))
        : [],
      // [filed]: selected ? selected.map((opt) => opt.value).join(",") : "",
    }));
  };

  const handleSelectSingleChange = (
    field: "object" | "teams" | "role",
    selected: SingleValue<Option>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selected ? selected.value : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    onSuccess(formData);
  };

  let btnDisabled =
    loading ||
    !formData.name ||
    !formData.surname ||
    !formData.email ||
    !formData.login ||
    !formData.role;

  if (mode === "add") {
    btnDisabled = btnDisabled || !formData.password;
  }

  return (
    <div className="users-popup">
      <span className="users-popup__title">
        {mode === "edit" ? "Редактирование сотрудника" : "Новый сотрудник"}
      </span>

      <form className="users-popup__form" onSubmit={handleSubmit}>
        <div className="input-item">
          <label htmlFor="name">Имя</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="input-item">
          <label htmlFor="name">Фамилия</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
          />
        </div>

        <div className="input-item">
          <label htmlFor="name">Почта</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-item">
          <label htmlFor="name">Логин</label>
          <input
            type="text"
            id="login"
            name="login"
            value={formData.login}
            onChange={handleChange}
          />
        </div>

        <div className="input-item">
          <label htmlFor="name">Пароль</label>
          <input
            type="text"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="input-item">
          <div className="selectWrap">
            <label htmlFor="address">Объект</label>
            <div className="selectWrap__wrap">
              <SelectUIMulti
                options={getOptionForObjects(objects) || []}
                onChange={(event) => {
                  handleSelectChange("object", event);
                }}
              />
            </div>
          </div>
        </div>

        <div className="input-item">
          <div className="selectWrap">
            <label htmlFor="address">Роль</label>
            <div className="selectWrap__wrap">
              <SelectUI
                options={optionsRole}
                value={
                  optionsRole.find((opt) => opt.value === formData.role) ||
                  undefined
                }
                placeholder={"Выбрать"}
                onChange={(event) => {
                  handleSelectSingleChange("role", event);
                }}
              />
            </div>
          </div>
        </div>

        <div className="input-item">
          <div className="selectWrap">
            <label htmlFor="address">Команды</label>
            <div className="selectWrap__wrap">
              <SelectUIMulti
                options={options}
                onChange={(event) => {
                  handleSelectChange("teams", event);
                }}
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

export default UsersForm;
