import { useState, useEffect, useMemo } from "react";

import type { SingleValue } from "react-select";
import type { Option } from "@/types/ui/select/select";
import type { ZonesFormProps } from "@/types/zones/zones";

import SelectUI from "@/components/shared/ui/Select/SelectUI/SelectUI";

import "./ZonesForm.scss";

const ZonesForm: React.FC<ZonesFormProps> = ({
  mode = "add",
  id_object,
  initialData,
  users,
  loading,
  onSuccess,
  onClose,
}) => {
  const initFormData = (
    initialData?: ZonesFormProps["initialData"],
    id_object?: string
  ) => ({
    id_zone: initialData?.id_zone || "",
    id_object: initialData?.id_object || id_object || "",
    user_id_zone: initialData?.user_id_zone || "",
    name_zone: initialData?.name_zone || "",
    qr: initialData?.qr || "",
  });

  const [formData, setFormData] = useState(
    initFormData(initialData, id_object)
  );

  const options = useMemo<Option[]>(
    () =>
      (users || [])
        .filter((user) => user.role === 3) // только с role 3
        .map((user) => ({
          value: String(user.id),
          label: `${user.name} ${user.surname}`,
        })),
    [users]
  );

  const optionDefaultValue = useMemo<Option | null>(
    () =>
      options.find(
        (option) => option.value === String(formData.user_id_zone)
      ) || null,
    [options, formData.user_id_zone]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selected: SingleValue<Option>) => {
    setFormData((prev) => ({
      ...prev,
      user_id_zone: selected ? String(selected.value) : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(formData);
  };

  const btnDisabled = loading || !formData.name_zone;

  useEffect(() => {
    setFormData(initFormData(initialData, id_object));
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
            id="name_zone"
            name="name_zone"
            value={formData.name_zone}
            onChange={handleChange}
          />
        </div>

        <div className="input-item">
          <div className="selectWrap">
            <label htmlFor="address">Ответственный</label>
            <div className="selectWrap__wrap">
              <SelectUI
                options={options}
                value={optionDefaultValue}
                notOptionsPlaceholder="Нет сотрудников"
                onChange={handleSelectChange}
              />
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
