import { useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TaskContext } from "../../contexts/TaskContext";

const TaskCard = ({ task, onEdit }) => {
  const { dispatch } = useContext(TaskContext);
  let cardClass = "task-card";
  if (task.importance === "low") cardClass += " low-importance";
  else if (task.importance === "medium") cardClass += " medium-importance";
  else if (task.importance === "high") cardClass += " high-importance";

  return (
    <div className={cardClass}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Project: {task.project || "None"}</p>
      <p>Status: {task.status || "Not set"}</p>
      <p>Due: {task.dueDate}</p>
      <p>Importance: {task.importance}</p>
      <div className="task-card-actions">
        <FaEdit onClick={() => onEdit(task)} className="edit-icon" />
        <FaTrash
          onClick={() => dispatch({ type: "DELETE_TASK", payload: task.id })}
          className="delete-icon"
        />
      </div>
    </div>
  );
};

export default TaskCard;
