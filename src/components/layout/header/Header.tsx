import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/store";

import { logout } from "@/store/slices/authSlice";

import logo from "@/assets/img/logo-black.png";
import "./Header.scss";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { userInfo } = useAppSelector((state) => state.auth);

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
        <NavLink
          to="/"
          className={({ isActive }) =>
            `menu__link menu__link--object ${isActive ? "active" : ""}`
          }
        >
          Объекты
        </NavLink>
        <NavLink to="/catalog" className="menu__link menu__link--catalog">
          Каталоги
        </NavLink>
        <Link to="/" className="menu__link menu__link--planer">
          Планер
        </Link>
        <Link to="/" className="menu__link menu__link--dashboard">
          Дашборд
        </Link>
        <Link to="/" className="menu__link menu__link--message">
          Обращения
        </Link>
        <Link to="/" className="menu__link menu__link--docs">
          Рабочие документы
        </Link>
        <Link to="/" className="menu__link menu__link--insp">
          Инспектор
        </Link>
        <Link to="/" className="menu__link menu__link--educat">
          Обучение
        </Link>
      </nav>

      <div className="header-controls">
        <div className="header-user-info">
          <span className="header-user-info__name">{userInfo.login}</span>
          <span className="header-user-info__project">intercleaning 1</span>
        </div>

        <div className="header-controls__menu">
          <ul>
            <li>
              <span className="link-logout" onClick={logountHandle}>
                Выход
              </span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
