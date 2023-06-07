import React from "react";
import { TodoContext } from "../TodoContext";
import { TodoCounter } from "../TodoCounter";
import { CreateTodoButton } from "../CreateTodoButton";
import { TodoItem } from "../TodoItem";
import { TodoList } from "../TodoList";
import { TodoSearch } from "../TodoSearch";

function AppUI() {
    //This is the value stored in our provider 
    //const value = React.useContext(TodoContext); //Same value we would be receiving from calling our Consumer in the render props function

    const { error, loading, searchedTodos, completeTodo, deleteTodo } = React.useContext(TodoContext);
    //With useContext set, we can erase TodoContext.Consumer

    return (
        //React defines that only 1 element can be returned per component. That's why "ReactFragment" is used
        //ReactFragment is an invisible container
        < React.Fragment >
            <TodoCounter />
            <TodoSearch />

            <TodoList> {/*Container of TODOs*/}
                {error && <p>There was en error</p> /*If error is true, show p*/}
                {loading && <p>Loading...</p> /*If loading is true, show p*/}
                {(!loading && !searchedTodos.length) && <p>Create your first ToDo</p> /*It not loading, and searchedTodos is empty, render p*/}

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

export { AppUI };