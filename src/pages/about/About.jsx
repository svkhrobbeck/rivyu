// style
import "./About.scss";

export default function About() {
  return (
    <section className="about">
      <div className="container">
        <h2 className="about__title main-title">Biz haqimizda</h2>
        <p className="about__desc">
          Ushbu sayt hechqanday tijoriy va moddiy manfaatlarni ko'zlab
          yaratilmagan. Saytni yaratishdan asosiy maqsad o'zimning "dasturlash"
          bo'yicha bilimlarimni mustahkamlash va yangi bilimlarni amaliyot
          tariqasida o'zlashtirish.
          <br />
          <br />
          <q>
            Nega aynan kino sayt tariqasida bilimlarimni mustahkamlamoqdaman,
            boshqa foydaliroq dastur qilib, biror muammoga yechim topsam
            bo'lmasmidi?
          </q>
          <br />
          Gapingizda jon bor, men foydaliroq dastur tuzishim mumkin edi, ammo
          men o'zimga yoqqan ishni amalga oshirish orqali, o'zimdagi muammoni
          yechdim. Aslida dasturlashni o'rganishni boshlaganimdayoq o'zim
          qiziqqan mavzularda saytlar yaratmoqchi edim va buning kichik qismi
          amalga oshdi.
          <br />
          <br />
          Dastur(sayt)ni yaratishda JavaScript dasturlash tilining <q>
            React
          </q>{" "}
          kutubxonasidan, hamda <q>Vite</q> texnologiyasidan foydalanildi.
          <br />
          <br />
          Ma'lumotlar bazasi sifatida <q>Firebase</q> texnologiyasi qo'llanildi.
          <br />
          <br />
          Saytda ba'zi xatoliklar va hali yechimi topilmagan qismlar mavjud.
          Sayt boshlang'ich dasturchi tomonidan yaratilganligini inobatga olib,
          ushbu xatoliklarga ko'z yumasiz degan umiddamiz!
          <br />
          <br />
          <span className="about__icons">
            <img className="about__icon" src="/react.svg" alt="logo react" />
            <img className="about__icon" src="/vite.svg" alt="logo vite" />
            <img className="about__icon" src="/firebase.svg" alt="logo firebase" />
            <img className="about__icon" src="/kinoblog.svg" alt="logo kinoblog" />
          </span>
        </p>
      </div>
    </section>
  );
}
