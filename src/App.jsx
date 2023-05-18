import { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoComputed from "./components/TodoComputed";
import TodoCreate from "./components/TodoCreate";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";

// const initialStateTodos = [
//     { id: 1, title: "Complete online JavaScript course", completed: true },
//     { id: 2, title: "Jog around the park 3x", completed: false },
//     { id: 3, title: "10 minutes meditation", completed: false },
//     { id: 4, title: "Read for 1 hour", completed: false },
//     { id: 5, title: "Pick up groceries", completed: false },
//     { id: 6, title: "Complete Todo App on Frontend Mentor", completed: false },
// ];

const initialStateTodos = JSON.parse(localStorage.getItem("todos")) || [];

const App = () => {
    const [todos, setTodos] = useState(initialStateTodos);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);
    const createTodo = (title) => {
        const newTodo = {
            id: Date.now(),
            title: title,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };
    const updateTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };
    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };
    const clearCompleted = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    };
    const todosLeft = todos.filter((todo) => !todo.completed).length;

    const filterTodos = () => {
        switch (filter) {
            case "all":
                return todos;
            case "active":
                return todos.filter((todo) => !todo.completed);
            case "completed":
                return todos.filter((todo) => todo.completed);
        }
    };
    const changeFilter = (filtro) => {
        setFilter(filtro);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const startIndex = result.source.index;
        const endIndex = result.destination.index;

        const items = [...todos];
        // con splice estamos eliminando un elemento del array y devolviendo ese elemento
        const [reorderedItem] = items.splice(startIndex, 1);

        // con splice estamos insertando un elemento en el array
        items.splice(endIndex, 0, reorderedItem);

        setTodos(items);
    };
    return (
        <div
            className="min-h-screen bg-gray-200 bg-[url('./assets/images/bg-mobile-light.jpg')]
            bg-contain bg-no-repeat dark:bg-gray-900 dark:bg-[url('./assets/images/bg-mobile-dark.jpg')] md:bg-[url('./assets/images/bg-desktop-light.jpg')]
            md:dark:bg-[url('./assets/images/bg-desktop-dark.jpg')]"
        >
            <Header />

            <main className="container mx-auto mt-8 max-w-xl px-4">
                <TodoCreate createTodo={createTodo} />
                <TodoList
                    todos={filterTodos()}
                    removeTodo={removeTodo}
                    updateTodo={updateTodo}
                    handleDragEnd={handleDragEnd}
                />
                <TodoComputed
                    clearCompleted={clearCompleted}
                    todosLeft={todosLeft}
                />
                <TodoFilter changeFilter={changeFilter} filter={filter} />
            </main>

            <footer className="mt-8 text-center dark:text-gray-400">
                Drag and drop to reorder list
            </footer>
        </div>
    );
};
export default App;
