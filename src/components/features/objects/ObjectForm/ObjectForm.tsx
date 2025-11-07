import { useState } from "react";

import type { ObjectFormProps } from "@/types/objects/objectsForm";

import "./ObjectForm.scss";

// import api from "@/api/api";

const ObjectForm: React.FC<ObjectFormProps> = ({
  mode = "add",
  initialData,
  loading,
  onSuccess,
  onClose,
}) => {
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

  // const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   TODO сделать loading foto. Кнопку disabled пока фото грузиться. Думаю надо просто через useState
  //   и btnDisabled добавить его просто и все

  //   const formDataUpload = new FormData();
  //   formDataUpload.append("file", file);

  //   try {
  //     const response = await api.post("/addfoto", formDataUpload, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     const photoUrl = response.data.url;
  //     setFormData((prev) => ({ ...prev, photo: photoUrl }));
  //   } catch (error) {
  //     console.error("Ошибка загрузки фото", error);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(formData);
  };

  const { name, address, contacts } = formData;
  const btnDisabled = loading || !name || !address || !contacts;

  return (
    <div className="popup-add-object">
      <span className="popup-add-object__title">
        {mode === "edit" ? "Редактировать объект" : "Новый объект"}
      </span>

      <form className="popup-add-object__form" onSubmit={handleSubmit}>
        <div className="popup-add-object__col">
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
            <label htmlFor="address">Адрес</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="input-item">
            <label htmlFor="contacts">Контакты</label>
            <input
              type="text"
              id="contacts"
              name="contacts"
              value={formData.contacts}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="popup-add-object__col">
          <div className="input-item">
            <label>Фото (URL)</label>

            <input
              type="text"
              id="photo"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
            />

            {/* <input
              type="file"
              id="photoUpload"
              accept="image/*"
              onChange={handleFileUpload}
            /> */}
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

export default ObjectForm;
