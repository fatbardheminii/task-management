import { FaEdit, FaTrash } from "react-icons/fa";

const ProjectCard = ({ project, taskCount, onClick, onEdit, onDelete }) => {
  return (
    <div className="project-card" onClick={onClick}>
      <div>
        <div>{project.projectName}</div>
        <span>{taskCount}</span>
      </div>
      <div>
        <FaEdit className="edit-icon" onClick={onEdit} />
        <FaTrash className="delete-icon" onClick={onDelete} />
      </div>
    </div>
  );
};

export default ProjectCard;
