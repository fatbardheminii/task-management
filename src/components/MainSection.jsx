import { useContext } from "react";
import InboxSection from "./main-sections/InboxSection";
import ProjectsSection from "./main-sections/ProjectsSection";
import AddTaskSection from "./main-sections/AddTaskSection";
import TasksDisplay from "./main-sections/TasksDisplaySection";
import { TaskContext } from "../contexts/TaskContext";

const MainSection = () => {
  const { dispatch } = useContext(TaskContext);

  const handleSetFilter = (tasksArray, filterName) => {
    dispatch({
      type: "SET_FILTER",
      payload: { tasks: tasksArray, filterName },
    });
  };

  return (
    <main>
      <div className="left-side">
        <InboxSection onSetFilter={handleSetFilter} />
        <ProjectsSection onSetFilter={handleSetFilter} />
      </div>
      <div className="right-side">
        <AddTaskSection />
        <TasksDisplay />
      </div>
    </main>
  );
};

export default MainSection;
