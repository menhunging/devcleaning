// import testImageJpg from "@/assets/img/test-images.jpg";
// import testImageWebp from "@/assets/img/test-images.webp";

import { getFullPhotoUrl } from "@/utils/getFullPhotoUrl";

import type { ObjectItem } from "@/types/objects";

import "./ObjectsList.scss";

interface ObjectsListProps {
  objects: ObjectItem[];
}

const ObjectsList: React.FC<ObjectsListProps> = ({ objects }) => {
  return (
    <div className="object-list">
      {objects.map((object) => {
        const {
          id,
          name,
          photo,
          //   adress,
          //   contacts,
          zones,
          tasks,
          users,
          //   manager,
        } = object;

        return (
          <div className="object-item" key={id}>
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
                    <strong>{zones}</strong>
                  </span>
                </li>
                <li>
                  <span className="object-item__bl">
                    <span>задания:</span>
                    <strong>{tasks}</strong>
                  </span>
                </li>
                <li>
                  <span className="object-item__bl">
                    <span>сотрудники:</span>
                    <strong>{users}</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ObjectsList;
