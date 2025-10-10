import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/store/store";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // if (loading) return <div className="preloader">Загрузка...</div>;

  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
