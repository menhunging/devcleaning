import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";

import Modal from "@/components/shared/ui/Modal/Modal";
import UsersForm from "@/components/features/users/UsersForm/UsersForm";
import PopupRemove from "@/components/shared/ui/PopupRemove/PopupRemove";

import type { UserFormData } from "@/types/users/users";

import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "@/store/slices/usersSlice";

import "./Catalog.scss";

const CatalogPage: React.FC = () => {
  const { DATA, loading, error } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState<UserFormData | null>(null);

  const handleAddSuccess = async (FormData: UserFormData) => {
    // обработчик если успешно добавление сотрудника

    const result = await dispatch(addUser(FormData));

    if (addUser.fulfilled.match(result)) {
      setUpdateModalOpen(false);
      setAddModalOpen(false);
      setCurrentUser(null);

      dispatch(fetchUsers());
    }
  };

  const handleUpdateSuccess = async (FormData: UserFormData) => {
    // обработчик если успешно добавление сотрудника

    const result = await dispatch(updateUser(FormData));

    if (updateUser.fulfilled.match(result)) {
      setUpdateModalOpen(false);
      setAddModalOpen(false);
      setCurrentUser(null);

      dispatch(fetchUsers());
    }
  };

  const handleRemoveSuccess = async () => {
    // если удаление сотрудника происходит успешно

    if (currentUser) {
      const result = await dispatch(deleteUser(currentUser.id));
      if (deleteUser.fulfilled.match(result)) {
        setCurrentUser(null);
        setDeleteModalOpen(false);
        dispatch(fetchUsers());
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
    setCurrentUser(null);
    setAddModalOpen(false);
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="page">
      <div className="page__head">
        <h2 className="caption caption--h2">Каталоги</h2>
      </div>
      <div className="page__controls">
        <span
          className="btn btn--greenLight btn--add"
          onClick={() => onOpenModal("add")}
        >
          Добавить
        </span>
      </div>

      <div className="page__body">
        <div className="table">
          <div className="table__header">
            <div className="table__cell">ФИО</div>
            <div className="table__cell">Роль</div>
            <div className="table__cell">Объект</div>
            <div className="table__cell">Команда</div>
            <div className="table__cell">Логин</div>
            <div className="table__cell">Телефон</div>
            <div className="table__cell">Почта</div>
            <div className="table__cell">Активность</div>
            <div className="table__cell">Статус</div>
            <div className="table__cell"></div>
          </div>

          <div className="table__body">
            {DATA.map((user) => (
              <div className="table__row" key={user.id}>
                <div className="table__cell">{`${user.surname} ${user.name}`}</div>
                <div className="table__cell">{user.role}</div>
                <div className="table__cell">-</div>
                <div className="table__cell">
                  {user.team && user.team.length > 0
                    ? user.team.map((t: any) => t.name).join(", ")
                    : "-"}
                </div>
                <div className="table__cell">{user.login}</div>
                <div className="table__cell">{user.phone || "-"}</div>
                <div className="table__cell">{user.email}</div>
                <div className="table__cell">-</div>
                <div className="table__cell">OK</div>
                <div className="table__cell">
                  <span
                    className="icon-change"
                    onClick={() => {
                      setCurrentUser(user);
                      onOpenModal("edit");
                    }}
                  ></span>
                  <span
                    className="icon-delete"
                    onClick={() => {
                      setCurrentUser(user);
                      setDeleteModalOpen(true);
                    }}
                  ></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* попап на добавление сотрудника */}
      <Modal isOpen={isAddModalOpen} onClose={onCloseAddModal}>
        <UsersForm
          mode={isUpdateModalOpen ? "edit" : "add"}
          initialData={currentUser ? currentUser : null}
          onSuccess={isUpdateModalOpen ? handleUpdateSuccess : handleAddSuccess}
          onClose={onCloseAddModal}
        />
      </Modal>

      {/* попап на удаление сотрудника */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <PopupRemove
          loading={loading}
          onSuccess={handleRemoveSuccess}
          onClose={() => setDeleteModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default CatalogPage;
