import React from "react";
import "./TodoItem.css"

function TodoItem(props) {
    const onComplete = () => {
        alert(`Task ${props.text} completed`)
    }
    const onDelete = () => {
        alert(`Task ${props.text} deleted`)
    }
    return (
        <li className="TodoItem">
            {/* if completed === true --> adds class Icon-check--active to the span*/}
            <span
                className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
                onClick={onComplete}
            >√</span>
            {/* if completed === true --> adds class TodoItem-p--complete to the span */}
            <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>{props.text}</p>
            <span
                className="Icon Icon-delete"
                onClick={onDelete}
            >X</span>
        </li>
    )
}

export { TodoItem }