import React, { useState } from "react";
import shortid from "shortid";
// import { useSelector } from "react-redux";
// import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addTodo, deleteTodo, switchTodo } from "../redux/modules/todos";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [todos, setTodos] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = shortid.generate();

  // const todos = useSelector((state) => {
  //   console.log(state);
  //   return state;
  // });

  const addHandler = (e) => {
    e.preventDefault();
    const newTodo = {
      id: shortid.generate(),
      title,
      body,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
    dispatch(addTodo(title, body));
    setTitle("");
    setBody("");
  };

  const deleteHandler = () => {
    dispatch(deleteTodo(id));
    // setTodos((preTodos) => preTodos.filter(todos.id !== preTodos.id));
  };

  const switchHandler = () => {
    dispatch(switchTodo(id));
  };

  return (
    <div>
      <header>My Todo List</header>
      <main>
        <div>
          <form onSubmit={addHandler}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <input value={body} onChange={(e) => setBody(e.target.value)} />
            <button type="submit">추가</button>
          </form>
        </div>
        <h2>할일목록</h2>
        {todos
          .filter(function (todo) {
            return todo.isDone === false;
          })
          .map(function (todo) {
            return (
              <div key={todo.id}>
                <p>{todo.id}</p>
                <p>{todo.title}</p>
                <p>{todo.body}</p>
                <p>완료: {todo.isDone.toString()}</p>
                <button onClick={() => switchHandler(todo.id)}>
                  {todo.isDone ? "UnDo" : "Done"}
                </button>
                <button onClick={() => deleteHandler(id)}>삭제</button>
              </div>
            );
          })}
        <h2>완료목록</h2>
        {/* {todos.filter(function(todo){
          return todo.isDone === true
        }).map(function(todo){
          return (
            <div key={todo.id}>
                <p>{todo.id}</p>
                <p>{todo.title}</p>
                <p>{todo.body}</p>
                <p>완료: {todo.isDone.toString()}</p>
          )
        })
        } */}
      </main>
    </div>
  );
};

export default Home;
