import { useState } from "react";

import type { ObjectItem } from "@/types/objects/objects";
import type { SingleValue, MultiValue } from "react-select";
import type { Option, OptionRole } from "@/types/ui/select/select";
import type { UserFormData } from "@/types/users/users";
import type { Teams } from "@/types/teams/teams";

import { getOptionForObjects } from "@/utils/getOptionForObjects";

import SelectUI from "@/components/shared/ui/Select/SelectUI/SelectUI";
// import SelectUIMulti from "@/components/shared/ui/Select/SelectUIMulti/SelectUIMulti";

import "./UsersForm.scss";
import SelectUIMulti from "@/components/shared/ui/Select/SelectUIMulti/SelectUIMulti";

interface UsersFormProps {
  mode?: "add" | "edit";
  initialData?: UserFormData | null;
  loading?: boolean;
  objects?: ObjectItem[];
  teams?: Teams[];
  onSuccess: (object: UserFormData) => void;
  onClose: () => void;
}

const UsersForm: React.FC<UsersFormProps> = ({
  mode = "add",
  initialData,
  loading,
  objects,
  // teams,
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
    id_object: initialData?.id_object || [],
    teams: initialData?.teams || [],
  });

  const optionsRole: OptionRole[] = [
    { value: 2, label: "Менеджер" },
    { value: 3, label: "Сотрудник" },
  ];

  const optionsObjects = getOptionForObjects(objects) || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectRoleChange = (selected: SingleValue<Option>) => {
    // change for Roles
    setFormData((prev) => ({
      ...prev,
      role: selected ? Number(selected.value) : undefined,
    }));
  };

  const handleSelectObjManagerChange = (selected: MultiValue<Option>) => {
    // change for Objects MANAGER

    setFormData((prev) => ({
      ...prev,
      id_object: selected.map((opt) => opt.value).join(","),
    }));
  };

  const handleSelectObjUserChange = (selected: SingleValue<Option>) => {
    // change for Objects USERS

    setFormData((prev) => ({
      ...prev,
      id_object: selected ? Number(selected.value) : [],
    }));
  };

  // const handleSelectTeamsChange = (selected: MultiValue<Option>) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     teams: selected
  //       ? selected.map((opt) => ({ id: opt.value, name: opt.label }))
  //       : [],
  //     // [filed]: selected ? selected.map((opt) => opt.value).join(",") : "",
  //   }));
  // };

  // const handleSelectSingleChange = (
  //   field: "object" | "teams" | "role",
  //   selected: SingleValue<Option>
  // ) => {
  //   console.log("handleSelectSingleChange", selected);

  //   setFormData((prev) => ({
  //     ...prev,
  //     [field]: selected
  //       ? { id: Number(selected.value), name: selected.label }
  //       : "",
  //   }));
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit formData -- ", formData);
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
                  handleSelectRoleChange(event);
                }}
              />
            </div>
          </div>
        </div>

        <div className="input-item">
          <div className="selectWrap">
            <label htmlFor="address">Объект</label>

            {formData.role === 2 ? (
              <div className="selectWrap__wrap">
                <SelectUIMulti
                  options={optionsObjects}
                  // value={optionsObjects.find(
                  //   (opt) => opt.value === String(formData.id_object)
                  // )}
                  // value={optionsObjects.map((opt) => ({
                  //   value: String(opt.value),
                  //   label: String(opt.label),
                  // }))}
                  onChange={(event) => {
                    handleSelectObjManagerChange(event);
                  }}
                />
              </div>
            ) : (
              <div className="selectWrap__wrap">
                <SelectUI
                  options={optionsObjects}
                  value={optionsObjects.find(
                    (opt) => opt.value === String(formData.id_object)
                  )}
                  onChange={(event) => {
                    handleSelectObjUserChange(event);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* <div className="input-item">
          <div className="selectWrap">
            <label htmlFor="address">Команды</label>
            <div className="selectWrap__wrap">
              <SelectUIMulti
                options={getOptionForTeams(teams)}
                onChange={(event) => {
                  handleSelectTeamsChange(event);
                }}
              />
            </div>
          </div>
        </div> */}

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
