import "./Button.scss";

export default function Button({ children, state = true, type = "button" }) {
  return (
    <button
      className={`button ${state ? "button--green" : "button--blue"}`}
      type={type}
    >
      {children}
    </button>
  );
}
