
export enum Category {
	 "FRUITS",
	 "VEGETABLES",
	 "GRAINS",
	 "PROTEINS",
	 "DAIRY",
	 "FATS",
	 "SWEETS",
	 "BEVERAGES",
	 "PROCESSED_CONDIMENTS",
	 "SNACKS",
}

export enum NovaClasification {
	 "ULTRA_PROCESSED",
	 "PROCESSED",
	 "MINIMALLY_PROCESSED",
	 "UNPROCESSED",
}

export type Warnings = {
	 HIGH_SUGAR : string;
	 HIGH_SODIUM: string;
	 HIGH_CHOLESTEROL : string;
	 HIGH_TRANS_FATS : string;
	 HIGH_SATURATED_FATS : string;
	 HIGH_CARBS : string;
}

export type Food = {
  name: string;
  image: string;
  category: Category;
  nova_group: NovaClasification;
  calories: number;
  protein: number;
  total_fats: number;
  saturated_fats: number;
  trans_fats: number;
  cholesterol: number;
  carbs: number;
  sugar: number;
  sodium: number;
  serving_size: number;
  warnings: string[];
};


export type FoodItem = {
  name: string;
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
  nova_group: string;
  total_fats: number;
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
