import "./Cards.scss";
import CardItem from "../card-item/CardItem";

export default function CardsList({ data, state = false }) {
  return (
    <section className="cards">
      <div className="container">
        <div className="cards__inner">
          <h2 className="cards__title">
            {state ? "Tahlillar / Maqolalar" : "Yangiliklar"}
          </h2>
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
