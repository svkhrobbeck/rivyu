export const copyLink = (open, close) => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    open();
    setTimeout(close, 3000);
  });
};
