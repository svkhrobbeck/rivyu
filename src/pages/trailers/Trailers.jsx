// style
import { Link } from "react-router-dom";
import "./Trailers.scss";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Trailers() {
  const { state, _ } = useContext(Context);

  return (
    <section className="trailers">
      <h2 className="trailers__title main-title">Treylerlar</h2>
      <ul className="trailers__list">
        {state.data.trailers &&
          state.data.trailers.map((item) => (
            <li key={item.id} className="trailers__item item-trailers">
              <img
                className="item-trailers__img"
                src={
                  item.image
                    ? item.image
                    : "https://via.placeholder.com/320x180?text=Rasm+yuklanmadi"
                }
                alt="Ma'lumot havfsizligini ta'minlash (1-dars)"
                width={300}
              />
              <h3 className="item-trailers__heading">
                <Link
                  className="item-trailers__link"
                  to={`/trailers/${item.id}`}
                >
                  {item.title}
                </Link>
              </h3>
              <time
                className="item-trailers__time main-time"
                dateTime={item.createdAt}
              >
                {item.createdAt}
              </time>
            </li>
          ))}
      </ul>
    </section>
  );
}
