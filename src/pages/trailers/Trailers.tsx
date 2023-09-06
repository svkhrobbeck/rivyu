// style
import "./Trailers.scss";
// components
import { Card, Modal, ModalInner } from "@components/index";
import { Helmet } from "react-helmet";
// hooks
import { useEffect, useState, FC } from "react";
// store
import useUiStore from "@store/ui.store";

const Trailers: FC = (): JSX.Element => {
  const { setModal } = useUiStore();
  const [id, setId] = useState<string>("");
  const title = "Rostdan ham ushbu maqolani o'chirishni xohlaysizmi?";

  const handleDelete = () => {
    setModal(false);
  };

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <section className="trailers">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rivyu | Treylerlar</title>
      </Helmet>

      <h2 className="trailers__title main-title">Treylerlar</h2>
      {/* <ul className="trailers__list">
        {!!posts.length ? (
          posts.map(item => (
            <li className="trailers__item" key={item.id}>
              <Card {...item} click={() => setId(item.id)} />
            </li>
          ))
        ) : (
          <li style={{ textAlign: "center" }}>Treylerlar topilmadi</li>
        )}
      </ul> */}
      <Modal>
        <ModalInner title={title} func={handleDelete} />
      </Modal>
    </section>
  );
};

export default Trailers;
