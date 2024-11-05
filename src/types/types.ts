
export const Category: Map<string, string> = new Map([
  ["Snacks", "SNACKS"],
  ["Grasas", "FATS"],
  ["Lácteos", "DAIRY"],
  ["Frutas", "FRUITS"],
  ["Granos", "GRAINS"],
  ["Dulces", "SWEETS"],
  ["Proteínas", "PROTEINS"],
  ["Bebidas", "BEVERAGES"],
  ["Vegetales", "VEGETABLES"],
  ["Condimentos", "PROCESSED_CONDIMENTS"],
]);

export const NovaClasification: Map<string, string> = new Map([
  ["Alimentos Procesados", "PROCESSED_FOODS"],
  ["Alimentos Ultra Procesados", "ULTRA_PROCESSED_FOODS"],
  ["Ingredientes Culinarios Procesados", "PROCESSED_CULINARY_INGREDIENTS"],
  ["Alimentos no Procesados o Mínimamente Procesados", "UNPROCESSED_OR_MINIMALLY_PROCESSED_FOODS"],
]);

export type Warnings = {
	 HIGH_SUGAR : string;
	 HIGH_SODIUM: string;
	 HIGH_CHOLESTEROL : string;
	 HIGH_TRANS_FATS : string;
	 HIGH_SATURATED_FATS : string;
	 HIGH_CARBS : string;
}

export type FoodItem = {
  name: string;
  description: string;
  image: string;
  category: string;
  calories: number;
  protein: number;
  cholesterol: number;
  carbs: number;
  sugar: number;
  sodium: number;
  warnings: string[];
  totalFats: number;
  novaGroup: string;
  saturatedFats: number;
  transFats: number;
  servingSize: number;
};

export type FoodItemAdd = {
  name: string;
  description: string;
  image: string;
  category: string;
  calories: number;
  protein: number;
  cholesterol: number;
  carbs: number;
  sugar: number;
  sodium: number;
  total_fats: number;
  nova_group: string;
  saturated_fats: number;
  trans_fats: number;
  serving_size: number;
};

type Sort = {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
};

type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export type PaginatedFoodResponse = {
  content: FoodItem[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

export type myContext = {
searchTerm: string;
setSearchTerm: (value: string) => void;
  categories: string;
  setCategories: (value: string) => void;
  handleSearch: (pageNumber:number, pageSize:number) => void;
}
