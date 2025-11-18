import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import type { formDataObject } from "@/types/objects/objectsForm";

import { addObject, getObjects } from "@/store/slices/objectsSlice";

import ObjectsList from "@/components/features/objects/ObjectsList/ObjectsList";
import ObjectForm from "@/components/features/objects/ObjectForm/ObjectForm";

import "./ObjectsPage.scss";
import Modal from "@/components/shared/ui/Modal/Modal";

const ObjectsPage: React.FC = () => {
  const { loading, DATA: objects } = useAppSelector((state) => state.objects);

  const dispatch = useAppDispatch();

  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const handleObjectAddSuccess = async (formData: formDataObject) => {
    // если добавление обьекта происходит успешно

    const result = await dispatch(addObject(formData));
    if (addObject.fulfilled.match(result)) {
      setAddModalOpen(false);
      dispatch(getObjects());
    } else {
      console.log(result.payload);
    }
  };

  useEffect(() => {
    dispatch(getObjects());
  }, [dispatch]);

  return (
    <div className="page">
      <div className="page__head">
        <h2 className="caption caption--h2">Объекты</h2>
      </div>
      <div className="page__controls">
        <span
          className="btn btn--greenLight btn--add"
          onClick={() => setAddModalOpen(true)}
        >
          Добавить
        </span>
      </div>
      <div className="page__body">
        <ObjectsList loading={loading} objects={objects} />
      </div>

      {/* попап на добавление обьекта */}

      <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)}>
        <ObjectForm
          loading={loading}
          onSuccess={handleObjectAddSuccess}
          onClose={() => setAddModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ObjectsPage;
