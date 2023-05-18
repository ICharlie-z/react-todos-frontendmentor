const TodoComputed = ({ clearCompleted, todosLeft }) => {
    return (
        <section className="flex justify-between rounded-b-md bg-white px-4 py-4 text-gray-400 dark:bg-gray-800">
            <span> {todosLeft} items left</span>
            <button
                onClick={() => {
                    clearCompleted();
                }}
            >
                Clear Completed
            </button>
        </section>
    );
};
export default TodoComputed;
