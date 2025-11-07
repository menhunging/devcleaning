import type { objectRemove } from "@/types/objects/objectsForm";

import "./ObjectRemove.scss";

const ObjectRemove: React.FC<objectRemove> = ({
  loading,
  onSuccess,
  onClose,
}) => {
  return (
    <div className="popup-delete">
      <span className="popup-delete__title">Удалить</span>

      <div className="popup-delete__content">
        <p>Вы уверены что хотите удалить?</p>
      </div>

      <div className="btn-controls btn-controls--center">
        <button className="btn btn--transparent" onClick={onClose}>
          Отмена
        </button>
        <button className="btn btn--green" onClick={onSuccess}>
          {loading ? "Удаление..." : "Да"}
        </button>
      </div>
    </div>
  );
};

export default ObjectRemove;
