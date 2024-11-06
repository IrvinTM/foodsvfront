import { createContext } from "react";
import { myContext } from "./types/types";

const initialState: myContext = {
  searchTerm: "",
  setSearchTerm: () => {},
  categories: "",
  setCategories: () => {},
  handleSearch: ()=> {},
};

export const AppContext = createContext<myContext>(initialState);
