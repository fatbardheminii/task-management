import { useContext } from "react";
import TaskCard from "./TaskCard";
import { TaskContext } from "../../contexts/TaskContext";

const TasksDisplay = () => {
  const { state } = useContext(TaskContext);
  const { filterTasks, currentFilter } = state;

  return (
    <section className="add-tasks-sec">
      <h2>Tasks:</h2>
      <h3>
        {currentFilter} <span>{filterTasks.length}</span>
      </h3>
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
          />
        ))}
      </div>
    </section>
  );
};

export default TasksDisplay;
