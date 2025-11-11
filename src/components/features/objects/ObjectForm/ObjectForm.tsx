import { useState } from "react";

import type { ObjectFormProps } from "@/types/objects/objectsForm";
import { getFullPhotoUrl } from "@/utils/getFullPhotoUrl";

import "./ObjectForm.scss";

import { useFileUpload } from "@/hook/useFileUpload";

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

  const { uploadFiles, fileLoad } = useFileUpload();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = await uploadFiles(e.target.files);
    if (result.success) {
      setFormData((prev) => ({ ...prev, photo: result.message.DATA[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(formData);
  };

  const { name, address, contacts } = formData;
  const btnDisabled = loading || !name || !address || !contacts || fileLoad;

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

        <div className="popup-add-object__col popup-add-object__col--media">
          <div className="input-item">
            <input
              type="file"
              id="photoUpload"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileUpload}
            />

            {formData.photo ? (
              <>
                <div className="foto-preview">
                  <img src={getFullPhotoUrl(formData.photo)} alt="" />
                </div>
                <label htmlFor="photoUpload">
                  {fileLoad ? "Загрузка..." : "✎ Изменить фото"}
                </label>
              </>
            ) : (
              <label htmlFor="photoUpload">
                {fileLoad ? "Загрузка..." : "+ Добавить фото"}
              </label>
            )}
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
