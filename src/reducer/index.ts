import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import itemsReducer from './items';

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  items: itemsReducer
})

export type AppState = ReturnType<typeof rootReducer>;
