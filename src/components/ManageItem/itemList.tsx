import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IItemListProps, IItem, ICategory, IAttribute } from "../../types";
import { deleteItem } from "../../actions";

const ItemList: React.FC<IItemListProps> = (props) => {
  const items = useSelector((state: any) => state.items.data);
  const dispatch = useDispatch();
  const { categories, handleSelectCategory, handleItemEdit } = props;
  const getCategoryItems = (id: string) => {
    return items.filter((item:IItem) => item.cat_id === id);
  }
  const handleDelete = (id: string) => {
    dispatch(deleteItem(id));
    handleItemEdit({} as IItem);
  }
  const handleEdit = (item: IItem, cat: ICategory) => {
    handleSelectCategory(cat);
    handleItemEdit(item);
  }
  return(<div className="col-9">
    {categories.map((cat) => {
      return(<div key={cat.id}>
        <h3>{cat.title}</h3>
        <button type="button" className="btn btn-primary" onClick={() => handleSelectCategory(cat)}>Add item</button>
        <hr />
        <div className="row row-cols-1 row-cols-md-2 g-4" style={{display: "flex"}}>
          {
            getCategoryItems(cat.id).map((item: IItem) => {
              return (
                <div key={item.id} className="card" style={{"width": "18rem"}}>
                  <div className="card-body">
                    <h5 className="card-title">{item[cat.title_field]}</h5>
                      {cat.customAtts.map((att: IAttribute) => {
                        return (<div>{att.name} :  {`${item[att.name] === undefined ? "" : item[att.name]}`}</div>)
                      })}
                      <a className="card-link" onClick={() => handleDelete(item.id)}>Delete</a>
                      <a className="card-link" onClick={() => handleEdit(item, cat)}>Edit</a>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>)
    })}
  </div>)
}

export default ItemList;


