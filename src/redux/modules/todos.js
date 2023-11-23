// import uuid from "react-uuid";
import shortid from "shortid";

const ADD_TODO = "todos/ADD_TODO";
const DELETE_TODO = "todos/DELETE_TODO";
const SWITCH_TODO = "todos/SWITCH_TODO";

export const addTodo = (title, body) => ({
  type: ADD_TODO,
  payload: {
    id: shortid.generate(),
    title,
    body,
    isDone: false,
  },
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: {
    id,
  },
});

export const switchTodo = (id) => ({
  type: SWITCH_TODO,
  payload: {
    id,
  },
});

const initialState = [
  {
    id: shortid.generate(),
    title: "제목1",
    body: "내용1",
    isDone: false,
  },
  {
    id: shortid.generate(),
    title: "제목2",
    body: "내용2",
    isDone: true,
  },
];

// 리듀서
const todos = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];

    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload);

    case SWITCH_TODO:
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        } else {
          return todo;
        }
      });

    default:
      return state;
  }
};

export default todos;
