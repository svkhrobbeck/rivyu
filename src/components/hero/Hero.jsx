import "./Hero.scss";

export default function Hero() {
  document.title = `Kino Blog | Bosh sahifa`;
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__inner">
          <div className="hero__content">
            <h2 className="hero__title">
              <span className="hero__title-inner">Kino Blog</span>- Kino
              Tahlillar va Yangiliklar
            </h2>
            <p className="hero__desc">
              Kino yangiliklarga oid va turli qiziqarli tahlillarga boy
              platformamizga xush kelibsiz. Bizda turli janrdagi kino va
              seriallar haqida bilib olishingiz mumkin.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
