// styles
import "./About.scss";
// fc/hook
import { FC, useEffect } from "react";
// helmet
import { Helmet } from "react-helmet";
// about icons
import { aboutIcons } from "@helpers/constants";

const About: FC = (): JSX.Element => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <section className="about">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rivyu | Dastur haqida</title>
      </Helmet>
      <div className="container">
        <h2 className="about__title main-title">Dastur haqida</h2>
        <p className="about__desc">
          Ushbu sayt hechqanday tijoriy va moddiy manfaatlarni ko'zlab yaratilmagan. Saytni yaratishdan asosiy maqsad
          o'zimning "dasturlash" bo'yicha bilimlarimni mustahkamlash va yangi bilimlarni amaliyot tariqasida
          o'zlashtirish.
          <br />
          <q className="about__quote">
            Nega aynan kino sayt tariqasida bilimlarimni mustahkamlamoqdaman, boshqa foydaliroq dastur qilib, biror
            muammoga yechim topsam bo'lmasmidi?
          </q>
          <br />
          Gapingizda jon bor, men foydaliroq dastur tuzishim mumkin edi, ammo men o'zimga yoqqan ishni amalga oshirish
          orqali, o'zimdagi muammoni yechdim. Aslida dasturlashni o'rganishni boshlaganimdayoq o'zim qiziqqan mavzularda
          saytlar yaratmoqchi edim va buning kichik qismi amalga oshdi.
          <br />
          Dastur(sayt)ni yaratishda JavaScript dasturlash tilining <q className="about__quote">React</q> kutubxonasidan,
          hamda <q className="about__quote">Vite</q> texnologiyasidan foydalanildi.
          <br />
          <br />
          Ma'lumotlar bazasi sifatida <q className="about__quote">Firebase</q> texnologiyasi qo'llanildi.
          <br />
          Saytda ba'zi xatoliklar va hali yechimi topilmagan qismlar mavjud. Sayt boshlang'ich dasturchi tomonidan
          yaratilganligini inobatga olib, ushbu xatoliklarga ko'z yumasiz degan umiddamiz!
        </p>
        <div className="about__icons">
          {!!aboutIcons.length &&
            aboutIcons.map(({ imgPath, alt }) => <img className="about__icon" src={imgPath} alt={alt} key={alt} />)}
        </div>
        <br />
        <div className="about__link-wrapper">
          Dasturchi:{" "}
          <q className="about__quote">
            <a href="https://tme.to/svkhrobbeck" target="_blank">
              Suhrobbek Soatov
            </a>
          </q>
        </div>
        <div className="about__link-wrapper">
          Portfolio:{" "}
          <q className="about__quote">
            <a href="https://soatov.uz" target="_blank">
              Havola
            </a>
          </q>
        </div>
      </div>
    </section>
  );
};

export default About;
