export const ADD_CATEGORY = "ADD_CATEGORY";
export const EDIT_CATEGORY = "EDIT_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const ADD_ITEM = "ADD_ITEM";
export const EDIT_ITEM = "EDIT_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";

export interface IInitialState {
  data: []
}

export interface ICategory {
  id: string;
  title: string;
  customAtts: any;
  title_field: string;
}

export interface IManageProps {

}

export interface IAttribute {
  name: string;
  value: string;
}

export interface IAddCategoryProps {
  editCategory: ICategory | undefined;
  handleCatEdit: (cat: ICategory) => void;
}

export interface ICategoryListProps {
  handleCatEdit: (cat: ICategory) => void;
}

export interface IManageItemProps {
  categories: ICategory[];
}

export interface IAddItemProps {
  selectedCategory: ICategory | undefined;
  editItem: IItem | undefined,
  handleItemEdit: (item: IItem) => void;
}

export interface IItemListProps {
  categories: ICategory[];
  handleSelectCategory: (cat: ICategory) => void;
  handleItemEdit: (item: IItem) => void;
}

export interface IInitialItems {
  data: [],
}

export interface IItem {
  cat_id: string
  [x: string]: any,
}


