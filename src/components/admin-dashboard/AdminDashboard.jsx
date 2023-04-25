import Button from "../button/Button";
import "./AdminDashboard.scss";

export default function AdminDashboard() {
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
          <div className="form-admin__fields">
            <input
              className="form-admin__field"
              type="text"
              name="title"
              placeholder="sarlavha"
            />
            <input
              className="form-admin__field"
              type="text"
              name="short_description"
              placeholder="qisqa izoh"
            />
          </div>
          <div className="form-admin__fields">
            <input
              className="form-admin__field"
              type="text"
              name="tags"
              placeholder="teglar"
            />
            <label className="form-admin__image" htmlFor="image-admin-post">
              rasmni tanlang
            </label>
            <input
              className="form-admin__field visually-hidden"
              type="file"
              name="image"
              placeholder="post rasmi"
              id="image-admin-post"
            />
          </div>
          <div className="form-admin__fields">
            <textarea
              className="form-admin__textarea"
              name="description"
              placeholder="izoh"
            ></textarea>
            <img
              className="form-admin__img"
              src="/images/temp-image.svg"
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
