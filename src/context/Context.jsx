import { createContext, useReducer, useState } from "react";

const initialValue = {
  news: [],
  reviews: [],
  isAdmin: false,
  isAuth: false,
};

export const Context = createContext();

const reducer = (state = initialValue, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_NEWS":
      return { ...state, news: payload };

    case "GET_REVIEWS":
      return { ...state, reviews: payload };

    case "IS_AUTH":
      return { ...state, isAuth: payload };

    case "IS_ADMIN":
      return { ...state, isAdmin: payload };

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
