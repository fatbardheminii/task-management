import { useState, useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";

const AddProjectForm = ({ projectToEdit = null, setShowProjectForm }) => {
  const { dispatch } = useContext(TaskContext);
  // Modified to initialize state with projectToEdit name if provided
  const [projectName, setProjectName] = useState(
    projectToEdit ? projectToEdit.projectName : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Modified to reuse project ID if editing, otherwise generate new
    const project = {
      id: projectToEdit ? projectToEdit.id : Date.now(),
      projectName: projectName,
    };
    // Modified to dispatch EDIT_PROJECT if editing, ADD_PROJECT if creating
    const actionType = projectToEdit ? "EDIT_PROJECT" : "ADD_PROJECT";
    dispatch({
      type: actionType,
      payload: projectToEdit
        ? { ...project, oldName: projectToEdit.projectName }
        : project,
    });
    setProjectName("");
    setShowProjectForm(false);
  };

  return (
    <form onSubmit={handleSubmit} className="add-project-form">
      <label htmlFor="project-name">Project Name:</label>
      <input
        type="text"
        name="project-name"
        placeholder="Add project name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        required
      />
      <button type="submit">
        {projectToEdit ? "Update Project" : "Add Project"}
      </button>
    </form>
  );
};

export default AddProjectForm;
