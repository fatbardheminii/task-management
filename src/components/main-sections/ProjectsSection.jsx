import { useState, useContext } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import AddProjectForm from "./AddProjectForm";
import ProjectCard from "./ProjectCard";
import { TaskContext } from "../../contexts/TaskContext";

const ProjectsSection = ({ onSetFilter }) => {
  const { state } = useContext(TaskContext);
  const { projects, tasks } = state;
  const [showProjectForm, setShowProjectForm] = useState(false);

  const handleToggle = () => {
    setShowProjectForm(!showProjectForm);
  };

  const getTaskCount = (projectName) => {
    return tasks.filter((task) => task.project === projectName).length;
  };

  const handleProjectClick = (projectName) => {
    const projectTasks = tasks.filter((task) => task.project === projectName);
    onSetFilter(projectTasks, projectName);
  };

  return (
    <section className="project-sec">
      <h2>
        Projects{" "}
        {showProjectForm ? (
          <FaMinusCircle onClick={handleToggle} className="plus-circle" />
        ) : (
          <FaPlusCircle onClick={handleToggle} className="plus-circle" />
        )}
      </h2>
      {showProjectForm && <AddProjectForm />}
      <ul className="project-sec-ul">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            projectName={project.projectName}
            taskCount={getTaskCount(project.projectName)}
            onClick={() => handleProjectClick(project.projectName)}
          />
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
