import { useState } from "react";
import { useAppDispatch } from "@/store/store";
import { addObject } from "@/store/slices/objectsSlice";

import "./ObjectAdd.scss";
import { updateObject } from "@/store/slices/objectSlice";

interface ObjectAddProps {
  mode?: "add" | "edit";
  initialData?: {
    id: string;
    name: string;
    address: string;
    contacts: string;
    photo: string;
  };
  loading?: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

const ObjectAdd: React.FC<ObjectAddProps> = ({
  mode = "add",
  initialData,
  loading,
  onSuccess,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    name: initialData?.name || "",
    address: initialData?.address || "",
    contacts: initialData?.contacts || "",
    photo: initialData?.photo || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "edit") {
      const result = await dispatch(updateObject(formData));
      if (updateObject.fulfilled.match(result)) {
        onSuccess();
      } else {
        console.log(result.payload);
      }
    }

    if (mode === "add") {
      const result = await dispatch(addObject(formData));
      if (addObject.fulfilled.match(result)) {
        onSuccess();
      } else {
        console.log(result.payload);
      }
    }
  };

  const { name, address, contacts, photo } = formData;
  const btnDisabled = loading || !name || !address || !contacts || !photo;

  return (
    <div className="popup-add-object">
      <span className="popup-add-object__title">
        {mode === "edit" ? "Редактировать объект" : "Новый объект"}
      </span>

      <form className="popup-add-object__form" onSubmit={handleSubmit}>
        <div className="popup-add-object__col">
          {["name", "address", "contacts"].map((field) => (
            <div className="input-item" key={field}>
              <label>
                {
                  {
                    name: "Название",
                    address: "Адрес",
                    contacts: "Контакты",
                  }[field]
                }
              </label>
              <input
                type="text"
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        <div className="popup-add-object__col">
          <div className="input-item">
            <label>Фото (URL)</label>
            <input
              type="text"
              name="photo"
              value={photo}
              onChange={handleChange}
            />
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
              ? "Сохранить"
              : "Добавить"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ObjectAdd;
