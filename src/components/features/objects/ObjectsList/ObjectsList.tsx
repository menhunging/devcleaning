// import testImageJpg from "@/assets/img/test-images.jpg";
// import testImageWebp from "@/assets/img/test-images.webp";
import { Link } from "react-router-dom";

import { getFullPhotoUrl } from "@/utils/getFullPhotoUrl";

import type { ObjectItem } from "@/types/objects/objects";

import ObjectSkeleton from "./ObjectsListSkeleton";

import "./ObjectsList.scss";

interface ObjectsListProps {
  objects: ObjectItem[];
  loading?: boolean;
}

const ObjectsList: React.FC<ObjectsListProps> = ({ loading, objects }) => {
  if (loading) {
    return (
      <div className="object-list">
        {Array.from({ length: 8 }).map((_, i) => (
          <ObjectSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="object-list">
      {objects.map((object) => {
        const { id, name, photo, zones_count, tasks_count, users_count } =
          object;

        return (
          <Link to={`/${id}`} className="object-item" key={id}>
            <div className="picture-block">
              <picture>
                {/* <source type="image/webp" srcSet={testImageWebp} /> */}
                <img src={getFullPhotoUrl(photo)} alt={name} />
              </picture>
            </div>
            <div className="object-item__content">
              <span className="object-item__name caption--h4">{name}</span>
              <ul className="object-item__info">
                <li>
                  <span className="object-item__bl">
                    <span>зоны</span>
                    <strong>{zones_count}</strong>
                  </span>
                </li>
                <li>
                  <span className="object-item__bl">
                    <span>задания:</span>
                    <strong>{tasks_count}</strong>
                  </span>
                </li>
                <li>
                  <span className="object-item__bl">
                    <span>сотрудники:</span>
                    <strong>{users_count}</strong>
                  </span>
                </li>
              </ul>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ObjectsList;
