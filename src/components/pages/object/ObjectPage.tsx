import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useNavigate, useParams } from "react-router-dom";
import type { formDataObject } from "@/types/objects/objectsForm";

import {
  deleteObject,
  getObjectById,
  updateObject,
} from "@/store/slices/objectSlice";

import Modal from "@/components/shared/ui/Modal/Modal";
import ObjectForm from "@/components/features/objects/ObjectForm/ObjectForm";
import ObjectRemove from "@/components/features/objects/ObjectRemove/ObjectRemove";

import "./ObjectPage.scss";

const ObjectPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, data: obj } = useAppSelector((state) => state.object);

  const { id } = useParams<{ id: string }>();

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);

  const handleUpdateSuccess = async (formData: formDataObject) => {
    // если редактирование обьекта происходит успешно

    const result = await dispatch(updateObject(formData));
    if (updateObject.fulfilled.match(result)) {
      setEditModalOpen(false);

      if (id) {
        dispatch(getObjectById(id));
      }
    } else {
      console.log(result.payload);
    }
  };

  const handleRemoveSuccess = async () => {
    // если удаление обьекта происходит успешно

    if (obj) {
      const result = await dispatch(deleteObject(obj.id));
      if (deleteObject.fulfilled.match(result)) {
        setRemoveModalOpen(false);
        navigate("/");
      } else {
        console.log(result.payload);
      }
    }
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
          <ObjectForm
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
