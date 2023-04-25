import "./Cards.scss";
import CardItem from "../card-item/CardItem";

export default function CardsList({ data, state = false }) {
  const text = state ? "Tahlillar / Maqolalar" : "Yangiliklar";
  document.title = `Kino Blog | ${text}`;
  return (
    <section className="cards">
      <div className="container">
        <div className="cards__inner">
          <h2 className="cards__title">{text}</h2>
          <ul className="cards-list" data-cards-list>
            {data &&
              data.map((item) => (
                <CardItem key={item.id} state={state} {...item} />
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
