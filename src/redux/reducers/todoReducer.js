import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  todos: [],
};

export const getInitialState = createAsyncThunk(
  "todo/getInitialState",
  // async (_, thunkAPI) => {
  //   // async calls.
  //   try {
  //     const res = await axios.get(
  //       "https://todo-api-johi.onrender.com/api/todos"
  //     );
  //     thunkAPI.dispatch(actions.setInitialState(res.data));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  () => {
    return axios.get("https://todo-api-johi.onrender.com/api/todos");
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.todos = [...action.payload];
    },
    add: (state, action) => {
      state.todos.push({
        text: action.payload,
        completed: false,
      });
    },
    toggle: (state, action) => {
      state.todos.map((todo, i) => {
        if (i == action.payload) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInitialState.fulfilled, (state, action) => {
      console.log("getInitialState is fulfilled");
      console.log(action.payload.data);
      state.todos = [...action.payload.data];
    });
  },
});

export const todoReducer = todoSlice.reducer;
export const actions = todoSlice.actions;
export const todoSelector = (state) => state.todoReducer.todos;
