import "./NotFoundPage.scss";

const NotFoundPage: React.FC = () => {
  return (
    <div className="NotPage">
      <a href="/" data-discover="true">
        <img alt="Logo" src="/src/assets/img/logo-black.png" />
      </a>
      <span className="NotPage__caption">404</span>
      <p>Страница не найдена или находится в разработке</p>
    </div>
  );
};

export default NotFoundPage;
