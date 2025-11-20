import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";

import type { Appeal } from "@/types/appeals/appeals";

import AppealsPopup from "@/components/features/appeals/AppealsPopup";

import { getObjects } from "@/store/slices/objectsSlice";
import { fetchUsers } from "@/store/slices/usersSlice";
import {
  addAppeal,
  changeAppealStatus,
  getAppeals,
  updateAppeal,
} from "@/store/slices/appealsSlice";

import { useFormatedDate } from "@/utils/forPlanner/useFormatedDate";
import { normalizeTime } from "@/utils/forPlanner/normalizeTime";
import { Switcher } from "@/components/shared/ui/Switcher/Switcher";

import "./AppealsPage.scss";

const AppealsPage: React.FC = () => {
  const { loading, DATA: appeals } = useAppSelector((state) => state.appeals);
  const dispatch = useAppDispatch();

  const [currentAppeal, setCurrentAppeal] = useState<Appeal | null>(null);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const onOpenModal = (mode: string) => {
    if (mode === "edit") {
      setUpdateModalOpen(true);
      setAddModalOpen(true);
    } else {
      setUpdateModalOpen(false);
      setAddModalOpen(true);
    }
  };

  const OnCloseModal = () => {
    setCurrentAppeal(null);
    setAddModalOpen(false);
  };

  const handleAddAppeal = async (formData: Appeal) => {
    const result = await dispatch(
      addAppeal({
        ...formData,
        data_create: new Date().toISOString().split("T")[0],
      })
    );

    if (addAppeal.fulfilled.match(result)) {
      OnCloseModal();
      dispatch(getAppeals());
    }
  };

  const handleUpdateAppeal = async (formData: Appeal) => {
    const result = await dispatch(updateAppeal(formData));

    if (updateAppeal.fulfilled.match(result)) {
      OnCloseModal();
      dispatch(getAppeals());
    }
  };

  useEffect(() => {
    // dispatch(fetchUsers());
    // dispatch(getObjects());
    // dispatch(getAppeals());
  }, []);

  return (
    <div className="page page--appeals">
      <div className="page__head">
        <h2 className="caption caption--h2">Обращения</h2>
      </div>

      <div className="page__controls">
        {/* <span
          className="btn btn--greenLight btn--add"
          onClick={() => {
            onOpenModal("add");
          }}
        >
          Добавить обращение
        </span> */}

        <span className="btn btn--download">Скачать</span>
      </div>

      <div className="page__body">
        {appeals?.length ? (
          <div className="table table--appeals">
            <div className="table__header">
              <div className="table__cell">Название</div>
              <div className="table__cell">Объект</div>
              <div className="table__cell">Зона</div>
              <div className="table__cell">Описание</div>
              <div className="table__cell">Исполнитель</div>
              <div className="table__cell">Команда</div>
              <div className="table__cell">Дата</div>
              <div className="table__cell">Время</div>
              <div className="table__cell">Длительность</div>
              <div className="table__cell">Статус</div>
              <div className="table__cell"></div>
            </div>

            <div className="table__body">
              {appeals.map((appealItem) => {
                return (
                  <div className="table__row" key={appealItem.id}>
                    <div className="table__cell">{appealItem.name}</div>
                    <div className="table__cell">{appealItem.name_object}</div>
                    <div className="table__cell">{appealItem.name_zone}</div>

                    <div className="table__cell">{appealItem.description}</div>

                    <div className="table__cell">
                      {appealItem.name_user
                        ? `${appealItem.name_user} ${appealItem.surname_user}`
                        : "-"}
                    </div>
                    <div className="table__cell">
                      {appealItem.name_team || "-"}
                    </div>
                    <div className="table__cell">
                      {useFormatedDate(appealItem.date_start)}
                    </div>
                    <div className="table__cell">
                      {normalizeTime(appealItem.time_start)}
                    </div>
                    <div className="table__cell">-</div>
                    <div className="table__cell">
                      <Switcher
                        status={appealItem.status}
                        dispatch={() => {
                          dispatch(
                            changeAppealStatus({ id: String(appealItem.id) })
                          );
                        }}
                      />
                    </div>
                    <div className="table__cell">
                      <div className="icons-controls">
                        <span
                          className="icon-change"
                          onClick={() => {
                            setCurrentAppeal(appealItem);
                            onOpenModal("edit");
                          }}
                        ></span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="empty-text">
            {!loading ? "Здесь ничего нет" : "Загрузка..."}
          </div>
        )}
      </div>

      <AppealsPopup
        mode={isUpdateModalOpen ? "edit" : "add"}
        loading={loading}
        initialData={currentAppeal ? currentAppeal : null}
        isOpen={isAddModalOpen}
        handleModalClose={OnCloseModal}
        onSubmit={isUpdateModalOpen ? handleUpdateAppeal : handleAddAppeal}
      />
    </div>
  );
};

export default AppealsPage;

