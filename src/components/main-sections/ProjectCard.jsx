const ProjectCard = ({ project, taskCount, onClick, onEdit, onDelete }) => {
  return (
    <div className="project-card">
      <div onClick={onClick}>
        <div>{project.projectName}</div>
        <span>{taskCount}</span>
      </div>
      <div>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ProjectCard;
