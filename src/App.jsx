import Header from '@components/Header';
import AddTask from '@components/TaskActions/AddTask';
import TaskList from '@components/TaskList';

function App() {
    return (
        <main>
            <Header />
            <div className="container mt-8">
                <AddTask />
                <TaskList />
            </div>
        </main>
    )
}

export default App
