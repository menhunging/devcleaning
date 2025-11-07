import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useParams } from "react-router-dom";

import { getObjectById } from "@/store/slices/objectSlice";

// import "./ObjectsPage.scss";

const ObjectPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, data: obj } = useAppSelector((state) => state.object);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(getObjectById(id));
    }
  }, [id, dispatch]);

  if (loading || !obj) return <div>Загрузка...</div>;

  return (
    <div className="page">
      <div className="page__head">
        <h2 className="caption caption--h2">{obj.name}</h2>
      </div>
      <div className="page__body">123</div>
    </div>
  );
};

export default ObjectPage;
