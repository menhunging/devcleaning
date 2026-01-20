import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import logo from "@/assets/img/logo-black.png";
import "./ZonePage.scss";
import ZoneAppealSuccess from "@/components/features/Zones/ZoneAppealSuccess/ZoneAppealSuccess";
import ZoneCleaningScheduleItem from "@/components/features/Zones/ZoneCleaningSchedule/ZoneCleaningScheduleItem";
import ZoneAppealForm from "@/components/features/Zones/ZoneAppealForm/ZoneAppealForm";

interface CleaningBlock {
  id: string;
  title: string;
  time: string;
  zone: string;
  zoneName: string;
  zoneNameFull: string;
  isLast?: boolean;
}

const ZonePage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();

  const [isVisibleSchedule, setVisibleSchedule] = useState(false);
  const [isSuccessAppeals, setSuccessAppeals] = useState(false);
  const [isAppealFormVisible, setIsAppealFormVisible] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<CleaningBlock | null>(
    null,
  );

  useEffect(() => {
    if (!id) return;

    let id_zone = id;

    console.log("id_zone", id_zone);

    // dispatch(getZoneByID({ id_user, id_zone }));
  }, [id]);

  const currentDate = new Date().toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const cleaningBlocks: CleaningBlock[] = [
    {
      id: "1",
      title: "Последняя уборка",
      time: "09:30",
      zone: "Зона:",
      zoneName: "3 этаж, Офис № 34",
      zoneNameFull: "Уборка складского помещения",
      isLast: true,
    },
    {
      id: "2",
      title: "Следующая уборка",
      time: "10:30",
      zone: "Зона:",
      zoneName: "2 этаж, Офис № 33",
      zoneNameFull: "Уборка ",
    },
  ];

  const handleScheduleClick = () => {
    setVisibleSchedule(!isVisibleSchedule);
  };

  const handleBlockClick = (block: CleaningBlock) => {
    setSelectedBlock(block);
  };

  const handleBackClick = () => {
    setSelectedBlock(null);
  };

  const handleClickLike = () => {
    setSuccessAppeals(true);
  };

  const handleClickdislike = () => {
    setSuccessAppeals(true);
  };

  const handleAppealClick = () => {
    setIsAppealFormVisible(true);
  };

  const handleAppealSubmit = (data: {
    message: string;
    name: string;
    files?: FileList;
  }) => {
    console.log("Appeal submitted:", data);
    // Здесь будет логика отправки данных на сервер
    setIsAppealFormVisible(false);
    setSuccessAppeals(true);
  };

  return (
    <div className="zonePage">
      {isAppealFormVisible ? (
        <ZoneAppealForm onSubmit={handleAppealSubmit} onSuccess={() => {}} />
      ) : !isSuccessAppeals ? (
        <div className="zonePage__container">
          <div className="zonePage__logo">
            <img src={logo} alt="Logo" />
          </div>

          <div className="zonePage__date">{currentDate}</div>

          {selectedBlock ? (
            <>
              <div className="zonePage__back" onClick={handleBackClick}>
                <span className="zonePage__back-text">Назад</span>
              </div>
              <ZoneCleaningScheduleItem selectedBlock={selectedBlock} />
            </>
          ) : !isVisibleSchedule ? (
            <>
              <div
                className={"zonePage__schedule"}
                onClick={handleScheduleClick}
              >
                <span className="zonePage__schedule-text">График уборки</span>
                <span className="zonePage__schedule-arrow"></span>
              </div>

              <div className="zonePage__blocks">
                {cleaningBlocks.map((block) => (
                  <div
                    key={block.id}
                    className={`zonePage__block${block.isLast ? " last" : ""}`}
                    onClick={() => handleBlockClick(block)}
                  >
                    <div className="zonePage__block__head">
                      <span className="cap">{block.title}</span>
                      <span className="time">{block.time}</span>
                    </div>

                    <div className="zoneBlockInfo">
                      <span className="zoneBlockInfo__title">{block.zone}</span>
                      <span className="zoneBlockInfo__zonename">
                        {block.zoneName}
                      </span>
                      <span className="zoneBlockInfo__name">
                        {block.zoneNameFull}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="zonePage__reactions">
                <button
                  className="zonePage__reaction zonePage__reaction--like"
                  onClick={handleClickLike}
                >
                  <span className="like"></span>
                </button>
                <button
                  className="zonePage__reaction zonePage__reaction--dislike"
                  onClick={handleClickdislike}
                >
                  <span className="deslike"></span>
                </button>
              </div>

              <button
                className="btn btn--green zonePage__appeal"
                onClick={handleAppealClick}
              >
                Направить обращение
              </button>
            </>
          ) : (
            <>
              <div
                className="zonePage__back"
                onClick={() => {
                  setVisibleSchedule(false);
                }}
              >
                <span className="zonePage__back-text">Назад</span>
              </div>
              <div className="zonePage__blocks">
                <div className="zonePage__block check">
                  <div className="zoneBlockInfo zoneBlockInfo--schedule">
                    <span className="zoneBlockInfo__zonename">
                      3 этаж, Офис № 34
                    </span>
                    <span className="time">09:30</span>
                    <span className="zoneBlockInfo__name">
                      Уборка складского помещения
                    </span>
                  </div>
                </div>

                <div className="zonePage__block check">
                  <div className="zoneBlockInfo zoneBlockInfo--schedule">
                    <span className="zoneBlockInfo__zonename">
                      3 этаж, Офис № 34
                    </span>
                    <span className="time">09:30</span>
                    <span className="zoneBlockInfo__name">
                      Уборка складского помещения
                    </span>
                  </div>
                </div>

                <div className="zonePage__block">
                  <div className="zoneBlockInfo zoneBlockInfo--schedule">
                    <span className="zoneBlockInfo__zonename">
                      3 этаж, Офис № 34
                    </span>
                    <span className="time">10:30</span>
                    <span className="zoneBlockInfo__name">
                      Уборка складского помещения
                    </span>
                  </div>
                </div>

                <div className="zonePage__block">
                  <div className="zoneBlockInfo zoneBlockInfo--schedule">
                    <span className="zoneBlockInfo__zonename">
                      3 этаж, Офис № 34
                    </span>
                    <span className="time">10:30</span>
                    <span className="zoneBlockInfo__name">
                      Уборка складского помещения
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <ZoneAppealSuccess />
      )}
    </div>
  );
};

export default ZonePage;
