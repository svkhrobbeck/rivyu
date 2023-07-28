import { create } from "zustand";

interface State {
  sitenav: boolean;
  modal: boolean;
  sitenavMini: boolean;
  search: boolean;
}

interface Actions {
  setSitenav: (sitenav: boolean) => void;
  setModal: (modal: boolean) => void;
  setSitenavMini: (sitenavMini: boolean) => void;
  setSearch: (search: boolean) => void;
}

const useUiStore = create<State & Actions>(set => ({
  sitenav: false,
  modal: false,
  sitenavMini: false,
  search: false,
  setSitenav: sitenav => set(() => ({ sitenav })),
  setModal: modal => set(() => ({ modal })),
  setSitenavMini: sitenavMini => set(() => ({ sitenavMini })),
  setSearch: search => set(() => ({ search })),
}));

export default useUiStore;
