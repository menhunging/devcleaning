import { useState, useEffect } from "react";

import type { SingleValue } from "react-select";
import type { Option } from "@/types/ui/select/select";
import type { Users } from "@/types/users/users";

import SelectUI from "@/components/shared/ui/Select/SelectUI/SelectUI";

import "./ZonesForm.scss";

interface ZonesForm {
  mode?: "add" | "edit";
  id_object: string;
  initialData?: {
    id: string;
    id_zone: string;
    id_object: string;
    name_zone: string;
    user_id_zone: string;
    qr_zone: string;
  } | null;
  loading?: boolean;
  users: Users[];
  onSuccess: (object: {
    id: string;
    id_zone: string;
    id_object: string;
    user_id_zone: string;
    name_zone: string;
    name: string;
    qr_zone: string;
    qr: string;
  }) => void;
  onClose: () => void;
}

const ZonesForm: React.FC<ZonesForm> = ({
  mode = "add",
  id_object,
  initialData,
  users,
  loading,
  onSuccess,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    id: initialData?.id_zone || "",
    id_zone: initialData?.id_zone || "",
    id_object: initialData?.id_object || id_object,
    user_id_zone: initialData?.user_id_zone || "",
    name_zone: initialData?.name_zone || "",
    name: initialData?.name_zone || "",
    qr_zone: initialData?.name_zone || "",
    qr: initialData?.qr_zone || "",
  });

  const options: Option[] = (users || [])
    .filter((user) => user.role === 2) // оставляем только с ролью 2
    .map((user) => ({
      value: String(user.id),
      label: user.name,
    }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selected: SingleValue<Option>) => {
    setFormData((prev) => ({
      ...prev,
      user_id_zone: selected ? selected.value : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    onSuccess(formData);
  };

  const btnDisabled = loading || !formData.name;

  useEffect(() => {
    setFormData({
      id: initialData?.id_zone || "",
      id_zone: initialData?.id_zone || "",
      id_object: initialData?.id_object || id_object,
      user_id_zone: initialData?.user_id_zone || "",
      name_zone: initialData?.name_zone || "",
      name: initialData?.name_zone || "",
      qr_zone: initialData?.name_zone || "",
      qr: initialData?.qr_zone || "",
    });
  }, [initialData, id_object]);

  return (
    <div className="zones-popup">
      <span className="zones-popup__title">
        {mode === "edit" ? "Редактирование зоны" : "Новая зона"}
      </span>

      <form className="zones-popup__form" onSubmit={handleSubmit}>
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
          <div className="selectWrap">
            <label htmlFor="address">Ответственный</label>
            <div className="selectWrap__wrap">
              <SelectUI options={options} onChange={handleSelectChange} />
            </div>
          </div>
        </div>

        <div className="input-item">
          <span className="label">Идентификация:</span>

          <div className="checkList">
            <div className="checkItem">
              <input type="radio" id="rad1" defaultChecked />
              <label htmlFor="rad1">QR код</label>
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

export default ZonesForm;
