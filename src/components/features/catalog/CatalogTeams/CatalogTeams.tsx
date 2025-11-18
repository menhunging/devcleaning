import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";

import type { TeamsFormData } from "@/types/teams/teams";

import Modal from "@/components/shared/ui/Modal/Modal";
import PopupRemove from "@/components/shared/ui/PopupRemove/PopupRemove";
import TeamsForm from "../../teams/TeamsForm";
import TeamsListSkeleton from "./TeamsListSkeleton/TeamsListSkeleton";

import { fetchUsers } from "@/store/slices/usersSlice";

import {
  addTeam,
  deleteTeam,
  updateTeam,
  fetchTeams,
} from "@/store/slices/teamsSlice";

import "./CatalogTeams.scss";

const CatalogTeams: React.FC = () => {
  const { DATA: users } = useAppSelector((state) => state.users);
  const { DATA: objects } = useAppSelector((state) => state.objects);
  const { DATA: teams, loading } = useAppSelector((state) => state.teams);
  const dispatch = useAppDispatch();

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [currentTeam, setCurrentTeam] = useState<TeamsFormData | null>(null);

  const handleAddSuccess = async (FormData: TeamsFormData) => {
    // обработчик если успешно добавление команды

    setAddModalOpen(false);
    setUpdateModalOpen(false);

    const result = await dispatch(addTeam(FormData));

    if (addTeam.fulfilled.match(result)) {
      setCurrentTeam(null);

      dispatch(fetchTeams());
      dispatch(fetchUsers());
    }
  };

  const handleUpdateSuccess = async (FormData: TeamsFormData) => {
    // обработчик если успешно добавление команды

    setAddModalOpen(false);
    setUpdateModalOpen(false);

    const result = await dispatch(updateTeam(FormData));

    if (updateTeam.fulfilled.match(result)) {
      setCurrentTeam(null);

      dispatch(fetchTeams());
      dispatch(fetchUsers());
    }
  };

  const handleRemoveSuccess = async () => {
    // если удаление команды происходит успешно

    setDeleteModalOpen(false);

    if (currentTeam) {
      const result = await dispatch(deleteTeam(currentTeam.id));
      if (deleteTeam.fulfilled.match(result)) {
        setCurrentTeam(null);

        dispatch(fetchTeams());
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
    setCurrentTeam(null);
    setAddModalOpen(false);
  };

  // useEffect(() => {
  //   dispatch(fetchTeams());

  //   if (!objects.length) {
  //     dispatch(getObjects());
  //   }
  // }, []);

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
          <TeamsListSkeleton />
        ) : (
          <>
            {!teams ? (
              <div className="empty-text">Здесь ничего нет</div>
            ) : (
              <div className="teams-list">
                {teams.map((team) => {
                  let objectName = "";

                  if (Array.isArray(team.object) && team.object.length > 0) {
                    objectName = team.object[0].name;
                  } else {
                    objectName = "Нет объекта";
                  }

                  return (
                    <div className="teams-list__item" key={team.id}>
                      <div className="teams-list__head">
                        <span className="teams-list__title">{team.name}</span>
                        <div className="teams-list__controls">
                          <span
                            className="icon-change"
                            onClick={() => {
                              setCurrentTeam(team);
                              onOpenModal("edit");
                            }}
                          ></span>
                          <span
                            className="icon-delete"
                            onClick={() => {
                              setCurrentTeam(team);
                              setDeleteModalOpen(true);
                            }}
                          ></span>
                        </div>
                      </div>

                      <div className="teams-list__body">
                        <span className="teams-list__object">{objectName}</span>
                        <span className="teams-list__desc">
                          {team.description}
                        </span>

                        <div className="teams-list__count">
                          <span className="count">
                            {team.users ? team.users.length : 0}
                          </span>
                          <span>сотрудники</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* попап на добавление и редактирование команды */}
      <Modal isOpen={isAddModalOpen} onClose={onCloseAddModal}>
        <TeamsForm
          mode={isUpdateModalOpen ? "edit" : "add"}
          initialData={currentTeam ? currentTeam : null}
          objects={objects}
          users={users}
          onSuccess={isUpdateModalOpen ? handleUpdateSuccess : handleAddSuccess}
          onClose={onCloseAddModal}
        />
      </Modal>

      {/* попап на удаление команды */}
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
    </>
  );
};

export default CatalogTeams;
