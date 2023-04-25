import "./ThemeToggler.scss";
export default function ThemeToggler() {
  return (
    <button className="theme-toggler theme-toggler--dark">
      <img
        className="theme-toggler__img theme-toggler__img--sun"
        src="/images/icon-sun.svg"
        alt="sun icon"
      />
      <img
        className="theme-toggler__img theme-toggler__img--moon"
        src="/images/icon-moon.svg"
        alt="sun icon"
      />
    </button>
  );
}
