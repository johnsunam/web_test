import React, { useState, MouseEvent, ChangeEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import uuid from 'react-uuid';
import { IAttribute, IAddCategoryProps, ICategory } from "../../types";
import { addCategory, editCurrentCategory } from "../../actions";


const AddCategory: React.FC<IAddCategoryProps> = (props) => {
  const { editCategory, handleCatEdit } = props;
  const [attributeList, setAttibuteList] = useState<IAttribute[]>([]);
  const [catTitle, setCatTitle] = useState("");
  const [catTitleField, setCatTitleField] = useState("");
  const [emptyValue, setEmptyValue] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
      setAttibuteList(editCategory?.customAtts || []);
      setCatTitle(editCategory?.title || "");
      setCatTitleField(editCategory?.title_field || "");
  }, [editCategory?.id])
  const addAttribute = () => {
    const attList = [...attributeList];
    const lastAtt = attList[attList.length - 1];
    if((lastAtt?.name && lastAtt?.value) || attList.length == 0) {
      attList.push({name: "", value: "text"});
      setAttibuteList(attList);
      setEmptyValue(false);
    } else {
      setEmptyValue(true);
    }
  }
  const handleAttValueChange = (e: MouseEvent<HTMLElement>) => {
    const element = e.target as HTMLInputElement
    const value = element.id
    const spl = value.split("_")
    const attList = [...attributeList];
    attList[spl[1] as any].value = spl[0];
    setAttibuteList(attList);
  }

  const handleTitleChange = (value: string, i: number) => {
    const attList = [...attributeList];
    attList[i].name = value;
    setAttibuteList(attList);
  }

  const handleCategorySave = () => {
    const attList = [...attributeList];
    const lastAtt = attList[attList.length - 1];
    if(((lastAtt?.name && lastAtt?.value) || attList.length === 0) && catTitle && catTitleField) {
      if(editCategory?.id) {
        console.log(catTitleField);
        dispatch(editCurrentCategory({title: catTitle, customAtts: attributeList, id: editCategory.id, title_field: catTitleField}));
        handleCatEdit({} as ICategory);
      } else {
        dispatch(addCategory({title: catTitle, customAtts: attributeList, id: uuid(), title_field: catTitleField}));
      }
      setEmptyValue(false);
      setAttibuteList([]);
      setCatTitle("");
    } else {
      setEmptyValue(true);
    }
  }
  const handleFieldRemove = (name: string, i: number) => {
    const attList = [...attributeList];
    const newList = attList.filter((att, index) => att.name !== name && i !== index);
    if (name === catTitleField) {
      const cat_field = newList[0].name;
      setCatTitleField(cat_field);
    }
    setAttibuteList(newList);

  }
  return(<div className="col-4">
    <div className="mb-3">
      <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
      <input type="text" className="form-control" id="exampleFormControlInput1" value={catTitle} onChange={(e: ChangeEvent<HTMLInputElement>) => setCatTitle(e.target.value)}/>
    </div>
    <div>
    {
      attributeList.map((attribute: IAttribute, i) => {
        return (<div className="input-group mb-3">
          <input type="text" className="form-control" value={attribute.name} aria-label="Text input with dropdown button" onChange={(e: ChangeEvent<HTMLInputElement>) => handleTitleChange(e.target.value, i)}/>
          <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{attribute.value}</button>
          <ul className="dropdown-menu">
            <li className="dropdown-item" id={`text_${i}`} onClick={handleAttValueChange}
            >Text</li>
            <li className="dropdown-item" id={`number_${i}`} onClick={handleAttValueChange}
            >Number</li>
            <li className="dropdown-item" id={`checkbox_${i}`} onClick={handleAttValueChange}>Checkbox</li>
            <li className="dropdown-item" id={`date_${i}`} onClick={handleAttValueChange}>Date</li>
            <li className="dropdown-item" id={`remove_${i}`} onClick={() => handleFieldRemove(attribute.name, i)}>remove</li>
          </ul>
        </div>)
      })
    }
   {  attributeList.length > 0 && <select className="form-select" aria-label="Default select example" onChange={(e: ChangeEvent<HTMLSelectElement>) => setCatTitleField(e.target.value)}>
        <option value={""} selected={catTitleField === ""}>Please select title field</option>
      {attributeList.map((att) => {
        console.log(att.name, catTitleField !== "" && catTitleField === att.name, catTitleField)
        return(<option value={att.name} selected={catTitleField !== "" && catTitleField === att.name}>{att.name}</option>)
      })}
    </select>}
    </div>
    {emptyValue && <div className="alert alert-danger" role="alert">
      Please provide the previous value before adding new one
    </div>}
    <button className="btn btn-primary" onClick={addAttribute}>Add Attribute</button>
    <button className="btn btn-primary" onClick={handleCategorySave} style={{marginLeft: "5px"}}>Save Category</button>
  </div>);
}

export default AddCategory;
 