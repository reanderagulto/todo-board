import { todoStore } from '@stores/todo.store';
import RemoveTask from '@components/TaskActions/RemoveTask';
import EditTask from '@components/TaskActions/EditTask';

import BoltIcon from '@mui/icons-material/Bolt';
import SyncIcon from '@mui/icons-material/Sync';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const taskStatusIcons = {
    active: <BoltIcon color="info" fontSize="medium" />,  
    ongoing: <SyncIcon color="warning" fontSize="medium" />,
    completed: <TaskAltIcon color="success" fontSize="medium" />,
};

const TaskList = () => {
    const { todos, hasHydrated } = todoStore();

    return (
        <div className="overflow-x-auto">
            <ul className="list bg-base-100 rounded-box shadow-md">
            {!hasHydrated ? (
                [...Array(3)].map((_, i) => (
                    <li className="skeleton list-row" key={i}>
                        <div className="skeleton h-6 w-6 rounded-sm"></div>
                        <div className="skeleton h-4 w-20"></div>
                        <div className="skeleton h-6 w-6 rounded-sm"></div>
                        <div className="skeleton h-6 w-6 rounded-sm"></div>
                        <div className="skeleton h-6 w-6 rounded-sm"></div>
                    </li>
                ))
            ) : todos.length === 0 ? (
                <li className="list-row rounded-box border border-base-content/5 bg-base-100 mb-5 p-4">
                    <span className="text-center text-base-content/60">
                        No tasks found
                    </span>
                </li>
            ) : (
                todos.map((todo, index) => (
                <li className="list-row rounded-box border border-base-content/5 bg-base-100 mb-5" key={index}>
                    <div className="flex items-center">
                        {taskStatusIcons[todo.status]}
                    </div>
                    <div className="flex items-center text-base-content/60 list-col-grow">
                        {todo.name}
                    </div>
                    <EditTask id={todo.id} />
                    <RemoveTask id={todo.id} />
                </li>
                ))
            )}
            </ul>
        </div>
    );
};

export default TaskList;
