import { useState, useContext, useEffect, useRef } from "react";
import {
  FaPlusCircle,
  FaEdit,
  FaTrash,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { TaskContext } from "../../contexts/TaskContext";

const ProjectsSection = () => {
  const { state, dispatch } = useContext(TaskContext);
  const { projects, tasks } = state;
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");
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

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    if (editProject) {
      dispatch({
        type: "EDIT_PROJECT",
        payload: {
          id: editProject.id,
          projectName,
          oldName: editProject.projectName,
        },
      });
    } else {
      dispatch({
        type: "ADD_PROJECT",
        payload: {
          id: Date.now() + Math.random(),
          projectName,
        },
      });
    }

    setProjectName("");
    setShowForm(false);
    setEditProject(null);
  };

  const handleEdit = (project) => {
    setEditProject(project);
    setProjectName(project.projectName);
    setShowForm(true);
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
      <ul className="project-sec-ul">
        {projects.map((project) => (
          <li
            key={project.id}
            className="project-sec-li"
            onClick={() => handleFilter(project.projectName)}
          >
            <div className="project-sec-li-header">
              <p>{project.projectName}</p>
              <span className="project-tasks-num">
                {getTaskCount(project.projectName)}
              </span>
            </div>
            <div className="project-actions">
              <FaEdit
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(project);
                }}
                className="edit-icon"
              />
              <FaTrash
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(project);
                }}
                className="delete-icon"
              />
            </div>
          </li>
        ))}
      </ul>
      {showForm && (
        <form className="add-project-form" onSubmit={handleAddProject}>
          <label htmlFor="project-name">Project Name:</label>
          <input
            type="text"
            id="project-name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
          <button type="submit">
            {editProject ? "Update Project" : "Add Project"}
          </button>
        </form>
      )}
      <h2 className="add-project-heading">
        Add Project{" "}
        <FaPlusCircle
          className="plus-circle"
          onClick={() => setShowForm(true)}
        />
      </h2>
    </section>
  );
};

export default ProjectsSection;
