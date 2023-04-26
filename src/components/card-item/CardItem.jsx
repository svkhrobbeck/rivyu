import { Link } from "react-router-dom";
import "./CardItem.scss";

export default function CardItem(props) {
  const state = props.state ? "reviews" : "news";
  return (
    <li className="card-item">
      <img
        className="card-item__image"
        src={props.image}
        alt={props.title}
        width="246"
      />
      <div className="card-item__content">
        <h3 className="card-item__title">
          <Link to={`/${state}/${props.id}`}>{props.title}</Link>
        </h3>
        <p className="card-item__desc">{props.shortDesc}</p>
        <time className="card-item__time" dateTime={props.createdAt}>
          {props.createdAt}
        </time>
      </div>
    </li>
  );
}
