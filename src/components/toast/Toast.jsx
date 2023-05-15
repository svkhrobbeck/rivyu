import "./Toast.scss";

export default function Toast({
  children,
  isSuccess = true,
  isOpen = false,
  handleClose,
}) {
  return (
    <div
      className={`toast toast--${isSuccess ? "success" : "failure"} ${
        isOpen && "toast--show"
      }`}
    >
      <button className="toast__close" onClick={handleClose}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path
            fill="currentColor"
            d="M5.1516 5.1516a1.2 1.2 0 0 1 1.6968 0L12 10.3032l5.1516-5.1516a1.2 1.2 0 1 1 1.6968 1.6968L13.6968 12l5.1516 5.1516a1.2002 1.2002 0 0 1-.8527 2.0336 1.1996 1.1996 0 0 1-.8441-.3368L12 13.6968l-5.1516 5.1516a1.1997 1.1997 0 0 1-1.6822-.0146 1.2 1.2 0 0 1-.0146-1.6822L10.3032 12 5.1516 6.8484a1.2 1.2 0 0 1 0-1.6968Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <span className="toast__inner">{children}</span>
    </div>
  );
}
