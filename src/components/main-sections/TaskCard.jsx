const TaskCard = ({
  title,
  description,
  project,
  status,
  dueDate,
  importance,
}) => {
  return (
    <div className="task-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{project}</p>
      <p>{status}</p>
      <p>{dueDate}</p>
      <p>{importance}</p>
    </div>
  );
};

export default TaskCard;
