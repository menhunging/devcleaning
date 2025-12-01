import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";

import type { Planner } from "@/types/planner/planner";

import PlannerPopup from "@/components/features/planner/PlannerPopup";

import { getObjects } from "@/store/slices/objectsSlice";
import { fetchUsers } from "@/store/slices/usersSlice";
import {
  addPlanner,
  changeStatus,
  getPlanner,
  updatePlanner,
} from "@/store/slices/plannerSlice";

import { useFormatedDate } from "@/utils/forPlanner/useFormatedDate";
import { normalizeTime } from "@/utils/forPlanner/normalizeTime";
import { Switcher } from "@/components/shared/ui/Switcher/Switcher";

import "./PlannerPage.scss";

const PlannerPage: React.FC = () => {
  const { loading, DATA: planners } = useAppSelector((state) => state.planner);
  const { loading: loadingObject } = useAppSelector((state) => state.object);
  const dispatch = useAppDispatch();

  const [currentPlanner, setCurrentPlanner] = useState<Planner | null>(null);

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
    setCurrentPlanner(null);
    setAddModalOpen(false);
  };

  const handleAddTask = async (formData: Planner) => {
    const result = await dispatch(
      addPlanner({
        ...formData,
        data_create: new Date().toISOString().split("T")[0], // 2025-11-19
      })
    );

    if (addPlanner.fulfilled.match(result)) {
      OnCloseModal();
      dispatch(getPlanner());
    }
  };

  const handleUpdateTask = async (formData: Planner) => {
    const result = await dispatch(updatePlanner(formData));

    if (updatePlanner.fulfilled.match(result)) {
      OnCloseModal();
      dispatch(getPlanner());
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(getObjects());
    dispatch(getPlanner());
  }, []);

  return (
    <div className="page page--planer">
      <div className="page__head">
        <h2 className="caption caption--h2">Планер</h2>
      </div>

      <div className="page__controls">
        <span
          className="btn btn--greenLight btn--add"
          onClick={() => {
            onOpenModal("add");
          }}
        >
          Добавить задание
        </span>

        <span className="btn btn--download">Скачать</span>
      </div>

      <div className="page__body">
        {planners?.length ? (
          <div className="table table--planner">
            <div className="table__header">
              <div className="table__cell">Название</div>
              <div className="table__cell">Объект</div>
              <div className="table__cell">Зона</div>
              <div className="table__cell">Задание</div>
              <div className="table__cell">Исполнитель</div>
              <div className="table__cell">Команда</div>
              <div className="table__cell">Дата начала</div>
              <div className="table__cell">Время начала</div>
              <div className="table__cell">Длительность</div>
              <div className="table__cell">Статус</div>
              <div className="table__cell"></div>
            </div>

            <div className="table__body">
              {planners.map((plannerItem) => {
                return (
                  <div className="table__row" key={plannerItem.id}>
                    <div className="table__cell">{plannerItem.name}</div>
                    <div className="table__cell">{plannerItem.name_object}</div>
                    <div className="table__cell">{plannerItem.name_zone}</div>

                    <div className="table__cell">{plannerItem.description}</div>

                    <div className="table__cell">
                      {plannerItem.name_user
                        ? `${plannerItem.name_user} ${plannerItem.surname_user}`
                        : "-"}
                    </div>
                    <div className="table__cell">
                      {plannerItem.name_team || "-"}
                    </div>
                    <div className="table__cell">
                      {plannerItem.date?.[0]
                        ? useFormatedDate(plannerItem.date[0])
                        : plannerItem.repeat_start
                        ? useFormatedDate(plannerItem.repeat_start)
                        : null}
                    </div>

                    <div className="table__cell">
                      {normalizeTime(plannerItem.time_start)}
                    </div>
                    <div className="table__cell">
                      {plannerItem.duration
                        ? `${plannerItem.duration} мин`
                        : "-"}
                    </div>
                    <div className="table__cell">
                      <Switcher
                        status={plannerItem.status}
                        dispatch={() => {
                          {
                            dispatch(
                              changeStatus({ id: String(plannerItem.id) })
                            );
                          }
                        }}
                      />
                    </div>
                    <div className="table__cell">
                      <div className="icons-controls">
                        <span
                          className="icon-change"
                          onClick={() => {
                            setCurrentPlanner(plannerItem);
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

      {/* попап на добавление таски */}

      <PlannerPopup
        mode={isUpdateModalOpen ? "edit" : "add"}
        loading={loading}
        loadingObject={loadingObject}
        initialData={currentPlanner ? currentPlanner : null}
        isOpen={isAddModalOpen}
        handleModalClose={OnCloseModal}
        onSubmit={isUpdateModalOpen ? handleUpdateTask : handleAddTask}
      />
    </div>
  );
};

export default PlannerPage;
