import { create } from "zustand";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "modal":
      return { modal: payload };

    case "sitenav":
      return { sitenav: payload };

    case "sitenav-toggle":
      return { sitenav: !state.sitenav };

    case "sitenav-mini":
      return { sitenavMini: payload };

    case "sitenav-mini-toggle":
      return { sitenavMini: !state.sitenavMini };

    case "search":
      return { search: payload };

    default:
      return state;
  }
};

const useUiStore = create(set => ({
  sitenav: false,
  modal: false,
  sitenavMini: false,
  search: false,
  dispatch: args => set(state => reducer(state, args)),
}));

export default useUiStore;
