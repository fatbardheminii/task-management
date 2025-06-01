const ProjectCard = ({ projectName, taskCount, onClick }) => {
  return (
    <div onClick={onClick}>
      <div>{projectName}</div>
      <span>{taskCount}</span>
    </div>
  );
};

export default ProjectCard;
