import React from "react";
import "./TodoItem.css"

function TodoItem(props) {
    return (
        <li className="TodoItem">
            {/* if completed === true --> adds class Icon-check--active to the span*/}
            <span className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}>√</span>
            {/* if completed === true --> adds class TodoItem-p--complete to the span */}
            <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>{props.text}</p>
            <span className="Icon Icon-delete">X</span>
        </li>
    )
}

export { TodoItem }