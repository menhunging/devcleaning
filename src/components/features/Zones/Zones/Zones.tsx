import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";

import type { zone } from "@/types/zones/zones";

import { getFullQRUrl } from "@/utils/getFullQRUrl";

import { getObjectById } from "@/store/slices/objectSlice";
import { addZone, deleteZone, updateZone } from "@/store/slices/zonesSlice";

import PopupRemove from "@/components/shared/ui/PopupRemove/PopupRemove";
import Modal from "@/components/shared/ui/Modal/Modal";
import ZonesForm from "../ZonesForm/ZonesForm";

import "./Zones.scss";

const Zones: React.FC = () => {
  const { DATA: users } = useAppSelector((state) => state.users);
  const { data: obj } = useAppSelector((state) => state.object);
  const { loading } = useAppSelector((state) => state.zones);

  const dispatch = useAppDispatch();

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [currentZone, setCurrentZone] = useState<zone | null>(null);

  function getNameUserByID(id: string | number) {
    const user = users.find((u) => Number(u.id) === Number(id));
    return user ? `${user.name} ${user.surname}` : null;
  }

  const handleAddSuccess = async (FormData: zone) => {
    // обработчик если успешно добавление зоны

    if (obj) {
      FormData.id_object = obj.id;
      FormData.qr = "https://fouro.ru/"; // пока не передаем никакой qr

      const result = await dispatch(addZone(FormData));

      if (addZone.fulfilled.match(result)) {
        setUpdateModalOpen(false);
        setAddModalOpen(false);
        setCurrentZone(null);

        dispatch(getObjectById(obj.id));
      }
    }
  };

  const handleUpdateSuccess = async (FormData: zone) => {
    // обработчик если успешно редактирование зоны

    if (obj) {
      FormData.id_object = obj.id;

      const result = await dispatch(updateZone(FormData));
      if (updateZone.fulfilled.match(result)) {
        setUpdateModalOpen(false);
        setAddModalOpen(false);
        setCurrentZone(null);

        dispatch(getObjectById(obj.id));
      }
    }
  };

  const handleDeleteSuccess = async () => {
    // обработчик если успешно удаление зоны

    if (obj && currentZone) {
      const result = await dispatch(deleteZone({ id: currentZone.id_zone }));
      if (deleteZone.fulfilled.match(result)) {
        setCurrentZone(null);
        setDeleteModalOpen(false);

        dispatch(getObjectById(obj.id));
      }
    }
  };

  const onOpenModal = (mode?: string) => {
    if (mode === "edit") {
      setUpdateModalOpen(true);
      setAddModalOpen(true);
    } else {
      setUpdateModalOpen(false);
      setAddModalOpen(true);
    }
  };

  const onCloseAddModal = () => {
    setCurrentZone(null);
    setAddModalOpen(false);
  };

  return (
    <div className="zones">
      <div className="zones__controls">
        <span
          className="btn btn--greenLight btn--add"
          onClick={() => {
            onOpenModal();
          }}
        >
          Добавить
        </span>
        <span className="btn btn--download">Выгрузить</span>
      </div>

      <div className="zones-body">
        {obj?.zones.length ? (
          <div className="zoneList">
            {obj.zones.map((zone) => {
              return (
                <div className="zoneItem" key={zone.name_zone}>
                  <span className="zoneItem__name">{zone.name_zone}</span>

                  {zone.user_id_zone ? (
                    <span className="zoneItem__res">
                      <span className="desc">Ответственный: </span>
                      {getNameUserByID(zone.user_id_zone)}
                    </span>
                  ) : (
                    <>
                      <span className="zoneItem__res">
                        Ответственный не назначен
                      </span>
                    </>
                  )}

                  <a
                    href={getFullQRUrl(zone.qr)}
                    className="zoneItem__qr"
                    download={getFullQRUrl(zone.qr)}
                  >
                    Скачать QR
                  </a>

                  <div className="zoneItem__controls">
                    <span
                      className="icon-change"
                      onClick={() => {
                        setCurrentZone(zone);

                        let mode = "edit";
                        onOpenModal(mode);
                      }}
                    ></span>
                    <span
                      className="icon-delete"
                      onClick={() => {
                        setCurrentZone(zone);
                        setDeleteModalOpen(true);
                      }}
                    ></span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="empty-text">Здесь ничего нет</p>
        )}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={onCloseAddModal}>
        <ZonesForm
          id_object={obj ? obj.id : ""}
          mode={isUpdateModalOpen ? "edit" : "add"}
          initialData={currentZone ? currentZone : null}
          loading={loading}
          users={obj?.users}
          onSuccess={isUpdateModalOpen ? handleUpdateSuccess : handleAddSuccess}
          onClose={onCloseAddModal}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setCurrentZone(null);
          setDeleteModalOpen(false);
        }}
      >
        <PopupRemove
          loading={loading}
          onSuccess={handleDeleteSuccess}
          onClose={() => {
            setCurrentZone(null);
            setDeleteModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Zones;
