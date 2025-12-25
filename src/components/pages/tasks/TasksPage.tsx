import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";

import type { ITask } from "@/types/tasks/tasks";

import TasksPopup from "@/components/features/tasks/TasksPopup";

import { getTasksAll, editTaskByID } from "@/store/slices/tasksSlice";

import { useFormatedDate } from "@/utils/forPlanner/useFormatedDate";
import { normalizeTime } from "@/utils/forPlanner/normalizeTime";

import "./TasksPage.scss";
import { getObjects } from "@/store/slices/objectsSlice";
import { fetchUsers } from "@/store/slices/usersSlice";
import Modal from "@/components/shared/ui/Modal/Modal";
import PopupRemove from "@/components/shared/ui/PopupRemove/PopupRemove";

const statuses: Record<string, string> = {
  "1": "В работе",
  "2": "Выполнено",
  "3": "На паузе",
  "4": "Пропуск",
};

const TasksPage: React.FC = () => {
  const { loading, DATA: tasks } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const [currentTask, setCurrentTask] = useState<ITask | null>(null);
  const [isRemoveModalOpen, setRemoveModalOpen] = useState<boolean>(false);

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

  const onCloseModal = () => {
    setCurrentTask(null);
    setAddModalOpen(false);
    setRemoveModalOpen(false);
  };

  const handleAddTask = async (formData: ITask) => {
    console.log("Add task:", formData);
    onCloseModal();
  };

  const handleUpdateTask = async (formData: ITask) => {
    const result = await dispatch(
      editTaskByID({
        id: formData.id,
        description: formData.description,
        id_user: String(formData.id_user),
        id_team: String(formData.id_team),
        time_start: formData.time_start,
        time_end: formData.time_end,
        duration: String(formData.duration),
        date_start: formData.date_start,
      })
    );

    if (editTaskByID.fulfilled.match(result)) {
      onCloseModal();
      dispatch(getTasksAll({}));
    }
  };

  const handleDeleteTask = async () => {
    // TODO: Реализовать удаление задачи
    console.log("Delete task:", currentTask);
    onCloseModal();
  };

  function timeToMinutes(timeStr: string) {
    const [h, m, s] = timeStr.split(":").map(Number);
    const total = Math.round(h * 60 + m + s / 60);

    return total + " мин";
  }

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(getObjects());
    dispatch(getTasksAll({}));
  }, []);

  return (
    <div className="page page--tasks">
      <div className="page__head">
        <h2 className="caption caption--h2">Задачи</h2>
      </div>

      <div className="page__controls">
        <span
          className="btn btn--greenLight btn--add"
          onClick={() => {
            onOpenModal("add");
          }}
        >
          Добавить задачу
        </span>

        <span className="btn btn--download">Скачать</span>
      </div>

      <div className="page__body">
        {tasks?.length ? (
          <div className="table table--tasks">
            <div className="table__header">
              <div className="table__cell">Дата</div>
              <div className="table__cell">Объект</div>
              <div className="table__cell">Зона</div>
              <div className="table__cell">Задание</div>
              <div className="table__cell">Исполнитель</div>
              <div className="table__cell">Команда</div>
              <div className="table__cell">
                Время начала <span className="desc">план</span>
              </div>
              <div className="table__cell">
                Время начала <span className="desc">факт</span>
              </div>
              <div className="table__cell">
                Время завершения<span className="desc">план</span>
              </div>
              <div className="table__cell">
                Время завершения<span className="desc">факт</span>
              </div>
              <div className="table__cell">
                Длительность <span className="desc">план</span>
              </div>
              <div className="table__cell">Трекер</div>

              <div className="table__cell">Статус</div>
              <div className="table__cell"></div>
            </div>

            <div className="table__body">
              {tasks.map((taskItem) => {
                return (
                  <div className="table__row" key={taskItem.id}>
                    <div className="table__cell">
                      {taskItem.date_start
                        ? useFormatedDate(taskItem.date_start)
                        : null}
                    </div>
                    <div className="table__cell">{taskItem.name_object}</div>
                    <div className="table__cell">{taskItem.name_zone}</div>

                    <div className="table__cell">{taskItem.description}</div>

                    <div className="table__cell">
                      {taskItem.name_user
                        ? `${taskItem.name_user} ${taskItem.surname_user}`
                        : "-"}
                    </div>
                    <div className="table__cell">
                      {taskItem.name_team || "-"}
                    </div>

                    <div className="table__cell">
                      {normalizeTime(taskItem.time_start)}
                    </div>

                    <div className="table__cell">бэка нет</div>

                    <div className="table__cell">
                      {normalizeTime(taskItem.time_end)}
                    </div>
                    <div className="table__cell">бэка нет</div>
                    <div className="table__cell">{taskItem.duration} мин</div>

                    <div className="table__cell">
                      {taskItem.time_current ? (
                        <span className="track-min">
                          {timeToMinutes(taskItem.time_current)}
                        </span>
                      ) : (
                        "-"
                      )}
                    </div>

                    <div className="table__cell">
                      {statuses[taskItem.status]}
                    </div>

                    <div className="table__cell">
                      <div className="icons-controls">
                        <span
                          className="icon-change"
                          onClick={() => {
                            setCurrentTask(taskItem);
                            onOpenModal("edit");
                          }}
                        ></span>
                        <span
                          className="icon-delete"
                          onClick={() => {
                            setRemoveModalOpen(true);
                            setCurrentTask(taskItem);
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

      {/* попап на добавление/редактирование задачи */}

      <TasksPopup
        mode={isUpdateModalOpen ? "edit" : "add"}
        loading={loading}
        initialData={currentTask ? currentTask : null}
        isOpen={isAddModalOpen}
        handleModalClose={onCloseModal}
        onSubmit={isUpdateModalOpen ? handleUpdateTask : handleAddTask}
      />

      {/* попап на удаление обьекта */}
      <Modal
        isOpen={isRemoveModalOpen}
        onClose={() => setRemoveModalOpen(false)}
      >
        <PopupRemove
          loading={loading}
          onSuccess={handleDeleteTask}
          onClose={() => setRemoveModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default TasksPage;
