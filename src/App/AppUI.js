import React from "react";
import { TodoCounter } from "../TodoCounter";
import { CreateTodoButton } from "../CreateTodoButton";
import { TodoItem } from "../TodoItem";
import { TodoList } from "../TodoList";
import { TodoSearch } from "../TodoSearch";

function AppUI({
    totalTodos,
    completedTodos,
    searchedTodos,
    searchValue,
    setSearchValue,
    completeTodo,
    deleteTodo
}) {
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

export { AppUI };