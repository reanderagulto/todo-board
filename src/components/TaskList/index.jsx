import { todoStore } from '@stores/todo.store';
import RemoveTask from '@components/TaskActions/RemoveTask';
import { titleCase } from '@utils/function.strings';

const TaskList = () => {

    const { todos, hasHydrated } = todoStore();

    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {!hasHydrated ? (
                        [...Array(3)].map((_, i) => (
                        <tr key={i}>
                            <td><div className="skeleton h-4 w-8" /></td>
                            <td><div className="skeleton h-4 w-32" /></td>
                            <td><div className="skeleton h-4 w-20" /></td>
                            <td><div className="skeleton h-4 w-24" /></td>
                        </tr>
                        ))
                    ) : todos.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center text-base-content/60">
                                No tasks found
                            </td>
                        </tr>
                    ) : (
                        todos.map((todo, index) => (
                            <tr key={todo.id}>
                                <td>{todo.name}</td>
                                <td>{titleCase(todo.status)}</td>
                                <td>
                                    <RemoveTask id={todo.id} />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default TaskList
