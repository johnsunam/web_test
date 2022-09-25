import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IAttribute, ICategory,  ICategoryListProps} from "../../types";
import { deleteCategory } from "../../actions";

const CategoryList:React.FC<ICategoryListProps> = (props) => {
  const { handleCatEdit } = props;
  const dispatch = useDispatch();
  const categories = useSelector((state: any) => state.categories.data);

  const handleDelete = (id: string) => {
    dispatch(deleteCategory(id));
    handleCatEdit({} as ICategory);
  }
  return (<div className="col-8">
    <div className="col" style={{"maxHeight": "550px", "overflow": "auto"}}>
      <div className="row row-cols-1 row-cols-md-2 g-4" style={{display: "flex"}}>
        {categories.reverse().map((category: ICategory) => {
        return <div key={category.id} className="card" style={{"width": "18rem"}}>
        <div className="card-body">
          <h5 className="card-title">{category.title}</h5>
            
            {category.customAtts.map((att: IAttribute) => {
              return <p>{att.name} :   {att.value}</p>
            })}
            <p>Title field: {category.title_field}</p>
            <a className="card-link" onClick={() => handleDelete(category.id)}>Delete</a>
            <a className="card-link" onClick={() => handleCatEdit(category)}>Edit</a>
        </div>
      </div>
        })}
      </div>
    </div>
  </div>);
}

export default CategoryList;
