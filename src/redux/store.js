// const redux = require("redux");

import * as redux from "redux";
import { combineReducers } from "redux";
import { noteReducer } from "./reducers/noteReducer";
import { todoReducer } from "./reducers/todoReducer";

const result = combineReducers({
  todos: todoReducer,
  notes: noteReducer,
});

export const store = redux.createStore(result);
