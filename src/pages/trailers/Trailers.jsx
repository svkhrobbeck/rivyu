// style
import "./Trailers.scss";

import { Card, Modal, ModalInner } from "../../components";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Helmet } from "react-helmet";

const Trailers = () => {
  const [id, setId] = useState("");
  const title = "Rostdan ham ushbu maqolani o'chirishni xohlaysizmi?";

  const handleTrailerDelete = () => {
    const postDoc = doc(db, "trailers", id);
    deleteDoc(postDoc);
    dispatch({ type: "MODAL_CLOSE" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="trailers">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rivyu | Treylerlar</title>
      </Helmet>
      <h2 className="trailers__title main-title">Treylerlar</h2>
      <ul className="trailers__list">
        {!!!state.arr?.length && <li style={{ textAlign: "center" }}>Treylerlar topilmadi</li>}
        {!!state.data?.trailers?.length &&
          state.data?.trailers.map(item => (
            <li className="trailers__item" key={item.id}>
              <Card {...item} setId={setId} />
            </li>
          ))}
      </ul>

      <Modal>
        <ModalInner title={title} func={handleTrailerDelete} />
      </Modal>
    </section>
  );
};

export default Trailers;
