import { useState } from "react";
import { todoStore } from "@stores/todo.store"
import AddIcon from '@mui/icons-material/Add';

const AddTask = () => {
  const [taskInfo, setTaskInfo] = useState({
    id: crypto.randomUUID(),
    name: '', 
    date: '', 
    status: 'active'
  });
  
  const { addTodo } = todoStore();
  const addTask = (e) => {
    e.preventDefault();
    if (!taskInfo.name.trim()) return;

    addTodo(taskInfo);
    handleClose();
  }

  const handleClose = () => {
    setTaskInfo({
      id: crypto.randomUUID(),
      name: '',
      date: '',
      status: 'active',
    });
    document.getElementById('add_modal').close();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTaskInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full my-4 flex items-end justify-end">
      <button 
        className="btn flex items-center justify-center px-4"
        onClick={
            ()=>document.getElementById('add_modal').showModal()
        }
      >
        <AddIcon color="success" fontSize="medium" /> Add Task
      </button>
      <dialog id="add_modal" className="modal">
        <form 
          className="modal-box" 
          onSubmit={addTask}
        >
          <fieldset className="fieldset">
            <legend 
              className="fieldset-legend mb-2"
            >
              Task Name
            </legend>
            <input 
              type="text" 
              name="name"
              value={taskInfo.name}
              className="input w-full" 
              placeholder="Name" 
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset mt-4">
            <legend 
              className="fieldset-legend mb-2"
            >
              Status
            </legend>
            <select 
              className="select w-full" 
              name="status"
              value={taskInfo.status}
              onChange={handleChange}
            >
              <option disabled={true}>Status</option>
              <option value="active">Active</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </fieldset>
          <fieldset className="fieldset mt-4">
            <legend 
              className="fieldset-legend mb-2"
            >
              Completion Date
            </legend>
            <input 
              type="date" 
              name="date"
              value={taskInfo.date}
              className="input w-full"
              onChange={handleChange}
            />
          </fieldset>
          
          <div className="modal-action">
            <button 
              type="submit"
                className="btn px-4"
            >
              Submit
            </button>
            <button 
              className="btn px-4"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
    </div>
  )
}

export default AddTask
