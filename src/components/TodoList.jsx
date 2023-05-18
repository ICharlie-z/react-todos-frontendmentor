import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, removeTodo, updateTodo, handleDragEnd }) => {
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todos">
                {(dropppableProvided) => (
                    <div
                        className="mt-8 rounded-t-md bg-white [&>article]:p-4"
                        ref={dropppableProvided.innerRef}
                        {...dropppableProvided.droppableProps}
                    >
                        {todos.map((todo, index) => (
                            <Draggable
                                key={todo.id}
                                draggableId={`${todo.id}`}
                                index={index}
                            >
                                {(draggableProvided) => (
                                    <TodoItem
                                        todo={todo}
                                        removeTodo={removeTodo}
                                        updateTodo={updateTodo}
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.draggableProps}
                                        {...draggableProvided.dragHandleProps}
                                    ></TodoItem>
                                )}
                            </Draggable>
                        ))}
                        {dropppableProvided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};
export default TodoList;
