import { getFullPhotoUrl } from "@/utils/getFullPhotoUrl";
import type { Option } from "@/types/ui/select/select";

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
import PopupRemove from "@/components/shared/ui/PopupRemove/PopupRemove";

import "./ObjectPage.scss";
import ObjectTabs from "@/components/features/object/ObjectTabs";
import SelectUI from "@/components/shared/ui/Select/SelectUI/SelectUI";

const ObjectPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, data: obj } = useAppSelector((state) => state.object);

  const { id } = useParams<{ id: string }>();

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);

  const options: Option[] = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

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
          <h2 className="caption caption--h2">
            {obj.name} ---- id: {obj.id}
          </h2>
        </div>
        <div className="page__body">
          <div className="object-page__list">
            <div className="object-page__item">
              <div className="picture-block picture-main">
                <picture>
                  {obj.photo ? (
                    <img src={getFullPhotoUrl(obj.photo)} alt={obj.name} />
                  ) : (
                    <div className="not-photo">🖼️ Фото не загружено</div>
                  )}
                </picture>
              </div>
            </div>

            <div className="object-page__item">
              <div className="object-page__controls">
                <span
                  className="icon-change"
                  onClick={() => {
                    setEditModalOpen(true);
                  }}
                ></span>
                <span
                  className="icon-delete"
                  onClick={() => {
                    setRemoveModalOpen(true);
                  }}
                ></span>
              </div>

              <div className="object-info">
                <div className="object-info__info">
                  <p>{obj.adress}</p>

                  <ul className="object-info__state">
                    <li>
                      <span>зоны:</span>
                      <strong>{obj.zones_count}</strong>
                    </li>
                    <li>
                      <span>задачи:</span>
                      <strong>{obj.tasks_count}</strong>
                    </li>
                    <li>
                      <span>сотрудники:</span>
                      <strong>{obj.users_count}</strong>
                    </li>
                  </ul>
                </div>

                <div className="object-manager">
                  <span className="object-manager__title">Менеджер:</span>
                  <div className="object-manager__managers">
                    <SelectUI
                      options={options}
                      onChange={() => {
                        console.log("123");
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ObjectTabs />
        </div>

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
          <PopupRemove
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
