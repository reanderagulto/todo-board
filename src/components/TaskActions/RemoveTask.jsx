import { todoStore } from "@stores/todo.store";
import DeleteIcon from '@mui/icons-material/Delete';
 
const RemoveTask = ({
  id
}) => {
  const { removeTodo } = todoStore();
  const removeTask = () => {
    removeTodo(id);
    handleClose();
  }
  const handleClose = () => {
    document.getElementById('remove_modal').close()
  }
  return (
    <>
      <button 
        className="btn btn-active btn-error px-3" 
        onClick={
          ()=>document.getElementById('remove_modal').showModal()
        }
      >
        <DeleteIcon color="error" fontSize="medium" />
      </button>
      <dialog id="remove_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Remove Task</h3>
          <p className="py-4">Are you sure you want to remove the task?</p>
          <div className="modal-action">
            <form method="dialog">
              <button 
                className="btn btn-active btn-error px-3 mr-3"
                onClick={removeTask}
              >
                Remove
              </button>
              <button 
                className="btn px-3"
                onClick={handleClose}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default RemoveTask
