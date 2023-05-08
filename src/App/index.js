//import './App.css';
import React from "react";
import { AppUI } from "./AppUI";

// const defaultTodos = [
//   { text: "Write email", completed: true },
//   { text: "Finish course: Intro to React", completed: true },
//   { text: "Finish Platzi's B2-C1 path", completed: false },
// ];

// Create a custom React hook to decouple logic from the App component
// It's a function, and for rule, it should start with "use"
// From now on, we'l use the logic defined in the "useLocalStorage" hook
// We'll use "react use state" only in the "useLocalStorage" hook
//Returns the items in local storage
function useLocalStorage(itemName, initialValue) {
  //Call localStorage and get item, which comes in string format
  const localStorageItem = localStorage.getItem(itemName);
  //There are 2 options. The user is new or not. If new, create an empty array, otherwise, retrieve the existing one from localStorage
  let parsedItem; //This will be sent to React.useState
  if (localStorageItem) {
    parsedItem = JSON.parse(localStorageItem); //Parse the string
  } else {
    parsedItem = initialValue;
    localStorage.setItem(itemName, JSON.stringify(parsedItem)); //);
  }

  const [item, setItem] = React.useState(parsedItem);
  //Function to update the state AND store the tasks in localStorage
  const saveItem = (newItem) => {
    const stringifiedItem = JSON.stringify(newItem);
    localStorage.setItem(itemName, stringifiedItem);
    setItem(newItem);
  }

  return [
    item,
    saveItem
  ];
}


function App() {
  const [todos, saveTodos] = useLocalStorage("TODOS_V1", []);


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
