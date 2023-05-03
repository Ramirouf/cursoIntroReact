//import './App.css';
import React from "react";
import { AppUI } from "./AppUI";

// const defaultTodos = [
//   { text: "Write email", completed: true },
//   { text: "Finish course: Intro to React", completed: true },
//   { text: "Finish Platzi's B2-C1 path", completed: false },
// ];

function App() {

  //Call localStorage and get item, which comes in string format
  const localStorageTodos = localStorage.getItem("TODOS_V1");
  //There are 2 options. The user is new or not. If new, create an empty array, otherwise, retrieve the existing one from localStorage
  let parsedTodos; //This will be sent to React.useState
  if (localStorageTodos) {
    parsedTodos = JSON.parse(localStorageTodos); //Parse the string
  } else {
    parsedTodos = [];
    localStorage.setItem("TODOS_V1", JSON.stringify(parsedTodos)); //);
  }

  const [todos, setTodos] = React.useState(parsedTodos);
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

  //Function to update the state AND store the tasks in localStorage
  const saveTodos = (newTodos) => {
    const stringifiedTodos = JSON.stringify(newTodos);
    localStorage.setItem("TODOS_V1", stringifiedTodos);
    setTodos(newTodos);
  }

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
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
    saveTodos(newTodos); //Update the state
  }
  return (
    <AppUI
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
