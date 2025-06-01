import { useState } from "react";

const AddProjectForm = ({ onAddProject }) => {
  const [projectName, setProjectName] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      id: Date.now(),
      projectName: projectName,
    };

    onAddProject((prev) => [...prev, newProject]);

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
        <button type="submit" onSubmit={HandleSubmit}>
          Add Project
        </button>
      </form>
  );
};

export default AddProjectForm;
