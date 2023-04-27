import "./Cards.scss";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Link } from "react-router-dom";

export default function CardsList({
  deleteDataItem,
  isAdmin,
  data,
  state = false,
}) {
  const text = state ? "Tahlillar / Maqolalar" : "Yangiliklar";
  const stateText = state ? "reviews" : "news";
  document.title = `Kino Blog | ${text}`;

  const deletePost = async (id, state) => {
    const postDoc = doc(db, stateText, id);
    await deleteDoc(postDoc);
    deleteDataItem(id, state);
  };

  return (
    <section className="cards">
      <div className="container">
        <div className="cards__inner">
          <h2 className="cards__title">{text}</h2>
          <ul className="cards-list">
            {data &&
              data.map((item) => (
                <li key={item.id} className="card-item">
                  <img
                    className="card-item__image"
                    src={item.image}
                    alt={item.title}
                    width="246"
                  />
                  <div className="card-item__content">
                    <h3 className="card-item__title">
                      <Link to={`/${stateText}/${item.id}`}>{item.title}</Link>
                    </h3>
                    <p className="card-item__desc">{item.shortDesc}</p>
                    <time className="card-item__time" dateTime={item.createdAt}>
                      {item.createdAt}
                    </time>
                  </div>
                  {isAdmin && (
                    <div className="card-item__crud-buttons">
                      <button
                        className="card-item__delete-button"
                        onClick={() => deletePost(item.id, state)}
                      >
                        <img src="/images/icon-trash.svg" alt="" />
                      </button>
                      <Link to={`/admin/edit-post/${stateText}/${item.id}`}>
                        <button className="card-item__edit-button">
                          <img src="/images/icon-edit.svg" alt="" />
                        </button>
                      </Link>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
