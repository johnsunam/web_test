import React, { FC, useState } from "react";
import { IManageProps, ICategory } from "../../types";
import AddCategory from "./addCategory";
import CategoryList from "./categoryList";

const ManageCateogries: FC<IManageProps> = () => {
  const [editCategory, setEditCategory] = useState<ICategory>();
  const handleCatEdit = (cat: ICategory) => {
    setEditCategory(cat);
  }
  return <div className="container text-center">
    <div className="row">
      <CategoryList handleCatEdit={handleCatEdit}/>
      <AddCategory editCategory={editCategory} handleCatEdit={handleCatEdit}/>
    </div>
</div>
}

export default ManageCateogries;
