import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useNavigate, useParams } from "react-router-dom";

import { getObjectById } from "@/store/slices/objectSlice";

import ObjectRemove from "@/components/features/objects/ObjectRemove/ObjectRemove";
import Modal from "@/components/shared/ui/Modal/Modal";
import ObjectAdd from "@/components/features/objects/ObjectAdd/ObjectAdd";

// import "./ObjectsPage.scss";

const ObjectPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, data: obj } = useAppSelector((state) => state.object);

  const { id } = useParams<{ id: string }>();

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);

  const handleUpdateSuccess = () => {
    // если редактирование обьекта происходит успешно
    setEditModalOpen(false);
    if (id) {
      dispatch(getObjectById(id));
    }
  };

  const handleRemoveSuccess = () => {
    // если удаление обьекта происходит успешно
    setRemoveModalOpen(false);
    navigate("/");
  };

  useEffect(() => {
    if (id) {
      dispatch(getObjectById(id));
    }
  }, [id, dispatch]);

  if (obj) {
    return (
      <div className="page">
        <div className="page__head">
          <h2 className="caption caption--h2">{obj.name}</h2>
        </div>
        <div className="page__body">id: {obj.id}</div>

        <br />
        <br />

        <button
          className="btn btn--green"
          onClick={() => {
            setEditModalOpen(true);
          }}
        >
          Редактировать обьект
        </button>

        <br />
        <br />

        <button
          className="btn btn--green"
          onClick={() => {
            setRemoveModalOpen(true);
          }}
        >
          Удалить
        </button>

        {/* попап на редактирование обьекта */}

        <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
          <ObjectAdd
            mode="edit"
            initialData={{
              id: obj.id,
              name: obj.name,
              address: obj.adress,
              contacts: obj.contacts,
              photo: obj.photo,
            }}
            loading={loading}
            onSuccess={handleUpdateSuccess}
            onClose={() => setEditModalOpen(false)}
          />
        </Modal>

        {/* попап на удаление обьекта */}

        <Modal
          isOpen={isRemoveModalOpen}
          onClose={() => setRemoveModalOpen(false)}
        >
          <ObjectRemove
            id={obj.id}
            loading={loading}
            onSuccess={handleRemoveSuccess}
            onClose={() => setRemoveModalOpen(false)}
          />
        </Modal>
      </div>
    );
  }
};

export default ObjectPage;
