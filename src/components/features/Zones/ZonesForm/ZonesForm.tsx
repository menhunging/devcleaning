import { useState, useEffect } from "react";

import type { MultiValue } from "react-select";
import type { Option } from "@/types/ui/select/select";

import SelectUIMulti from "@/components/shared/ui/Select/SelectUIMulti/SelectUIMulti";

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

  const handleSelectChange = (selected: MultiValue<Option>) => {
    setFormData((prev) => ({
      ...prev,
      user_id_zone: selected ? selected.map((opt) => opt.value).join(",") : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
              <SelectUIMulti options={options} onChange={handleSelectChange} />
            </div>
          </div>

          {/* <input
            type="text"
            id="user_id_zone"
            name="user_id_zone"
            value={formData.user_id_zone}
            onChange={handleChange}
          /> */}
        </div>

        <div className="input-item">
          <span className="label">Идентификация:</span>

          <div className="checkList">
            <div className="checkItem">
              <input type="radio" id="rad1" checked />
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
