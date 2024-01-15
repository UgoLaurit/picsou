export type Subcategory = {
  id: string;
  name: string;
  order: number;
  categoryId: string;
  importCategories: string[];
  category: {
    color: string;
    id: string;
    order: number;
    name: string;
  };
};
