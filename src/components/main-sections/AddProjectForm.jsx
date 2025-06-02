import { useState, useContext } from "react";
import { TaskContext } from "../../contexts/TaskContext";

const AddProjectForm = () => {
  const { dispatch } = useContext(TaskContext);
  const [projectName, setProjectName] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      id: Date.now(),
      projectName: projectName,
    };
    dispatch({ type: "ADD_PROJECT", payload: newProject });
    setProjectName("");
  };

  return (
    <form onSubmit={HandleSubmit} className="add-project-form">
      <label htmlFor="project-name">Project Name:</label>
      <input
        type="text"
        name="project-name"
        placeholder="Add project name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <button type="submit">Add Project</button>
    </form>
  );
};

export default AddProjectForm;
