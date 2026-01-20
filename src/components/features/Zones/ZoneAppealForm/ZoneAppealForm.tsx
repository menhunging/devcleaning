import React, { useState } from "react";
import logo from "@/assets/img/logo-black.png";

import "./ZoneAppealForm.scss";

interface ZoneAppealFormProps {
  onSubmit?: (data: {
    message: string;
    name: string;
    files?: FileList;
  }) => void;
  onSuccess: () => void;
  onCancel?: () => void;
}

const ZoneAppealForm: React.FC<ZoneAppealFormProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Пока выводим в консоль
    console.log("Appeal data:", { message, name, files });

    if (onSubmit) {
      onSubmit({ message, name, files: files || undefined });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  return (
    <div className="zoneAppealForm">
      <div className="zoneAppealForm__container">
        <div className="zonePage__logo">
          <img src={logo} alt="Logo" />
        </div>
        <h2 className="zoneAppealForm__title">Направить обращение</h2>

        <form className="zoneAppealForm__form" onSubmit={handleSubmit}>
          <div className="zoneAppealForm__message">
            <textarea
              className="zoneAppealForm__textarea"
              placeholder="Сообщение"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <h3 className="zoneAppealForm__contacts-title">Ваши контакты</h3>

          <div className="zoneAppealForm__contacts">
            <input
              type="text"
              className="zoneAppealForm__input"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="zoneAppealForm__files">
            <input
              type="file"
              id="file-input"
              className="zoneAppealForm__file-input"
              accept="image/*,video/*"
              multiple
              capture="environment"
              onChange={handleFileChange}
            />
            <label htmlFor="file-input" className="zoneAppealForm__file-label">
              📎 Прикрепить фото/видео
            </label>

            {files && files.length > 0 && (
              <div className="zoneAppealForm__file-preview">
                <p className="zoneAppealForm__file-count">
                  Выбрано файлов: {files.length}
                </p>
                <div className="zoneAppealForm__file-list">
                  {Array.from(files).map((file, index) => (
                    <div key={index} className="zoneAppealForm__file-item">
                      <span className="zoneAppealForm__file-name">
                        {file.name}
                      </span>
                      <span className="zoneAppealForm__file-size">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn--green zoneAppealForm__submit"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default ZoneAppealForm;
