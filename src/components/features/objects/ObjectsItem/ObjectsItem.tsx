// import testImageJpg from "@/assets/img/test-images.jpg";
// import testImageWebp from "@/assets/img/test-images.webp";

import { getFullPhotoUrl } from "@/utils/getFullPhotoUrl";

import type { ObjectItem } from "@/types/objects";

import "./ObjectsItem.scss";

interface ObjectsListProps {
  objects: ObjectItem[];
}

const ObjectsItem: React.FC<ObjectsListProps> = ({ objects }) => {
  return <div className="object-item"></div>;
};

export default ObjectsItem;
