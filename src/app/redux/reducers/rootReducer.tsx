import { combineReducers } from "redux";
import loaderReducer from './loaderSlice'

export const rootReducer = combineReducers({
  loader: loaderReducer
});
