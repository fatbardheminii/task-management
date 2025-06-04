import { useState, useContext, useRef, useEffect } from "react";
import { FaEdit, FaTrash, FaTimes, FaEye } from "react-icons/fa";
import { TaskContext } from "../../contexts/TaskContext";

const TaskCard = ({ task, onEdit }) => {
  const { dispatch } = useContext(TaskContext);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const modalRef = useRef(null);

  // Handle clicks outside the modal to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowDescriptionModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debug click on eye icon
  const handleEyeClick = () => {
    setShowDescriptionModal(true);
  };

  let cardClass = "task-card";
  if (task.importance === "low") cardClass += " low-importance";
  else if (task.importance === "medium") cardClass += " medium-importance";
  else if (task.importance === "high") cardClass += " high-importance";

  return (
    <div className={cardClass}>
      <h3>{task.title}</h3>
      <div className="task-description-wrapper">
        <p className="task-description">{task.description}</p>
        {task.description.length > 30 && (
          <FaEye
            className="description-more"
            onClick={handleEyeClick}
            title="View full description"
          />
        )}
      </div>
      {showDescriptionModal && (
        <div className="description-modal">
          <div className="description-modal-content" ref={modalRef}>
            <button
              className="description-modal-close"
              onClick={() => setShowDescriptionModal(false)}
              title="Close"
            >
              <FaTimes />
            </button>
            <p>{task.description}</p>
          </div>
        </div>
      )}
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
