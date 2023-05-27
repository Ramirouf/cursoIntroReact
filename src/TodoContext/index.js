import React from "react";
import { useLocalStorage } from "./useLocalStorage";

//TodoContext has Provider and Consumer
const TodoContext = React.createContext();

function TodoProvider(props) {
    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
    } = useLocalStorage("TODOS_V1", []);


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
    }
    const deleteTodo = (text) => {
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos.splice(todoIndex, 1); // Remove the todo
        saveTodos(newTodos); //Update the state
    }

    return (
        //wraps whole app
        //wraps all components which call Consumer
        <TodoContext.Provider value={{
            loading,
            error,
            totalTodos,
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            deleteTodo,
        }}>
            {props.children}
        </TodoContext.Provider>
    )
}

export { TodoContext, TodoProvider };