import InboxSection from "./main-sections/InboxSection";
import ProjectsSection from "./main-sections/ProjectsSection";
import AddTaskSection from "./main-sections/AddTaskSection";
import TasksDisplay from "./main-sections/TasksDisplaySection";
import { useState, useEffect } from "react";

const MainSection = () => {
    const [tasks, setTasks] = useState([]);
    const [todayTasks, setTodayTasks] = useState([]);
    const [thisWeekTasks, setThisWeekTasks] = useState([]);
    const [importantTasks, setImportantTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [filterTasks, setFilterTasks] = useState([]);

    useEffect(() => {
      setFilterTasks(tasks);
    }, []);

    return (
      <main>
        <div className="left-side">
          <InboxSection
            tasks={tasks}
            todayTasks={todayTasks}
            thisWeekTasks={thisWeekTasks}
            importantTasks={importantTasks}
            onSetFilter={setFilterTasks}
          ></InboxSection>
          <ProjectsSection
            projects={projects}
            onAddProject={setProjects}
            tasks={tasks}
            onSetFilter={setFilterTasks}
          ></ProjectsSection>
        </div>
        <div className="right-side">
          <AddTaskSection
            onAddTask={setTasks}
            onAddTodayTask={setTodayTasks}
            onAddThisWeekTask={setThisWeekTasks}
            onAddImportantTask={setImportantTasks}
            onAddProject={setProjects}
            projects={projects}
          />
          <TasksDisplay
            filterTasks={filterTasks}
            onSetFilter={setFilterTasks}
            tasks={tasks}
            todayTasks={todayTasks}
            thisWeekTasks={thisWeekTasks}
            importantTasks={importantTasks}
          ></TasksDisplay>
        </div>
      </main>
    );
};

export default MainSection;