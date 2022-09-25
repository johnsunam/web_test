
import {ADD_CATEGORY, ADD_ITEM, EDIT_CATEGORY,DELETE_CATEGORY, ICategory, IItem, EDIT_ITEM, DELETE_ITEM } from "../types";


export const addCategory = (payload: ICategory) => {
  return {
    payload,
    type: ADD_CATEGORY, 
  }
}

export const editCurrentCategory = (payload: ICategory) => {
  return {
    payload,
    type: EDIT_CATEGORY,
  }
}

export const deleteCategory = (id: string) => {
  return {
    payload: {id},
    type: DELETE_CATEGORY,
  }
}

export const addItem = (payload: IItem) => {
  return {
    payload: payload,
    type: ADD_ITEM,
  }
}

export const editCurrentItem = (payload: IItem) => {
  return {
    payload: payload,
    type: EDIT_ITEM,
  }
}

export const deleteItem = (id: string) => {
  return {
    payload: {id},
    type: DELETE_ITEM,
  }
}
