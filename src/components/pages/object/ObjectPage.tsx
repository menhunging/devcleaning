import { getFullPhotoUrl } from "@/utils/getFullPhotoUrl";
import type { Option } from "@/types/ui/select/select";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useNavigate, useParams } from "react-router-dom";

import type { formDataObject } from "@/types/objects/objectsForm";
import type { SingleValue } from "react-select";

import {
  deleteObject,
  getObjectById,
  // updateManagerObject,
  updateObject,
} from "@/store/slices/objectSlice";

import Modal from "@/components/shared/ui/Modal/Modal";
import ObjectForm from "@/components/features/objects/ObjectForm/ObjectForm";
import PopupRemove from "@/components/shared/ui/PopupRemove/PopupRemove";

import ObjectTabs from "@/components/features/object/ObjectTabs";
import SelectUI from "@/components/shared/ui/Select/SelectUI/SelectUI";

import "./ObjectPage.scss";
import { fetchUsers } from "@/store/slices/usersSlice";

const ObjectPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { DATA: users } = useAppSelector((state) => state.users);
  const { loading, data: obj } = useAppSelector((state) => state.object);

  const { id } = useParams<{ id: string }>();

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);

  const options: Option[] = (users || []).map((user) => ({
    value: String(user.id), // тут id
    label: user.name,
  }));

  const handleUpdateSuccess = async (formData: formDataObject) => {
    // если редактирование обьекта происходит успешно

    setEditModalOpen(false);

    const result = await dispatch(updateObject(formData));
    if (updateObject.fulfilled.match(result)) {
      if (id) {
        dispatch(getObjectById(id));
      }
    } else {
      console.log(result.payload);
    }
  };

  const handleRemoveSuccess = async () => {
    // если удаление обьекта происходит успешно

    setRemoveModalOpen(false);

    if (obj) {
      dispatch(deleteObject(obj.id));
      navigate("/");
      // if (deleteObject.fulfilled.match(result)) {
      //   debugger

      // } else {
      //   console.log(result.payload);
      // }
    }
  };

  const changeManager = (selected: SingleValue<Option>) => {
    console.log(selected);

    if (selected && obj) {
      const payload = {
        id_object: obj.id,
        // id_object_user: obj.user_manager.id_object_user,
        id_user: Number(selected.value),
      };

      console.log("selected.label", selected.label);
      console.log("payload", payload);

      // dispatch(updateManagerObject(payload));
    }

    // if (selected && obj?.user_manager?.id_object_user) {
    // }

    // setFormData((prev) => ({
    //   ...prev,
    //   id_object: selected ? selected.value : "",
    // }));
  };

  useEffect(() => {
    if (id) {
      dispatch(getObjectById(id));
      dispatch(fetchUsers());
    }
  }, [id, dispatch]);

  if (obj) {
    return (
      <div className="page">
        <div className="page__head">
          {loading ? (
            <div className="skeleton-object__caption"></div>
          ) : (
            <h2 className="caption caption--h2">
              `${obj.name} ---- id: ${obj.id}`
            </h2>
          )}

          <span className="btn page__btn-back" onClick={() => navigate(-1)}>
            Назад
          </span>
        </div>
        <div className="page__body">
          <div className="object-page__list">
            <div className="object-page__item">
              {loading ? (
                <div className="skeleton-object__media"></div>
              ) : (
                <div className="picture-block picture-main">
                  <picture>
                    {obj.photo ? (
                      <img src={getFullPhotoUrl(obj.photo)} alt={obj.name} />
                    ) : (
                      <div className="not-photo">🖼️ Фото не загружено</div>
                    )}
                  </picture>
                </div>
              )}
            </div>

            <div className="object-page__item">
              {loading ? (
                <>
                  <div className="object-page__controls skeleton-object-page">
                    <span className="skeleton__line skeleton__icon" />
                    <span className="skeleton__line skeleton__icon" />
                  </div>

                  <div className="object-info ">
                    <div className="object-info__info">
                      <p className="skeleton__line skeleton__text" />

                      <ul className="object-info__state">
                        <li>
                          <span className="skeleton__line skeleton__label" />
                          <strong className="skeleton__line skeleton__number" />
                        </li>
                        <li>
                          <span className="skeleton__line skeleton__label" />
                          <strong className="skeleton__line skeleton__number" />
                        </li>
                        <li>
                          <span className="skeleton__line skeleton__label" />
                          <strong className="skeleton__line skeleton__number" />
                        </li>
                      </ul>
                    </div>

                    <div className="object-manager">
                      <span className="skeleton__line skeleton__title" />
                      <div className="object-manager__managers">
                        <div className="skeleton__line skeleton__select" />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
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
                        <SelectUI options={options} onChange={changeManager} />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <ObjectTabs obj={obj} />
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
