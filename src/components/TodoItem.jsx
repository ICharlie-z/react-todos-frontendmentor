import React from "react";
import IconCheck from "./icons/IconCheck";
import IconCross from "./icons/IconCross";

const TodoItem = React.forwardRef(
    ({ todo, removeTodo, updateTodo, ...props }, ref) => {
        const { title, id, completed } = todo;
        return (
            <article
                className="flex gap-4 border-b border-b-gray-400 dark:bg-gray-800"
                ref={ref}
                {...props}
            >
                {completed ? (
                    <button
                        onClick={() => updateTodo(id)}
                        className="flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 bg-gradient-to-r
                from-indigo-500 via-purple-500 to-pink-500"
                    >
                        <IconCheck />
                    </button>
                ) : (
                    <button
                        onClick={() => updateTodo(id)}
                        className="inline-block h-5 w-5 flex-none rounded-full border-2"
                    />
                )}
                <p
                    className={`grow text-gray-600 dark:text-gray-400 ${
                        completed && "line-through"
                    }`}
                >
                    {title}
                </p>
                <button className="flex-none" onClick={() => removeTodo(id)}>
                    <IconCross></IconCross>
                </button>
            </article>
        );
    }
);
export default TodoItem;
