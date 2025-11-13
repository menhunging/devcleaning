import "./TeamsListSkeleton.scss";

const TeamsListSkeleton: React.FC = () => {
  return (
    <div className="teams-list">
      {[...Array(4)].map((_, i) => (
        <div className="teams-list__item skeleton" key={i}>
          <div className="teams-list__head">
            <span className="skeleton__line skeleton__title" />
            <div className="teams-list__controls">
              <span className="skeleton__line skeleton__icon" />
              <span className="skeleton__line skeleton__icon" />
            </div>
          </div>

          <div className="teams-list__body">
            <span className="skeleton__line skeleton__object" />
            <span className="skeleton__line skeleton__desc" />
            <div className="teams-list__count">
              <span className="skeleton__line skeleton__count" />
              <span className="skeleton__line skeleton__text" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamsListSkeleton;
