import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";

import { getAppeals } from "@/store/slices/appealsSlice";

import { addPlanner, getPlanner } from "@/store/slices/plannerSlice";
import { getObjects } from "@/store/slices/objectsSlice";

import AppealsPageSkeleton from "@/components/features/appeals/Skeleton/AppealsPageSkeleton";
import PlannerPopup from "@/components/features/planner/PlannerPopup";
import type { Planner } from "@/types/planner/planner";

import "./AppealsPage.scss";

const AppealsPage: React.FC = () => {
  // универсальный "пустой" Planner, лень ts переписывать
  const emptyPlanner: Planner = {
    id: null,
    name: "",
    data_create: "",
    description: "",
    date_start: "",
    time_start: "",
    data_end: "",
    time_end: "",
    status: 0,
    name_object: "",
    name_zone: "",
    name_user: "",
    surname_user: "",
    name_team: "",
    name_status: "",
    duration: null,
    id_object: "",
    id_zone: "",
    id_user: "",
    id_team: "",
  };

  const { loading, DATA: appeals } = useAppSelector((state) => state.appeals);
  const { loading: loadingObject } = useAppSelector((state) => state.object);

  const dispatch = useAppDispatch();

  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const [currentPlanner, setCurrentPlanner] = useState<Planner | null>(null);

  const formatedDateAppeals = (apiDate: string, mode: string) => {
    const dateObj = new Date(apiDate.replace(" ", "T")); // заменяем пробел на T для корректного парсинга

    if (mode === "date") {
      // Форматируем дату: DD.MM.YY
      const datePart = dateObj.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });

      return datePart;
    }

    if (mode === "time") {
      // Форматируем время: HH:MM
      const timePart = dateObj.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return timePart;
    }

    return "-";
  };

  const handleAddTask = async (formData: Planner) => {
    const result = await dispatch(addPlanner(formData));

    if (addPlanner.fulfilled.match(result)) {
      OnCloseModal();
      dispatch(getPlanner());
    }
  };

  const onOpenModal = () => {
    setAddModalOpen(true);
  };

  const OnCloseModal = () => {
    setCurrentPlanner(null);
    setAddModalOpen(false);
  };

  useEffect(() => {
    dispatch(getObjects());
    dispatch(getAppeals());
  }, []);

  return (
    <div className="page page--appeals">
      <div className="page__head">
        <h2 className="caption caption--h2">Обращения</h2>
      </div>

      <div className="page__controls">
        <span className="btn btn--download">Скачать</span>
      </div>

      <div className="page__body">
        {loading ? (
          <AppealsPageSkeleton />
        ) : (
          <>
            {appeals?.length ? (
              <div className="table table--appeals">
                <div className="table__header">
                  <div className="table__cell">Дата</div>
                  <div className="table__cell">Время</div>
                  <div className="table__cell">Оценка</div>
                  <div className="table__cell">Объект</div>
                  <div className="table__cell">зона</div>
                  <div className="table__cell">Текст обращения</div>
                  <div className="table__cell">Кто обратился</div>
                  {/* <div className="table__cell">Медиа</div> */}
                  <div className="table__cell">Статус</div>
                  <div className="table__cell"></div>
                </div>

                <div className="table__body">
                  {appeals.map((appealItem) => {
                    return (
                      <div className="table__row" key={appealItem.id}>
                        <div className="table__cell">
                          {formatedDateAppeals(appealItem.date_create, "date")}
                        </div>
                        <div className="table__cell">
                          {formatedDateAppeals(appealItem.date_create, "time")}
                        </div>
                        <div className="table__cell">
                          {appealItem.like_a === 1 ? (
                            <span className="like"></span>
                          ) : (
                            <span className="deslike"></span>
                          )}
                        </div>
                        <div className="table__cell">
                          {appealItem.name_object}
                        </div>
                        <div className="table__cell">
                          {appealItem.name_zone}
                        </div>
                        <div className="table__cell">
                          {appealItem.message || "-"}
                        </div>
                        <div className="table__cell">
                          {appealItem.contact_name}
                        </div>
                        {/* <div className="table__cell">Смотреть</div> */}
                        <div className="table__cell">
                          {appealItem.status_success === 0 ? (
                            <span className="status status--active">
                              В работе
                            </span>
                          ) : (
                            <span className="status status--success">
                              Выполнено
                            </span>
                          )}
                        </div>
                        <div className="table__cell">
                          <div className="appeleals-controls">
                            <span
                              className="icon icon-add"
                              onClick={() => {
                                setCurrentPlanner({
                                  ...emptyPlanner,
                                  name: "Задача по обращению",
                                  data_create: appealItem.date_create,
                                  id_object: String(appealItem.id_object),
                                  id_zone: String(appealItem.id_zone),
                                });
                                onOpenModal();
                              }}
                            ></span>
                            <span className="icon icon-delete"></span>
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
          </>
        )}
      </div>

      <PlannerPopup
        mode={"edit"}
        loading={loading}
        loadingObject={loadingObject}
        initialData={currentPlanner ? currentPlanner : null}
        isOpen={isAddModalOpen}
        handleModalClose={OnCloseModal}
        onSubmit={handleAddTask}
      />
    </div>
  );
};

export default AppealsPage;
