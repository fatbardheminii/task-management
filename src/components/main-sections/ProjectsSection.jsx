import { useState, useContext, useEffect, useRef } from "react";
import {
  FaPlusCircle,
  FaMinusCircle,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { TaskContext } from "../../contexts/TaskContext";
import AddProjectForm from "./AddProjectForm";
import ProjectCard from "./ProjectCard";

const ProjectsSection = ({ onSetFilter }) => {
  const { state, dispatch } = useContext(TaskContext);
  const { projects, tasks } = state;
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sectionRef.current && !sectionRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleForm = () => {
    setShowProjectForm(!showProjectForm);
    setEditProject(null);
  };

  const handleEdit = (project) => {
    setEditProject(project);
    setShowProjectForm(true);
  };

  const handleDelete = (project) => {
    dispatch({
      type: "DELETE_PROJECT",
      payload: { id: project.id, projectName: project.projectName },
    });
  };

  const handleFilter = (projectName) => {
    const filteredTasks = tasks.filter((task) => task.project === projectName);
    dispatch({
      type: "SET_FILTER",
      payload: { tasks: filteredTasks, filterName: projectName },
    });
    onSetFilter(filteredTasks, projectName);
  };

  const getTaskCount = (projectName) => {
    return tasks.filter((task) => task.project === projectName).length;
  };

  return (
    <section className={`project-sec ${isOpen ? "show" : ""}`} ref={sectionRef}>
      <div className="project-sec-header" onClick={toggleSection}>
        <h2>Projects</h2>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      <div className="project-sec-ul">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            taskCount={getTaskCount(project.projectName)}
            onClick={() => handleFilter(project.projectName)}
            onEdit={(e) => {
              e.stopPropagation();
              handleEdit(project);
            }}
            onDelete={(e) => {
              e.stopPropagation();
              handleDelete(project);
            }}
          />
        ))}
      </div>
      {showProjectForm && (
        <AddProjectForm
          projectToEdit={editProject}
          setShowProjectForm={setShowProjectForm}
        />
      )}
      <h2 className="add-project-heading">
        Add Project{" "}
        {showProjectForm ? (
          <FaMinusCircle className="plus-circle" onClick={handleToggleForm} />
        ) : (
          <FaPlusCircle className="plus-circle" onClick={handleToggleForm} />
        )}
      </h2>
    </section>
  );
};

export default ProjectsSection;
