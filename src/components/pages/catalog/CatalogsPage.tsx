import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";

import CatalogUsers from "@/components/features/catalog/CatalogUsers/CatalogUsers";
import CatalogTeams from "@/components/features/catalog/CatalogTeams/CatalogTeams";

import { fetchTeams } from "@/store/slices/teamsSlice";
import { fetchUsers } from "@/store/slices/usersSlice";
import { getObjects } from "@/store/slices/objectsSlice";

import "./CatalogsPage.scss";

const CatalogPage: React.FC = () => {
  const { loading: loadUsers, DATA: users } = useAppSelector(
    (state) => state.users
  );
  const { loading: loadTeams, DATA: teams } = useAppSelector(
    (state) => state.teams
  );

  const dispatch = useAppDispatch();

  const tabs = [
    {
      key: "users",
      name: "Сотрудники",
      count: users ? users.length : 0,
      desc: "кол-во файлов",
      component: <CatalogUsers />,
    },
    {
      key: "teams",
      name: "Команды",
      count: teams ? teams.length : 0,
      desc: "всего команд",
      component: <CatalogTeams />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].key);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTeams());
    dispatch(getObjects());
  }, [dispatch]);

  return (
    <>
      <div className="page page--catalog">
        <div className="page__head">
          <h2 className="caption caption--h2">Каталоги</h2>
        </div>

        <div className="catalog-menu">
          {tabs.map((tab) => (
            <div
              key={tab.key}
              className={`catalog-menu__item ${
                activeTab === tab.key ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="catalog-menu__name">{tab.name}</span>
              <span className="catalog-menu__count">
                {loadUsers || loadTeams ? (
                  <div className="skeleton-data"></div>
                ) : (
                  tab.count
                )}
                <span className="catalog-menu__desc">{tab.desc}</span>
              </span>
            </div>
          ))}
        </div>

        {tabs.find((tab) => tab.key === activeTab)?.component}
      </div>
    </>
  );
};

export default CatalogPage;
