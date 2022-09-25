import React, { useState } from "react";
import { IManageItemProps, ICategory, IItem } from "../../types";
import AddItem from "./addItem";
import ItemList from "./itemList";

const Machine: React.FC<IManageItemProps> = (props) => {
  const { categories } = props;
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(categories[0]);
  const [editItem, setEditItem] = useState<IItem>()
  const handleSelectCategory = (cat: ICategory) => {
    setSelectedCategory(cat);
  }
  const handleItemEdit = (item: IItem) => {
    setEditItem(item);
  }
  return (<div className="container text-center">
    <div className="row">
    <ItemList categories={categories} handleSelectCategory={handleSelectCategory} handleItemEdit={handleItemEdit}/>
    {selectedCategory && <AddItem selectedCategory={selectedCategory} editItem={editItem} handleItemEdit={handleItemEdit}/>}
    </div>
  </div>)
}

export default Machine;
