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
            <InboxSection></InboxSection>
            <ProjectsSection projects={projects}></ProjectsSection>
            <AddProjectForm onAddProject={setProjects}></AddProjectForm>
            <AddTaskSection></AddTaskSection>
            <AddTaskForm onAddTask={setTasks}></AddTaskForm>            
            <TasksDisplay tasks={tasks}></TasksDisplay>
        </main>
    )
};

export default MainSection;