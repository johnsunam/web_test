import { IInitialState, ICategory, ADD_CATEGORY, EDIT_CATEGORY, DELETE_CATEGORY } from '../types';

const initial_state: IInitialState = {
  data: [],
}

const reducer = (state=initial_state, action: any) => {
  switch(action.type){
    case ADD_CATEGORY:
      const preData = [...state.data];
      preData.push(action.payload as never);
      return {data: preData};
    case EDIT_CATEGORY:
      const { payload } = action;
      const preEditData = [...state.data];
      preEditData.forEach((d: ICategory) => {
        if (d.id === payload.id) {
          d.customAtts = payload.customAtts;
          d.title = payload.title;
          d.title_field = payload.title_field;
        }
      });
      return {data: preEditData};
    case DELETE_CATEGORY: 
      const rejData = [...state.data];
      const rejList = rejData.filter((cat: ICategory) => cat.id !== action.payload.id);
      return {data: rejList};
    default: 
      return state;
  }
}

export default reducer;
