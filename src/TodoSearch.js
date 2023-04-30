import React from "react";
import "./TodoSearch.css"

function TodoSearch() {
    const onSearchValueChange = (event) => {
        console.log(event.target.value);
    };
    return (
        //The value we write here, changes the TodoItems
        <input
            className="TodoSearch"
            placeholder="sample text"
            onChange={onSearchValueChange}
        />

    );
}

export { TodoSearch }