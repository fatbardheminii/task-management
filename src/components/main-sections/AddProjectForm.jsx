import { useState, useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";

const AddProjectForm = ({ projectToEdit = null, setShowProjectForm }) => {
  const { dispatch, state } = useContext(TaskContext);
  const { projects } = state;
  const [projectName, setProjectName] = useState(
    projectToEdit ? projectToEdit.projectName : ""
  );
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = projectName.trim();
    if (!trimmedName) {
      setError("Project name cannot be empty.");
      return;
    }

    // Check for duplicate project names (case-insensitive)
    const isDuplicate = projects.some(
      (p) =>
        p.projectName.toLowerCase() === trimmedName.toLowerCase() &&
        (!projectToEdit || p.id !== projectToEdit.id)
    );
    if (isDuplicate) {
      setError("A project with this name already exists.");
      return;
    }

    const project = {
      id: projectToEdit ? projectToEdit.id : Date.now(),
      projectName: trimmedName,
    };

    const actionType = projectToEdit ? "EDIT_PROJECT" : "ADD_PROJECT";
    dispatch({
      type: actionType,
      payload: projectToEdit
        ? { ...project, oldName: projectToEdit.projectName }
        : project,
    });

    setProjectName("");
    setError("");
    setShowProjectForm(false);
  };

  return (
    <form onSubmit={handleSubmit} className="add-project-form">
      <label htmlFor="project-name">Project Name:</label>
      <input
        type="text"
        name="project-name"
        id="project-name"
        placeholder="Add project name"
        value={projectName}
        onChange={(e) => {
          setProjectName(e.target.value);
          setError("");
        }}
        required
      />
      {error && <p style={{ color: "red", fontSize: "0.8rem" }}>{error}</p>}
      <button type="submit">
        {projectToEdit ? "Update Project" : "Add Project"}
      </button>
    </form>
  );
};

export default AddProjectForm;
