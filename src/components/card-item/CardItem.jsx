import { Link } from "react-router-dom";
import "./CardItem.scss";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function CardItem(props) {
  const state = props.state ? "reviews" : "news";

  const deletePost = async () => {
    const postDoc = doc(db, state, props.id);
    await deleteDoc(postDoc);
    props.deleteDataItem(props.id, props.state);
  };

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
      {props.isAdmin && (
        <div className="card-item__crud-buttons">
          <button className="card-item__delete-button" onClick={deletePost}>
            <img src="/images/icon-trash.svg" alt="" />
          </button>
          <button className="card-item__edit-button">
            <img src="/images/icon-edit.svg" alt="" />
          </button>
        </div>
      )}
    </li>
  );
}
