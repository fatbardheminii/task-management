import TaskCard from "./TaskCard";

const TasksDisplay = ({ tasks }) => {
  return (
    <>
      <section className="add-tasks-sec">
        <h2>Tasks:</h2>
        <div className="tasks-list">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              project={task.project}
              status={task.status}
              dueDate={task.dueDate}
              importance={task.importance}
            ></TaskCard>
          ))}
        </div>
      </section>
    </>
  );
};

export default TasksDisplay;
