import { useSelector, useDispatch } from "react-redux";
// import { toggleTodo } from "../../redux/actions/todoActions";
import { actions } from "../../redux/reducers/todoReducer";
import { todoSelector } from "../../redux/reducers/todoReducer";
import { useEffect } from "react";
import axios from "axios";

import "./ToDoList.css";

function ToDoList() {
  const todos = useSelector(todoSelector);
  console.log(todos);
  const dispatch = useDispatch();
  // const todos= store.getState().todos;

  useEffect(() => {
    axios.get("https://todo-api-johi.onrender.com/api/todos").then((res) => {
      console.log(res.data);
      dispatch(actions.setInitialState(res.data));
    });
  }, []);

  return (
    <div className="container">
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            <span className="content">{todo.text}</span>
            <span className={todo.completed ? "completed" : "pending"}>
              {todo.completed ? "Completed" : "Pending"}
            </span>
            <button
              className="btn-warning"
              onClick={() => {
                // console.log("[LOG]: Todo-Toggle action Dispatched");
                dispatch(actions.toggle(index));
              }}
            >
              Toggle
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
