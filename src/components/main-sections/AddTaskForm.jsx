import { useState } from "react";

const AddTaskForm = ({onAddTask}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [importance, setImportance] = useState("");

  const HandleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
        id: Date.now(),
        title: title,
        description: description,
        project: project,
        status: status,
        dueDate: dueDate,
        importance: importance
    }

    onAddTask((prev) => [...prev, newTask]);

    setTitle('');
    setDescription('');
    setProject('');
    setStatus('');
    setDueDate('');
    setImportance('');
  }

  return (
    <form onSubmit={HandleSubmit} className="add-task-form">
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <label htmlFor="project">Project:</label>
      <input
        type="text"
        name="project"
        value={project}
        onChange={(e) => setProject(e.target.value)}
        required
      />
      <label htmlFor="status">Status:</label>
      <input
        type="text"
        name="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
      />
      <label htmlFor="due-date">Due Date:</label>
      <input
        type="date"
        name="due-date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <label htmlFor="importance">Importance:</label>
      <input
        type="text"
        name="importance"
        value={importance}
        onChange={(e) => setImportance(e.target.value)}
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
