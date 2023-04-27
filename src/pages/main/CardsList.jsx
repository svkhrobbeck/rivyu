import "./Cards.scss";
import CardItem from "../../components/card-item/CardItem";

export default function CardsList({
  deleteDataItem,
  isAdmin,
  data,
  state = false,
}) {
  const text = state ? "Tahlillar / Maqolalar" : "Yangiliklar";
  document.title = `Kino Blog | ${text}`;

  return (
    <section className="cards">
      <div className="container">
        <div className="cards__inner">
          <h2 className="cards__title">{text}</h2>
          <ul className="cards-list">
            {data &&
              data.map((item) => (
                <CardItem
                  key={item.id}
                  isAdmin={isAdmin}
                  state={state}
                  {...item}
                  deleteDataItem={deleteDataItem}
                />
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
