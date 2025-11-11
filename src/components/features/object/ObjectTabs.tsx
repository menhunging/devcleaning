import testImageJpg from "@/assets/img/test-images.jpg";

import { useState } from "react";
import "./ObjectTabs.scss";
import SwiperSlider from "@/components/shared/ui/Swiper/SwiperSlider";
import Zones from "../Zones/Zones/Zones";

const images = [
  testImageJpg,
  testImageJpg,
  testImageJpg,
  testImageJpg,
  testImageJpg,
  testImageJpg,
  testImageJpg,
  testImageJpg,
  testImageJpg,
  testImageJpg,
  testImageJpg,
];

const ObjectTabs = () => {
  const [activeTab, setActiveTab] = useState<"objects" | "zones">("objects");

  return (
    <div className="objectTabs">
      {/* Навигация */}
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

      {/* Контент */}
      {activeTab === "objects" && (
        <div className="objectTabs__panel">
          <div className="object-page__list">
            <div className="object-page__item">
              <span className="object-page__caption">
                Команды по объекту <span className="object-page__desc">3</span>
              </span>

              <div className="object-comands">
                <div className="object-comands__item">
                  <span className="object-comands__name">УГПХ-1</span>

                  <span className="object-comands__count">
                    5 <span className="object-comands__all">/ 5</span>
                  </span>
                </div>

                <div className="object-comands__item">
                  <span className="object-comands__name">УГПХ-1</span>

                  <span className="object-comands__count">
                    2 <span className="object-comands__all">/ 2</span>
                  </span>
                </div>

                <div className="object-comands__item">
                  <span className="object-comands__name">УГПХ-1</span>

                  <span className="object-comands__count">
                    3 <span className="object-comands__all">/ 3</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="object-page__item">
              <span className="object-page__caption">
                Сотрудники по объекту
              </span>

              <ul className="object-user__list">
                <li>Длинноеимя Длиннаяфамилия</li>
                <li>Длинноеимя Длиннаяфамилия</li>
                <li>Длинноеимя Длиннаяфамилия</li>
              </ul>
            </div>

            <div className="object-page__item">
              <span className="object-page__caption">
                Последние обращения
                <span className="object-page__desc">10</span>
              </span>

              <div className="object-requests">
                <div className="object-requests__item">
                  <span className="object-requests__name">
                    Корпус 7, этаж 1 - санузел
                  </span>
                  <span className="object-requests__date">15.05.25</span>
                  <span className="object-requests__work">Уборка санузла</span>
                  <span className="object-requests__status">В работе</span>
                </div>
              </div>
            </div>

            <div className="object-page__item">
              <span className="object-page__caption">Нарушения</span>

              <div className="object-requests">
                <div className="object-requests__item">
                  <span className="object-requests__name">
                    Корпус 7, этаж 1 - санузел
                  </span>
                  <span className="object-requests__date">15.05.25</span>
                  <span className="object-requests__work">Уборка санузла</span>
                  <span className="object-requests__status pass">Пропуск</span>
                </div>
              </div>
            </div>

            <div className="object-page__item object-page__item--gallery object-page__item--full">
              <span className="object-page__caption">
                Галерея
                <span className="object-page__desc">10</span>
              </span>

              <SwiperSlider images={images} slidesPerView={8} />
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
