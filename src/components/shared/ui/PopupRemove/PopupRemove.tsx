import type { objectRemove } from "@/types/objects/objectsForm";

import "./PopupRemove.scss";

const PopupRemove: React.FC<objectRemove> = ({
  loading,
  mode = "delete",
  onSuccess,
  onClose,
}) => {
  const titles: Record<string, string> = {
    deactivate: "Деактивация",
    activeted: "Активация",
    delete: "Удалить",
  };

  const messages: Record<string, string> = {
    deactivate: "Вы уверены что хотите деактивировать сотрудника?",
    activeted: "Вы уверены что хотите активировать сотрудника?",
    delete: "Вы уверены что хотите удалить?",
  };

  return (
    <div className="popup-delete">
      <span className="popup-delete__title">{titles[mode]}</span>

      <div className="popup-delete__content">{messages[mode]}</div>

      <div className="btn-controls btn-controls--center">
        <button className="btn btn--transparent" onClick={onClose}>
          Отмена
        </button>
        <button className="btn btn--green" onClick={onSuccess}>
          {loading ? "Обработка..." : "Да"}
        </button>
      </div>
    </div>
  );
};

export default PopupRemove;
