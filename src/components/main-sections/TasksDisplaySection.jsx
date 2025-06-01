import TaskCard from "./TaskCard";

const TasksDisplay = ({ filterTasks, currentFilter }) => {
    
  return (
    <>
      <section className="add-tasks-sec">
        <h2>Tasks:</h2>
        <h3>{currentFilter}</h3>
        <div className="tasks-list">
          {filterTasks.map((task) => (
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
