import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/store";

import { logout } from "@/store/slices/authSlice";

import logo from "@/assets/img/logo-black.png";
import "./Header.scss";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const logountHandle = () => {
    dispatch(logout());
    navigate("/auth", { replace: true });
  };

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} alt="Logo" />
      </Link>
      <nav className="menu">
        <Link to="/" className="menu__link">
          Объекты
        </Link>
        <Link to="/" className="menu__link">
          Каталоги
        </Link>
        <Link to="/" className="menu__link">
          Планер
        </Link>
        <Link to="/" className="menu__link">
          Дашборд
        </Link>
        <Link to="/" className="menu__link">
          Обращения
        </Link>
        <Link to="/" className="menu__link">
          Рабочие документы
        </Link>
        <Link to="/" className="menu__link">
          Инспектор
        </Link>
        <Link to="/" className="menu__link">
          Обучение
        </Link>
      </nav>

      <div className="header-controls">
        <span className="link-logout" onClick={logountHandle}>
          Выход
        </span>
      </div>
    </header>
  );
};

export default Header;
