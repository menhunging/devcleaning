import "./AppealsPageSkeleton.scss";

const AppealsPageSkeleton = () => {
  return (
    <div className="table table--appeals table--skeleton">
      <div className="table__body">
        {[...Array(5)].map((_, i) => (
          <div className="table__row skeleton-row" key={i}>
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
              <span className="skeleton__line skeleton__date" />
            </div>
            <div className="table__cell">
              <span className="skeleton__line skeleton__time" />
            </div>
            <div className="table__cell">
              <span className="skeleton__line skeleton__number" />
            </div>
            <div className="table__cell">
              <span className="skeleton__line skeleton__status" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppealsPageSkeleton;
