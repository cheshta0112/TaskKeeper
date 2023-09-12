import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  todos: [],
};

export const getInitialState = createAsyncThunk(
  "todo/getInitialState",
  async (_, thunkAPI) => {
    // async calls.
    try {
      const res = await axios.get(
        "https://todo-api-johi.onrender.com/api/todos"
      );
      thunkAPI.dispatch(actions.setInitialState(res.data));
    } catch (err) {
      console.log(err);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.todos = [...action.payload];
    },

    // this is add action
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
});

export const todoReducer = todoSlice.reducer;
export const actions = todoSlice.actions;
export const todoSelector = (state) => state.todoReducer.todos;

// export function todoReducer(state = initialState, action) {
//   switch (action.type) {
//     case ADD_TODO:
//       return {
//         ...state,
//         todos: [
//           ...state.todos,
//           {
//             text: action.text,
//             completed: false,
//           },
//         ],
//       };
//     case TOGGLE_TODO:
//       return {
//         ...state,
//         todos: state.todos.map((todo, i) => {
//           if (i === action.index) {
//             todo.completed = !todo.completed;
//           }
//           return todo;
//         }),
//       };
//     default:
//       return state;
//   }
// }
