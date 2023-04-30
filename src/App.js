//import './App.css';
import React from "react";
import { TodoCounter } from "./TodoCounter";
import { CreateTodoButton } from "./CreateTodoButton";
import { TodoItem } from "./TodoItem";
import { TodoList } from "./TodoList";
import { TodoSearch } from "./TodoSearch";


const todos = [
  { text: "Write email", completed: false },
  { text: "Finish course: Intro to React", completed: false },
  { text: "Finish Platzi's B2-C1 path", completed: false },
];

function App() {
  return (
    //React defines that only 1 element can be returned per component. That's why "ReactFragment" is used
    //ReactFragment is an invisible container
    < React.Fragment >
      <TodoCounter />
      <TodoSearch />
      <TodoList> {/*Container of TODOs*/}
        {/* Each todo that the user will create. Will be reutilized each time an user creates a todo*/}
        {/*Using map to render each ToDo item in todos*/}
        {todos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
          />
        ))}
      </TodoList>
      <CreateTodoButton /> {/*Opens the modal to create new todos in the future*/}
    </React.Fragment >
  );
}

export default App;
