import { createContext, useReducer, useState } from "react";

const initialValue = {
  data: {},
  arr: [],
  isAdmin: false,
  isAuth: false,
  siteNavOpen: false,
};

export const Context = createContext();

const reducer = (state = initialValue, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_DATA":
      return { ...state, data: payload };

    case "GET_ARR":
      return { ...state, arr: payload };

    case "SET_AUTH":
      return { ...state, isAuth: payload };

    case "SET_ADMIN":
      return { ...state, isAdmin: payload };

    case "SITENAV_TOGGLE":
      return { ...state, siteNavOpen: !state.siteNavOpen };

    default:
      return { state };
  }
};

export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialValue);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}
