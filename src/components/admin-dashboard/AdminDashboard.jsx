import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../button/Button";
import "./AdminDashboard.scss";
import TagBadge from "../tag-badge/TagBadge";

export default function AdminDashboard() {
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const elTagInput = useRef(null);

  const handleAddTags = () => {
    if (!elTagInput.current.value || tags.length >= 6) return;
    const val = elTagInput.current.value.split(" ").join("").trim(" ");
    const newTags = [...tags, { value: val, id: uuidv4() }];
    setTags(newTags);
    elTagInput.current.value = "";
  };

  const handleDeleteTags = (id) => {
    const filteredTags = tags.filter((item) => item.id !== id);
    setTags(filteredTags);
  };

  return (
    <section className="admin-dashboard">
      <div className="container">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="admin-dashboard__form form-admin"
        >
          <h2 className="form-admin__title">Yangi Post Yaratish</h2>
          <div className="form-admin__fields">
            <label className="form-admin__label">
              <input
                className="form-admin__checkbox visually-hidden"
                type="checkbox"
                name="is_news"
                placeholder="sarlavha"
              />
              <span className="form-admin__fake-checkbox"></span>
              <span className="form-admin__label-inner">yangilik</span>
            </label>
          </div>
          {tags.length ? (
            <>
              <ul className="form-admin__tags">
                {tags &&
                  tags.map((item) => (
                    <li key={item.id} className="form-admin__tag">
                      <TagBadge
                        id={item.id}
                        handleDeleteTags={handleDeleteTags}
                      >
                        {item.value}
                      </TagBadge>
                    </li>
                  ))}
              </ul>
            </>
          ) : (
            ""
          )}
          <div className="form-admin__fields">
            <input
              className="form-admin__field form-admin__field--title"
              type="text"
              name="title"
              placeholder="sarlavha"
            />
            <input
              className="form-admin__field form-admin__field--short-desc"
              type="text"
              name="short_description"
              placeholder="qisqa izoh"
            />
          </div>
          <div className="form-admin__fields">
            <div className="form-admin__field-wrapper">
              <input
                className="form-admin__field form-admin__field--tag"
                type="text"
                name="tags"
                placeholder="teglar"
                ref={elTagInput}
              />
              <button
                onClick={handleAddTags}
                className="admin-form__tag-button"
                type="button"
              >
                Teg qo'shish
              </button>
            </div>
            <label className="form-admin__field form-admin__field--image-label">
              rasmni tanlang
              <input
                className="form-admin__field form-admin__field--image visually-hidden"
                type="file"
                name="image"
                placeholder="post rasmi"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          </div>
          <div className="form-admin__fields">
            <textarea
              className="form-admin__textarea"
              name="description"
              placeholder="izoh"
            ></textarea>
            <img
              className="form-admin__img"
              src={
                image ? URL.createObjectURL(image) : "/images/temp-image.svg"
              }
              alt=""
            />
          </div>
          <div className="form-admin__buttons">
            <Button>Bekor Qilish</Button>
            <Button state={false} type="submit">
              Yaratish
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
