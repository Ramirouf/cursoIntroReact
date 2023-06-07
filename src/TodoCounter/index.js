import React from "react";
import "./TodoCounter.css";
import { TodoContext } from "../TodoContext";

//Won't receive props anymore. Now Context will be used.
function TodoCounter() {
    const { completedTodos, totalTodos } = React.useContext(TodoContext);
    return (
        <h2 className="TodoCounter">You've completed {completedTodos} of {totalTodos} TODOs</h2>

    )
}

export { TodoCounter };