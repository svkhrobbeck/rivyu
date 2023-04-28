import "./Cards.scss";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import { deleteObject, ref } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

export default function CardsList({ setData, isAdmin, data, state = false }) {
  const text = state ? "Tahlillar / Maqolalar" : "Yangiliklar";
  const stateText = state ? "reviews" : "news";
  document.title = `Kino Blog | ${text}`;

  console.log(data);

  const deletePost = async (id, state) => {
    const itemObj = data.find((item) => item.id === id);
    const desertRef = ref(storage, itemObj.image);
    deleteObject(desertRef)
      .then(() => {
        console.log("File deleted successfully");
        const postDoc = doc(db, stateText, id);
        deleteDoc(postDoc);
        setData(data);
      })
      .catch((error) => {
        console.log("Uh-oh, an error occurred!");
      });
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
                    <div className="card-item__times">
                      <time
                        className="card-item__time"
                        dateTime={item.createdAt}
                      >
                        {item.createdAt}
                      </time>
                      {item.lastEdited && (
                        <time
                          className="card-item__time card-item__time--edited"
                          dateTime={item.lastEdited}
                        >
                          {item.lastEdited}
                        </time>
                      )}
                    </div>
                  </div>
                  {isAdmin && (
                    <div className="card-item__buttons">
                      <button
                        className="card-item__button"
                        onClick={() => deletePost(item.id, state)}
                      >
                        <img src="/images/icon-trash.svg" alt="" />
                      </button>
                      <Link to={`/admin/edit-post/${stateText}/${item.id}`}>
                        <button className="card-item__button">
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
