
export enum Category {
	fruits = "FRUITS",
	vegetables = "VEGETABLES",
	grains = "GRAINS",
	proteins = "PROTEINS",
	dairy = "DAIRY",
	fats = "FATS",
	sweets = "SWEETS",
	beverages = "BEVERAGES",
	processed_condiments = "PROCESSED_CONDIMENTS",
	snacks = "SNACKS",
}

export enum NovaClasification {
	ultra_processed = "ULTRA_PROCESSED",
	processed = "PROCESSED",
	minimally_processed = "MINIMALLY_PROCESSED",
	unprocessed = "UNPROCESSED",
}

export enum Warnings {
	none = "NONE",
	high_sugar = "HIGH_SUGAR",
	high_sodium = "HIGH_SODIUM",
	high_fat = "HIGH_FAT",
	high_cholesterol = "HIGH_CHOLESTEROL",
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
  warnings: Warnings[];
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
  warnings: Warnings[];
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
