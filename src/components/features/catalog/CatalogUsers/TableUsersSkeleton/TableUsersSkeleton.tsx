import "./TableUsersSkeleton.scss";

const TableUsersSkeleton: React.FC = () => {
  return (
    <div className="table table--users">
      <div className="table__header skeleton">
        <div className="table__row skeleton">
          <div className="table__cell">
            <span className="skeleton__line skeleton__text" />
          </div>
          <div className="table__cell">
            <span className="skeleton__line skeleton__text" />
          </div>
          <div className="table__cell">
            <span className="skeleton__line skeleton__text" />
          </div>
          <div className="table__cell">
            <span className="skeleton__line skeleton__text" />
          </div>
          <div className="table__cell">
            <span className="skeleton__line skeleton__text" />
          </div>
          <div className="table__cell">
            <span className="skeleton__line skeleton__text" />
          </div>
          <div className="table__cell">
            <span className="skeleton__line skeleton__text" />
          </div>
          <div className="table__cell">
            <span className="skeleton__line skeleton__text" />
          </div>
          <div className="table__cell">
            <span className="skeleton__line skeleton__text" />
          </div>
          <div className="table__cell">
            <span className="skeleton__line skeleton__icon" />
          </div>
        </div>
      </div>

      <div className="table__body">
        {[...Array(5)].map((_, i) => (
          <div className="table__row skeleton" key={i}>
            <div className="table__cell">
              <span className="skeleton__line skeleton__text" />
            </div>
            <div className="table__cell">
              <span className="skeleton__line skeleton__text" />
            </div>
            <div className="table__cell">
              <span className="skeleton__line skeleton__text" />
            </div>
            <div className="table__cell">
              <span className="skeleton__line skeleton__text" />
            </div>
            <div className="table__cell">
              <span className="skeleton__line skeleton__text" />
            </div>
            <div className="table__cell">
              <span className="skeleton__line skeleton__text" />
            </div>
            <div className="table__cell">
              <span className="skeleton__line skeleton__text" />
            </div>
            <div className="table__cell">
              <span className="skeleton__line skeleton__text" />
            </div>
            <div className="table__cell">
              <span className="skeleton__line skeleton__text" />
            </div>
            <div className="table__cell">
              <span className="skeleton__line skeleton__icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableUsersSkeleton;
