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
        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            `menu__link menu__link--catalog ${isActive ? "active" : ""}`
          }
        >
          Каталоги
        </NavLink>
        <NavLink
          to="/planer"
          className={({ isActive }) =>
            `menu__link menu__link--planer ${isActive ? "active" : ""}`
          }
        >
          Планер
        </NavLink>
        {/* TODO потом удаляем этот класс isTempDisabled , просто пока скрываем, потому что не делали в первом этапе */}
        <Link
          to="/"
          className="menu__link menu__link--dashboard isTempDisabled"
        >
          Дашборд
        </Link>
        <NavLink
          to="/appeals"
          className={({ isActive }) =>
            `menu__link menu__link--message ${isActive ? "active" : ""}`
          }
        >
          Обращения
        </NavLink>
        <Link to="/" className="menu__link menu__link--docs isTempDisabled">
          Рабочие документы
        </Link>
        <Link to="/" className="menu__link menu__link--insp isTempDisabled">
          Инспектор
        </Link>
        <Link to="/" className="menu__link menu__link--educat isTempDisabled">
          Обучение
        </Link>
      </nav>

      <div className="header-controls">
        <div className="header-user-info">
          <span className="header-user-info__name">{userInfo.login}</span>
          <span className="header-user-info__project">intercleaning</span>
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
