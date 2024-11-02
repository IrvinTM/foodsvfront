import { createContext } from "react";
import { myContext } from "./types/types";

const initialState: myContext = {
  searchTerm: "",
  setSearchTerm: () => {},
  categories: "",
  setCategories: () => {},
};

export const AppContext = createContext<myContext>(initialState);
