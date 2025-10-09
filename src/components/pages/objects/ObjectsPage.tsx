import testImageJpg from "@/assets/img/test-images.jpg";
import testImageWebp from "@/assets/img/test-images.webp";

import "./ObjectsPage.scss";

const HomePage: React.FC = () => {
  return (
    <div className="page">
      <div className="page__head">
        <h2 className="caption caption--h2">Объекты</h2>
      </div>
      <div className="page__controls">
        <span className="btn btn--green btn--add">Добавить</span>
      </div>
      <div className="page__body">
        <div className="object-list">
          <div className="object-item">
            <div className="picture-block">
              <picture>
                <source type="image/webp" srcSet={testImageWebp} />
                <img src={testImageJpg} alt="" />
              </picture>
            </div>
            <div className="object-item__content">
              <span className="object-item__name caption--h4">
                ТЦ “Балтийский”
              </span>
              <ul className="object-item__info">
                <li>
                  <span className="object-item__bl">
                    <span>зоны</span>
                    <strong>5</strong>
                  </span>
                </li>
                <li>
                  <span className="object-item__bl">
                    <span>задания:</span>
                    <strong>23</strong>
                  </span>
                </li>
                <li>
                  <span className="object-item__bl">
                    <span>сотрудники:</span>
                    <strong>4</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="object-item">
            <div className="picture-block">
              <picture>
                <source type="image/webp" srcSet={testImageWebp} />
                <img src={testImageJpg} alt="" />
              </picture>
            </div>
            <div className="object-item__content">
              <span className="object-item__name caption--h4">
                ТЦ “Балтийский”
              </span>
              <ul className="object-item__info">
                <li>
                  <span className="object-item__bl">
                    <span>зоны</span>
                    <strong>99</strong>
                  </span>
                </li>
                <li>
                  <span className="object-item__bl">
                    <span>задания:</span>
                    <strong>999</strong>
                  </span>
                </li>
                <li>
                  <span className="object-item__bl">
                    <span>сотрудники:</span>
                    <strong>1200</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="object-item">
            <div className="picture-block">
              <picture>
                <source type="image/webp" srcSet={testImageWebp} />
                <img src={testImageJpg} alt="" />
              </picture>
            </div>
            <div className="object-item__content">
              <span className="object-item__name caption--h4">
                ТЦ “Балтийский”
              </span>
              <ul className="object-item__info">
                <li>
                  <span className="object-item__bl">
                    <span>зоны</span>
                    <strong>5</strong>
                  </span>
                </li>
                <li>
                  <span className="object-item__bl">
                    <span>задания:</span>
                    <strong>23</strong>
                  </span>
                </li>
                <li>
                  <span className="object-item__bl">
                    <span>сотрудники:</span>
                    <strong>4</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="object-item">
            <div className="picture-block">
              <picture>
                <source type="image/webp" srcSet={testImageWebp} />
                <img src={testImageJpg} alt="" />
              </picture>
            </div>
            <div className="object-item__content">
              <span className="object-item__name caption--h4">
                ТЦ “Балтийский”
              </span>
              <ul className="object-item__info">
                <li>
                  <span className="object-item__bl">
                    <span>зоны</span>
                    <strong>5</strong>
                  </span>
                </li>
                <li>
                  <span className="object-item__bl">
                    <span>задания:</span>
                    <strong>23</strong>
                  </span>
                </li>
                <li>
                  <span className="object-item__bl">
                    <span>сотрудники:</span>
                    <strong>4</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="object-item">
            <div className="picture-block">
              <picture>
                <source type="image/webp" srcSet={testImageWebp} />
                <img src={testImageJpg} alt="" />
              </picture>
            </div>
            <div className="object-item__content">
              <span className="object-item__name caption--h4">
                ТЦ “Балтийский”
              </span>
              <ul className="object-item__info">
                <li>
                  <span className="object-item__bl">
                    <span>зоны</span>
                    <strong>5</strong>
                  </span>
                </li>
                <li>
                  <span className="object-item__bl">
                    <span>задания:</span>
                    <strong>23</strong>
                  </span>
                </li>
                <li>
                  <span className="object-item__bl">
                    <span>сотрудники:</span>
                    <strong>4</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="object-item">
            <div className="picture-block">
              <picture>
                <source type="image/webp" srcSet={testImageWebp} />
                <img src={testImageJpg} alt="" />
              </picture>
            </div>
            <div className="object-item__content">
              <span className="object-item__name caption--h4">
                ТЦ “Балтийский”
              </span>
              <ul className="object-item__info">
                <li>
                  <span className="object-item__bl">
                    <span>зоны</span>
                    <strong>5</strong>
                  </span>
                </li>
                <li>
                  <span className="object-item__bl">
                    <span>задания:</span>
                    <strong>23</strong>
                  </span>
                </li>
                <li>
                  <span className="object-item__bl">
                    <span>сотрудники:</span>
                    <strong>4</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="object-item">
            <div className="picture-block">
              <picture>
                <source type="image/webp" srcSet={testImageWebp} />
                <img src={testImageJpg} alt="" />
              </picture>
            </div>
            <div className="object-item__content">
              <span className="object-item__name caption--h4">
                ТЦ “Балтийский”
              </span>
              <ul className="object-item__info">
                <li>
                  <span className="object-item__bl">
                    <span>зоны</span>
                    <strong>5</strong>
                  </span>
                </li>
                <li>
                  <span className="object-item__bl">
                    <span>задания:</span>
                    <strong>23</strong>
                  </span>
                </li>
                <li>
                  <span className="object-item__bl">
                    <span>сотрудники:</span>
                    <strong>4</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="object-item">
            <div className="picture-block">
              <picture>
                <source type="image/webp" srcSet={testImageWebp} />
                <img src={testImageJpg} alt="" />
              </picture>
            </div>
            <div className="object-item__content">
              <span className="object-item__name caption--h4">
                ТЦ “Балтийский”
              </span>
              <ul className="object-item__info">
                <li>
                  <span className="object-item__bl">
                    <span>зоны</span>
                    <strong>5</strong>
                  </span>
                </li>
                <li>
                  <span className="object-item__bl">
                    <span>задания:</span>
                    <strong>23</strong>
                  </span>
                </li>
                <li>
                  <span className="object-item__bl">
                    <span>сотрудники:</span>
                    <strong>4</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
