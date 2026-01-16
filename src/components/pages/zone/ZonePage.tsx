import { useNavigate, useParams } from "react-router-dom";
// import notFoundImageLogo from "@/assets/img/logo-black.png";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";

import "./ZonePage.scss";
import { getZoneByID } from "@/store/slices/zonesSlice";

const ZonePage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentTaskID } = useAppSelector((state) => state.zones);
  // const { userInfo } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!id) return;

    let id_user = "34";
    let id_zone = id;

    dispatch(getZoneByID({ id_user, id_zone }));
  }, [id]);

  useEffect(() => {
    if (currentTaskID) {
      navigate(`http://localhost:8081/tasks/${currentTaskID}`);
    }
  }, [currentTaskID]);

  return <div></div>;
};

export default ZonePage;
