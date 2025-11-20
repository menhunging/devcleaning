import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";

import { getAppeals } from "@/store/slices/appealsSlice";

import "./AppealsPage.scss";
import AppealsPageSkeleton from "@/components/features/appeals/Skeleton/AppealsPageSkeleton";

const AppealsPage: React.FC = () => {
  const { loading, DATA: appeals } = useAppSelector((state) => state.appeals);
  const dispatch = useAppDispatch();

  // const [currentAppeal, setCurrentAppeal] = useState<Appeal | null>(null);

  // const [isAddModalOpen, setAddModalOpen] = useState(false);
  // const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  // const onOpenModal = (mode: string) => {
  //   if (mode === "edit") {
  //     setUpdateModalOpen(true);
  //     setAddModalOpen(true);
  //   } else {
  //     setUpdateModalOpen(false);
  //     setAddModalOpen(true);
  //   }
  // };

  // const OnCloseModal = () => {
  //   setCurrentAppeal(null);
  //   setAddModalOpen(false);
  // };

  useEffect(() => {
    // dispatch(fetchUsers());
    // dispatch(getObjects());
    dispatch(getAppeals());
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
                  <div className="table__cell">Медиа</div>
                  <div className="table__cell">Статус</div>
                  <div className="table__cell"></div>
                </div>

                <div className="table__body">
                  {appeals.map((appealItem) => {
                    return (
                      <div className="table__row" key={appealItem.id}>
                        <div className="table__cell">
                          {appealItem.date_create}
                        </div>
                        <div className="table__cell">
                          {appealItem.date_create}
                        </div>
                        <div className="table__cell">{appealItem.like_a}</div>
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
                        <div className="table__cell">Смотреть</div>
                        <div className="table__cell">
                          {appealItem.status_success}
                        </div>
                        <div className="table__cell">Создать задание</div>
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
    </div>
  );
};

export default AppealsPage;
