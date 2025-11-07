import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";

import { getObjects } from "@/store/slices/objectsSlice";

import ObjectsList from "@/components/features/objects/ObjectsList/ObjectsList";
import ObjectAdd from "@/components/features/objects/ObjectAdd/ObjectAdd";

import "./ObjectsPage.scss";
import Modal from "@/components/shared/ui/Modal/Modal";

const ObjectsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, DATA } = useAppSelector((state) => state.objects);

  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const handleObjectAddSuccess = () => {
    // если добавление обьекта происходит успешно
    setAddModalOpen(false);
    dispatch(getObjects());
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
        <ObjectsList objects={DATA} />
      </div>

      {/* попап на добавление обьекта */}

      <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)}>
        <ObjectAdd
          loading={loading}
          onSuccess={handleObjectAddSuccess}
          onClose={() => setAddModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ObjectsPage;
