export const ObjectPageItem = () => {
  return (
    <div className="object-page__item skeleton">
      <span className="object-page__caption">
        <div className="skeleton-line skeleton-line--medium"></div>
      </span>

      <div className="object-comands">
        {[...Array(4)].map((_, i) => (
          <div className="object-comands__item" key={i}>
            <span className="object-comands__name">
              <div className="skeleton-line skeleton-line--short"></div>
            </span>
            <span className="object-comands__count">
              <div className="skeleton-line skeleton-line--tiny"></div>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ObjectPageItemUsers = () => {
  return (
    <div className="object-page__item object-page__item--skeleton">
      <span className="object-page__caption">
        <div className="skeleton-caption skeleton-line"></div>
      </span>

      <ul className="object-user__list">
        {[...Array(4)].map((_, i) => (
          <li key={i} className="skeleton-user">
            <div className="skeleton-user-line skeleton-line"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};
