import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import AddProjectForm from "./AddProjectForm";
import ProjectCard from "./ProjectCard";
import { useState } from "react";

const ProjectsSection = ({ projects, onAddProject, tasks, onSetFilter }) => {
    const [showProjectForm, setShowProjectForm] = useState(false);

    const handleToggle = () => {
        setShowProjectForm(!showProjectForm)
    }

    const getTaskCount = (projectName) => {
      return tasks.filter((task) => task.project === projectName).length;
    };

    const handleProjectClick = (projectName) => {
      const projectTasks = tasks.filter((task) => task.project === projectName);
      onSetFilter(projectTasks);
    };

  return (
    <>
      <section className="project-sec">
        <h2>
          Projects{" "}
          {showProjectForm ? (
            <FaMinusCircle
              onClick={handleToggle}
              className="plus-circle"
            ></FaMinusCircle>
          ) : (
            <FaPlusCircle
              onClick={handleToggle}
              className="plus-circle"
            ></FaPlusCircle>
          )}
        </h2>
        {showProjectForm && (
          <AddProjectForm
            onAddProject={(updateFunc) => {
              onAddProject(updateFunc); // update project list
              setShowProjectForm(false); // hide the form after submit
            }}
          />
        )}
        {/* <AddProjectForm onAddProject={onAddProject}></AddProjectForm> */}
        <ul className="project-sec-ul">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              projectName={project.projectName}
              taskCount={getTaskCount(project.projectName)}
              onClick={() => handleProjectClick(project.projectName)}
            ></ProjectCard>
          ))}
        </ul>
      </section>
    </>
  );
};

export default ProjectsSection;
