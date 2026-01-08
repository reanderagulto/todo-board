import { useState } from 'react';
import { todoStore } from '@stores/todo.store';
import EditIcon from '@mui/icons-material/Edit';

const EditTask = ({
  id = ''
}) => {
  const { getTodoById, editTodo } = todoStore();
  const [taskInfo, setTaskInfo] = useState({
    id: '',
    name: '',
    date: '',
    status: ''
  });

  const showModal = () => {
    const todo = getTodoById(id);
    if (!todo) return;

    setTaskInfo({
      id: todo.id,
      name: todo.name,
      date: todo.date,
      status: todo.status
    });

    document.getElementById(`edit_modal_${id}`).showModal();
  }

  const updateTask = (e) => {
    e.preventDefault();
    if (!taskInfo.name.trim()) return;

    editTodo(id, taskInfo);
    handleClose();
  }

  const handleClose = () => {
    document.getElementById(`edit_modal_${id}`).close();
    setTaskInfo({
      id: '',
      name: '',
      date: '',
      status: '',
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTaskInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <button
        className="btn btn-active btn-error px-3"
        onClick={showModal}
        id={id}
      >
        <EditIcon color="success" fontSize="medium" />
      </button>
      <dialog id={`edit_modal_${id}`} className="modal">
        <form 
          className="modal-box" 
          onSubmit={updateTask}
        >
          <fieldset className="fieldset">
            <legend className="fieldset-legend mb-2">
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
            <legend className="fieldset-legend mb-2">
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
              <legend className="fieldset-legend mb-2">
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
              type="button"
              className="btn px-4"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
    </>
  )
}

export default EditTask