import "./ObjectsList.scss";

const ObjectSkeleton: React.FC = () => {
  return (
    <div className="object-item skeleton">
      <div className="picture-block skeleton__image" />
      <div className="object-item__content">
        <div className="skeleton__line skeleton__title" />
        <ul className="object-item__info">
          <li className="skeleton__line skeleton__info" />
          <li className="skeleton__line skeleton__info" />
          <li className="skeleton__line skeleton__info" />
        </ul>
      </div>
    </div>
  );
};

export default ObjectSkeleton;
