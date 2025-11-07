import { deleteObject } from "@/store/slices/objectsSlice";
import { useAppDispatch } from "@/store/store";

import "./ObjectRemove.scss";

interface objectRemove {
  id: string;
  loading: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

const ObjectRemove: React.FC<objectRemove> = ({
  id,
  loading,
  onSuccess,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    const result = await dispatch(deleteObject(id));
    if (deleteObject.fulfilled.match(result)) {
      onSuccess();
    } else {
      console.log(result.payload);
    }
  };

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
        <button className="btn btn--green" onClick={handleDelete}>
          {loading ? "Удаление..." : "Да"}
        </button>
      </div>
    </div>
  );
};

export default ObjectRemove;
