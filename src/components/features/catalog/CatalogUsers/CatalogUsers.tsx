import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";

import type { UserFormData } from "@/types/users/users";

import { getFormateDate } from "@/utils/getFormateDate";
import { getObjectNameByID } from "@/utils/getObjectNameByID";

import Modal from "@/components/shared/ui/Modal/Modal";
import UsersForm from "@/components/features/users/UsersForm/UsersForm";
import TableUsersSkeleton from "./TableUsersSkeleton/TableUsersSkeleton";
import { getRoleName } from "@/utils/getFoleName";
// import PopupRemove from "@/components/shared/ui/PopupRemove/PopupRemove";

import { getObjects } from "@/store/slices/objectsSlice";

import {
  addUser,
  // deleteUser,
  fetchUsers,
  updateUser,
} from "@/store/slices/usersSlice";

import "./CatalogUsers.scss";

const CatalogUsers: React.FC = () => {
  const { DATA: teams } = useAppSelector((state) => state.teams);
  const { DATA: objects } = useAppSelector((state) => state.objects);
  const { DATA: users, loading } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  // const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState<UserFormData | null>(null);

  const handleAddSuccess = async (FormData: UserFormData) => {
    // обработчик если успешно добавление сотрудника

    setUpdateModalOpen(false);
    setAddModalOpen(false);

    const result = await dispatch(addUser(FormData));

    if (addUser.fulfilled.match(result)) {
      setCurrentUser(null);
      dispatch(fetchUsers());
    }
  };

  const handleUpdateSuccess = async (FormData: UserFormData) => {
    // обработчик если успешно добавление сотрудника

    setUpdateModalOpen(false);
    setAddModalOpen(false);

    const result = await dispatch(updateUser(FormData));

    if (updateUser.fulfilled.match(result)) {
      setCurrentUser(null);
      dispatch(fetchUsers());
    }
  };

  // const handleRemoveSuccess = async () => {
  //   // если удаление сотрудника происходит успешно

  //   if (currentUser) {
  //     const result = await dispatch(deleteUser(currentUser.id));
  //     if (deleteUser.fulfilled.match(result)) {
  //       setCurrentUser(null);
  //       setDeleteModalOpen(false);
  //       dispatch(fetchUsers());
  //     }
  //   }
  // };

  const onOpenModal = (mode?: string) => {
    if (mode === "edit") {
      setUpdateModalOpen(true);
      setAddModalOpen(true);
    } else {
      setUpdateModalOpen(false);
      setAddModalOpen(true);
    }

    if (!objects.length) {
      dispatch(getObjects());
    }
  };

  const onCloseAddModal = () => {
    setCurrentUser(null);
    setAddModalOpen(false);
  };

  return (
    <>
      <div className="page__controls">
        <span
          className="btn btn--greenLight btn--add"
          onClick={() => onOpenModal("add")}
        >
          Добавить
        </span>
      </div>

      <div className="page__body">
        {loading ? (
          <TableUsersSkeleton />
        ) : (
          <div className="table table--users">
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
              {users.map((user) => (
                <div className="table__row" key={user.id}>
                  <div className="table__cell">{`${user.surname} ${user.name}`}</div>
                  <div className="table__cell">
                    <span className="table--users__role">
                      {getRoleName(user.role)}
                    </span>
                  </div>

                  <div className="table__cell">
                    {user.id_object
                      ? getObjectNameByID(objects, user.id_object)
                      : "-"}
                  </div>

                  <div className="table__cell">
                    {user.team && user.team.length > 0
                      ? user.team.map((t: any) => t.name).join(", ")
                      : "-"}
                  </div>
                  <div className="table__cell">
                    <span className="table--users__login">{user.login}</span>
                  </div>
                  <div className="table__cell">
                    {user.phone || "+79999999999"}
                  </div>
                  <div className="table__cell">{user.email}</div>
                  <div className="table__cell">
                    <span className="activity">
                      {getFormateDate(user.last_active_date)}
                    </span>
                  </div>
                  <div className="table__cell">
                    <span className="status status--active">Активен</span>
                    {/* <span className="status status--notactive">Не активен</span> */}
                  </div>
                  <div className="table__cell">
                    <div className="icons-controls">
                      <span
                        className="icon-change"
                        onClick={() => {
                          setCurrentUser(user);
                          onOpenModal("edit");
                        }}
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
              ))}
            </div>
          </div>
        )}
      </div>

      {/* попап на добавление сотрудника */}
      <Modal isOpen={isAddModalOpen} onClose={onCloseAddModal}>
        <UsersForm
          mode={isUpdateModalOpen ? "edit" : "add"}
          initialData={currentUser ? currentUser : null}
          objects={objects}
          teams={teams}
          onSuccess={isUpdateModalOpen ? handleUpdateSuccess : handleAddSuccess}
          onClose={onCloseAddModal}
        />
      </Modal>

      {/* попап на удаление сотрудника */}
      {/* <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <PopupRemove
          loading={loading}
          onSuccess={handleRemoveSuccess}
          onClose={() => setDeleteModalOpen(false)}
        />
      </Modal> */}
    </>
  );
};

export default CatalogUsers;
