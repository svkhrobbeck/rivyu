export const copyLink = (open: () => void, close: () => void) => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    open();
    setTimeout(close, 2000);
  });
};
