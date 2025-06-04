import { useState, useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";
import AddTaskForm from "./AddTaskForm";
import TaskCard from "./TaskCard";

const TasksDisplay = () => {
  const { state } = useContext(TaskContext);
  const { filterTasks, currentFilter } = state;
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleEdit = (task) => {
    if (showForm && taskToEdit && taskToEdit.id === task.id) {
      setShowForm(false);
      setTaskToEdit(null);
    } else {
      setTaskToEdit(task);
      setShowForm(true);
    }
  };

  return (
    <section className="tasks-display">
      <h2 className="tasks-display-header">{currentFilter}</h2>
      {showForm && (
        <AddTaskForm setShowForm={setShowForm} taskToEdit={taskToEdit} />
      )}
      <div className="tasks-list">
        {filterTasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          filterTasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={handleEdit} />
          ))
        )}
      </div>
    </section>
  );
};

export default TasksDisplay;
