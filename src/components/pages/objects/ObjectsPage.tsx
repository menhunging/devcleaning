import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";

import { getObjects } from "@/store/slices/objectsSlice";

import ObjectsList from "@/components/features/objects/ObjectsList/ObjectsList";

import "./ObjectsPage.scss";

const ObjectsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, DATA } = useAppSelector((state) => state.objects);

  useEffect(() => {
    dispatch(getObjects());
  }, [dispatch]);

  return (
    <div className="page">
      <div className="page__head">
        <h2 className="caption caption--h2">Объекты</h2>
      </div>
      <div className="page__controls">
        <span className="btn btn--greenLight btn--add">Добавить</span>
      </div>
      <div className="page__body">
        <ObjectsList objects={DATA} />
      </div>
    </div>
  );
};

export default ObjectsPage;
