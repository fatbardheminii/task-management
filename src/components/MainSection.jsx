import InboxSection from "./main-sections/InboxSection";
import ProjectsSection from "./main-sections/ProjectsSection";
import AddTaskSection from "./main-sections/AddTaskSection";
import TasksDisplay from "./main-sections/TasksDisplaySection";
import AddTaskForm from "./main-sections/AddTaskForm";
import AddProjectForm from "./main-sections/AddProjectForm";
import { useState } from "react";

const MainSection = () => {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);

    return (
      <main>
        <div className="left-side">
          <InboxSection></InboxSection>
          <ProjectsSection
            projects={projects}
            onAddProject={setProjects}
          ></ProjectsSection>
        </div>
        <div className="right-side">
          <AddTaskSection onAddTask={setTasks}></AddTaskSection>
          <TasksDisplay tasks={tasks}></TasksDisplay>
        </div>
      </main>
    );
};

export default MainSection;