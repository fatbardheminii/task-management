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
    const [currentFilter, setCurrentFilter] = useState('All Tasks');

    useEffect(() => {
      setFilterTasks(tasks);
      setCurrentFilter('All Tasks');
    }, [tasks]);

    const handleSetFilter = (tasksArray, filterName) => {
      setFilterTasks(tasksArray);
      setCurrentFilter(filterName);
    };

    return (
      <main>
        <div className="left-side">
          <InboxSection
            tasks={tasks}
            todayTasks={todayTasks}
            thisWeekTasks={thisWeekTasks}
            importantTasks={importantTasks}
            onSetFilter={handleSetFilter}
          ></InboxSection>
          <ProjectsSection
            projects={projects}
            onAddProject={setProjects}
            tasks={tasks}
            onSetFilter={handleSetFilter}
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
            currentFilter={currentFilter}
            onSetFilter={handleSetFilter}
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