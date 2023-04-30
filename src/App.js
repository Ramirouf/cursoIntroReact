//import './App.css';
import React from "react";
import { TodoCounter } from "./TodoCounter";
import { CreateTodoButton } from "./CreateTodoButton";
import { TodoItem } from "./TodoItem";
import { TodoList } from "./TodoList";
import { TodoSearch } from "./TodoSearch";


const defaultTodos = [
  { text: "Write email", completed: true },
  { text: "Finish course: Intro to React", completed: true },
  { text: "Finish Platzi's B2-C1 path", completed: false },
];

function App() {
  const [todos, setTodos] = React.useState(defaultTodos);
  const [searchValue, setSearchValue] = React.useState("");

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];
  if (searchValue.length === 0) {
    //If there's no text in the search box, then show all todos
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLocaleLowerCase();
      //Return each element that includes the text written in the search box
      return todoText.includes(searchText);
    })
  }

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    setTodos(newTodos);
    /*
    newTodos[todoIndex] = {
      text: newTodos[todoIndex].text,
      completed: true
    }*/
  }
  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1); // Remove the todo
    setTodos(newTodos); //Update the state
  }
  return (
    //React defines that only 1 element can be returned per component. That's why "ReactFragment" is used
    //ReactFragment is an invisible container
    < React.Fragment >
      <TodoCounter
        total={totalTodos}
        completed={completedTodos}
      />
      <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <TodoList> {/*Container of TODOs*/}
        {/* Each todo that the user will create. Will be reutilized each time an user creates a todo*/}
        {/*Using map to render each ToDo item in todos*/}
        {searchedTodos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>
      <CreateTodoButton /> {/*Opens the modal to create new todos in the future*/}
    </React.Fragment >
  );
}

export default App;
