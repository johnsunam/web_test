import { IInitialItems, ADD_ITEM, EDIT_ITEM, IItem, DELETE_ITEM } from "../types";


const initial_state: IInitialItems =  {
  data: [],
}

const reducer = (state= initial_state, action: any) => {
  switch(action.type){
    case ADD_ITEM:
      const preState = [...state.data];
      preState.push(action.payload as never);
      return {
        data: preState
      }
    case EDIT_ITEM:
      const preEditState = [...state.data];
      preEditState.forEach((item: IItem) => {
        if(item.id === action.payload.id) {
          item.forEach((val: any, key: string) => {
            item[key] = action.payload[key];
          });
        }
      });
      return {
        data: preEditState,
      }
    case DELETE_ITEM: 
      const rejData = [...state.data];
      const rejList = rejData.filter((item: IItem) => item.id !== action.payload.id);
      return {data: rejList};
    default:
      return state;
  }
}

export default reducer;
