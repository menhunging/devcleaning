import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";

import Modal from "@/components/shared/ui/Modal/Modal";
import SelectUI from "@/components/shared/ui/Select/SelectUI/SelectUI";
import { getOptionForObjects } from "@/utils/getOptionForObjects";
import SelectUIMulti from "@/components/shared/ui/Select/SelectUIMulti/SelectUIMulti";
import type { Option } from "@/types/ui/select/select";
import { getObjects } from "@/store/slices/objectsSlice";

import "./PlannerPage.scss";

const PlannerPage: React.FC = () => {
  const { DATA: users } = useAppSelector((state) => state.users);
  const { DATA: objects } = useAppSelector((state) => state.objects);
  const dispatch = useAppDispatch();

  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const handleSubmit = () => {
    console.log("handleSubmit");
    dispatch(getObjects()); // удалить, чтобы ts не ругался сделал
  };

  const optionsUsers: Option[] = (users || [])
    .filter((user) => user.role === 3) // оставляем только с ролью 3
    .map((user) => ({
      value: String(user.id),
      label: `${user.name} ${user.surname}`,
    }));

  return (
    <div className="page page--planer">
      <div className="page__head">
        <h2 className="caption caption--h2">Планер</h2>
      </div>

      <div className="page__controls">
        <span
          className="btn btn--greenLight btn--add"
          onClick={() => setAddModalOpen(true)}
        >
          Добавить
        </span>

        <span className="btn btn--download">Скачать</span>
      </div>

      <div className="page__body">
        <div className="empty-text">Здесь ничего нет</div>

        <div className="table table--planner">
          <div className="table__header">
            <div className="table__cell">Объект</div>
            <div className="table__cell">Зона</div>
            <div className="table__cell">Задание</div>
            <div className="table__cell">Исполнитель</div>
            <div className="table__cell">Команда</div>
            <div className="table__cell">Время начала</div>
            <div className="table__cell">Длительность</div>
            <div className="table__cell">Статус</div>
            <div className="table__cell"></div>
          </div>

          <div className="table__body">
            <div className="table__row">
              <div className="table__cell">ТЦ “Балтийский”</div>
              <div className="table__cell">Офис № 10</div>

              <div className="table__cell">Уборка складского помещения</div>

              <div className="table__cell">Иванов Иван</div>
              <div className="table__cell">МПР-1</div>
              <div className="table__cell">10:30</div>
              <div className="table__cell">80 мин</div>
              <div className="table__cell">Активно</div>
              <div className="table__cell">
                <div className="icons-controls">
                  <span
                    className="icon-change"
                    // onClick={() => {
                    //   setCurrentUser(user);
                    //   onOpenModal("edit");
                    // }}
                  ></span>
                  {/* <span
                              className="icon-delete"
                              onClick={() => {
                                setCurrentUser(user);
                                setDeleteModalOpen(true);
                              }}
                            ></span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* попап на добавление таски */}

      <Modal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)}>
        <div className="popup-planer">
          <div className="popup-planer__head">Новое задание</div>

          <form className="popup-planer__form" onSubmit={handleSubmit}>
            <div className="popup-planer__col">
              <div className="input-item">
                <label htmlFor="name">Название</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  // value={formData.name}
                  // onChange={handleChange}
                />
              </div>

              <div className="input-item">
                <div className="selectWrap">
                  <label htmlFor="address">Объект</label>
                  <div className="selectWrap__wrap">
                    <SelectUI
                      options={getOptionForObjects(objects) || []}
                      // value={
                      //   getOptionForObjects(objects)?.find(
                      //     (opt) =>
                      //       Number(opt.value) === Number(formData.id_object)
                      //   ) || null
                      // }
                      onChange={() => {
                        // handleSelectSingleChange(event);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="input-item">
                <div className="selectWrap">
                  <label htmlFor="address">Зона</label>
                  <div className="selectWrap__wrap">
                    <SelectUI
                      options={getOptionForObjects(objects) || []}
                      // value={
                      //   getOptionForObjects(objects)?.find(
                      //     (opt) =>
                      //       Number(opt.value) === Number(formData.id_object)
                      //   ) || null
                      // }
                      onChange={() => {
                        // handleSelectSingleChange(event);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="input-item">
                <div className="selectWrap">
                  <label htmlFor="address">Сотрудники</label>
                  <div className="selectWrap__wrap">
                    <SelectUIMulti
                      options={optionsUsers}
                      // value={formData.users.map((user) => ({
                      //   value: String(user.id_user),
                      //   label: `${user.name}`,
                      // }))}
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </div>

              <div className="input-item">
                <label htmlFor="name">Описание задачи</label>
                <textarea
                  id="description"
                  name="description"
                  // value={formData.description}
                  // onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="popup-planer__col">
              <div className="input-item">
                <div className="selectWrap">
                  <label htmlFor="">Дата выполнения:</label>
                  <input type="text" />
                </div>
              </div>

              <div className="input-item">
                <div className="selectWrap">
                  <label htmlFor="">Время выполнения:</label>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="btn-controls btn-controls--right">
              <button
                type="button"
                className="btn btn--transparent"
                onClick={() => setAddModalOpen(false)}
              >
                Отмена
              </button>
              <button
                type="submit"
                className="btn btn--green"
                // disabled={btnDisabled}
              >
                Применить
                {/* {loading
                  ? "Сохранение..."
                  : mode === "edit"
                  ? "Применить"
                  : "Применить"} */}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default PlannerPage;
