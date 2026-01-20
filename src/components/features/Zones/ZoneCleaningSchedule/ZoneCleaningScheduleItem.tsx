interface Props {
  selectedBlock: {
    id: string;
    title: string;
    time: string;
    zone: string;
    zoneName: string;
    zoneNameFull: string;
    isLast?: boolean;
  };
}

const ZoneCleaningScheduleItem: React.FC<Props> = ({ selectedBlock }) => {
  return (
    <>
      <div className="zonePage__block">
        <div
          className={`zoneBlockInfo${selectedBlock.isLast ? " last" : ""} zoneBlockInfo--schedule`}
        >
          <span className="zoneBlockInfo__zonename">
            {selectedBlock.zoneName}
          </span>
          <span className="time"> {selectedBlock.time}</span>
          <span className="zoneBlockInfo__name">
            {selectedBlock.zoneNameFull}
          </span>
        </div>
      </div>

      <div className="zonePage__block__user">
        <span className="title">Ответственный:</span>
        <p className="name">Длинноеимя Длиннаяфамилия</p>
      </div>
    </>
  );
};

export default ZoneCleaningScheduleItem;
