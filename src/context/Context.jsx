import { createContext, useReducer } from "react";

const initialValue = {
  data: {},
  arr: [],
  users: {},
  currentUser: {},
  isLoading: false,
  isAdmin: false,
  isAuth: false,
  siteNavOpen: false,
  modalOpen: false,
};

export const Context = createContext();

const reducer = (state = initialValue, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_DATA":
      return { ...state, data: payload };

    case "GET_ARR":
      return { ...state, arr: payload };

    case "GET_USERS":
      return { ...state, users: payload };

    case "GET_USER":
      return { ...state, currentUser: payload };

    case "IS_LOADING":
      return { ...state, isLoading: payload };

    case "SET_AUTH":
      return { ...state, isAuth: payload };

    case "SET_ADMIN":
      return { ...state, isAdmin: payload };

    case "SITENAV_TOGGLE":
      return { ...state, siteNavOpen: !state.siteNavOpen };

    case "MODAL_OPEN":
      return { ...state, modalOpen: true };

    case "MODAL_CLOSE":
      return { ...state, modalOpen: false };

    default:
      return { state };
  }
};

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
}
