import { useState } from "react";

import type { ObjectItem } from "@/types/objects/objects";

import SwiperSlider from "@/components/shared/ui/Swiper/SwiperSlider";
import Zones from "../Zones/Zones/Zones";

import { ObjectPageItem, ObjectPageItemUsers } from "./ObjectTabsSkeleton";

import "./ObjectTabs.scss";

interface ObjectTabsProps {
  loading: boolean;
  obj: ObjectItem | null;
}

const ObjectTabs = ({ loading, obj }: ObjectTabsProps) => {
  const [activeTab, setActiveTab] = useState<"objects" | "zones">("objects");

  const galleryImages =
    obj?.gallery?.map(
      (item) => `${import.meta.env.VITE_API_BASE_URL}${item.photo}`
    ) ?? [];

  return (
    <div className="objectTabs">
      <div className="objectTabs__nav">
        <button
          className={`objectTabs__btn ${
            activeTab === "objects" ? "is-active" : ""
          }`}
          onClick={() => setActiveTab("objects")}
        >
          Объекты
        </button>
        <button
          className={`objectTabs__btn ${
            activeTab === "zones" ? "is-active" : ""
          }`}
          onClick={() => setActiveTab("zones")}
        >
          Зоны
        </button>
      </div>

      {activeTab === "objects" && (
        <div className="objectTabs__panel">
          <div className="object-page__list">
            {loading ? (
              <ObjectPageItem />
            ) : (
              <div className="object-page__item">
                <span className="object-page__caption">
                  Команды по объекту
                  <span className="object-page__desc">
                    {obj?.teams?.length ?? 0}
                  </span>
                </span>

                <div className="object-comands">
                  {obj?.teams && obj.teams.length > 0 ? (
                    obj.teams.map((objItem) => (
                      <div className="object-comands__item" key={objItem.id}>
                        <span className="object-comands__name">
                          {objItem.name}
                        </span>

                        <span className="object-comands__count">
                          {objItem.users.length > 0 && (
                            <>
                              {objItem.users.length}
                              <span className="object-comands__all">
                                / {objItem.users.length}
                              </span>
                            </>
                          )}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="empty-text">Здесь ничего нет </div>
                  )}
                </div>
              </div>
            )}
            {loading ? (
              <ObjectPageItemUsers />
            ) : (
              <div className="object-page__item">
                <span className="object-page__caption">
                  Сотрудники по объекту:
                </span>

                <ul className="object-user__list">
                  {!obj?.users?.length ? (
                    <div className="empty-text">Здесь ничего нет </div>
                  ) : (
                    obj?.users?.map((user, index) => (
                      <li key={`${user.id_user}-${index}`}>
                        {`${user.name} ${user.surname}`}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}

            {loading ? (
              <ObjectPageItem />
            ) : (
              <div className="object-page__item">
                <span className="object-page__caption">
                  Последние обращения
                  <span className="object-page__desc">
                    {obj?.appeal?.length || 0}
                  </span>
                </span>
                {obj?.appeal?.length ? (
                  <div className="object-requests">
                    {obj?.appeal.map((appealItem) => {
                      return (
                        <div
                          className="object-requests__item"
                          key={appealItem.id}
                        >
                          <span className="object-requests__name">
                            {appealItem.name_zone}
                          </span>
                          <span className="object-requests__date">
                            {/* просто преобразуем в наш формат дату */}
                            {new Date(
                              appealItem.date_create.replace(" ", "T")
                            ).toLocaleDateString("ru-RU", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            })}
                          </span>
                          <span className="object-requests__work">
                            {appealItem.message}
                          </span>
                          <span className="object-requests__status">
                            {appealItem.status_success === 0
                              ? "В работе"
                              : "Выполнено"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="empty-text">Здесь ничего нет </div>
                )}
              </div>
            )}

            {loading ? (
              <ObjectPageItem />
            ) : (
              <div className="object-page__item">
                <span className="object-page__caption">Нарушения</span>

                <div className="empty-text">Здесь ничего нет </div>
              </div>
            )}

            <div className="object-page__item object-page__item--gallery object-page__item--full">
              <span className="object-page__caption">
                Галерея
                <span className="object-page__desc">
                  {galleryImages.length}
                </span>
              </span>

              {galleryImages.length > 0 ? (
                <SwiperSlider images={galleryImages} slidesPerView={8} />
              ) : (
                <span className="empty-text">Пока в обьекте нет фото</span>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "zones" && (
        <div className="objectTabs__panel">
          <Zones />
        </div>
      )}
    </div>
  );
};

export default ObjectTabs;
