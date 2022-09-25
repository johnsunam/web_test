import React, { ChangeEvent, useEffect, useState } from "react";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import { IAddItemProps, IAttribute, IItem,  } from "../../types";
import { addItem, editCurrentItem } from "../../actions";

export interface Iform {
  [x: string]: any,
}
const AddItem: React.FC<IAddItemProps> = (props) => {
  const { selectedCategory, editItem, handleItemEdit } = props;
  const dispatch = useDispatch();
  const [item, setItem] = useState<Iform>({});
  const [err, setErr] =  useState<string>("");
  const handleChange = (key: string, val: string | boolean) => {
    const newItem = {...item};
    newItem[key] = val;
    setItem(newItem);
  } 

  const handleSaveItem = () => {
    const err = [];
    console.log("iiiii", item)
    selectedCategory?.customAtts.forEach((att: IAttribute) => {
      console.log(att.name, item[att.name])
      if(!item[att.name]){
        err.push(att.name as never);
      }
    })
    if (err.length > 0) {
      setErr("Please fill up all the value");
    } else {
      item.id = uuid();
      item.cat_id = selectedCategory?.id;
      if (editItem) {
        dispatch(editCurrentItem(item as IItem))
        handleItemEdit({} as IItem);
      } else {
        dispatch(addItem(item as IItem));
        setItem({});
      }
    }
  }

  useEffect(() => {
      setItem(editItem || {})
  }, [editItem?.id]);

  return (<div className="col-3">
    <h3>{selectedCategory?.title_field ? item[selectedCategory?.title_field] : ""}</h3>
    {
      selectedCategory?.customAtts.map((att: IAttribute) => {
        switch (att.value) {
          case "number":
           return <div className="mb-3">
           <label htmlFor="exampleFormControlInput1" className="form-label">{att.name}</label>
           <input type="number" value={item[att.name] || ""} className="form-control" id="exampleFormControlInput1" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(att.name, e.target.value)}/>
         </div>
          case "checkbox":
            return <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">{att.name}</label>
            <input checked={item[att.name]} className="form-check-input mt-0" type="checkbox" aria-label="Checkbox for following text input" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(att.name, e.target.checked)}/>

          </div>;
          case "date":
            return <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">{att.name}</label>
            <input value={item[att.name] || ""} type="date" className="form-control" id="exampleFormControlInput1" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(att.name, e.target.value)}/>
          </div>;
          default:
            return (<div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">{att.name}</label>
            <input value={item[att.name] || ""} type="text" className="form-control" id="exampleFormControlInput1" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(att.name, e.target.value)}/>
          </div>)
        }
      })
    }
    <button type="button" className="btn btn-primary" onClick={() => handleSaveItem()}>Add item</button>
  </div>);
}

export default AddItem;
