export const validatePassword = (e, setErr, setPassword) => {
  const val = e.target.value.toLowerCase();

  setPassword(val);

  if (val.length === 0) {
    setErr("Parolingizni kiriting");
  } else if (val.length >= 8) {
    setErr("");
  } else if (val.length < 8) {
    setErr("Parol kamida 8 ta belgidan iborat bo'lishi kerak");
  }
};

export const validateEmail = (e, setErr, setEmail) => {
  const val = e.target.value.toLowerCase();

  setEmail(val);

  if (val.length === 0) {
    setErr("Emailingizni kiriting");
  } else if (val.length > 0) {
    setErr("");
  }
};
