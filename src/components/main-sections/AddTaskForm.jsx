import { useState, useContext } from "react";
import { isToday, isThisWeek, parseISO } from "date-fns";
import { TaskContext } from "../../contexts/TaskContext";

const AddTaskForm = ({ setShowForm }) => {
  const { dispatch, state } = useContext(TaskContext);
  const { projects } = state;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [importance, setImportance] = useState("");

  const formatDateInput = (value) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length >= 5) {
      return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(
        4,
        8
      )}`;
    } else if (digits.length >= 3) {
      return `${digits.slice(0, 2)}-${digits.slice(2, 4)}`;
    }
    return digits;
  };

  const isValidDate = (dateString) => {
    if (!dateString || dateString.length !== 10) return false;
    const [day, month, year] = dateString.split("-").map(Number);
    if (!day || !month || !year) return false;
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900)
      return false;
    const date = new Date(year, month - 1, day);
    return date.getDate() === day && date.getMonth() === month - 1;
  };

  const handleDateChange = (e) => {
    const formatted = formatDateInput(e.target.value);
    setDueDate(formatted);
  };

  const convertToISODate = (ddmmyyyy) => {
    const [day, month, year] = ddmmyyyy.split("-");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (!isValidDate(dueDate)) {
      alert("Please enter a valid date in dd-mm-yyyy format.");
      return;
    }

    const isoDate = convertToISODate(dueDate);
    const newTask = {
      id: Date.now(),
      title,
      description,
      project,
      status,
      dueDate: isoDate,
      importance,
    };

    dispatch({ type: "ADD_TASK", payload: newTask });

    const parsedDate = parseISO(isoDate);
    if (isToday(parsedDate)) {
      dispatch({ type: "ADD_TODAY_TASK", payload: newTask });
    }
    if (isThisWeek(parsedDate, { weekStartsOn: 1 })) {
      dispatch({ type: "ADD_WEEK_TASK", payload: newTask });
    }
    if (importance === "high") {
      dispatch({ type: "ADD_IMPORTANT_TASK", payload: newTask });
    }

    const projectExists = projects.some((p) => p.projectName === project);
    if (!projectExists && project.trim()) {
      const newProject = {
        id: Date.now() + Math.random(),
        projectName: project,
      };
      dispatch({ type: "ADD_PROJECT", payload: newProject });
    }

    setTitle("");
    setDescription("");
    setProject("");
    setStatus("");
    setDueDate("");
    setImportance("");
    setShowForm(false);
  };

  return (
    <form onSubmit={HandleSubmit} className="add-task-form">
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <label htmlFor="project">Project:</label>
      <input
        type="text"
        name="project"
        id="project"
        value={project}
        onChange={(e) => setProject(e.target.value)}
        required
      />
      <label htmlFor="status">Status:</label>
      <select
        name="status"
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
      >
        <option value="">--Select status--</option>
        <option value="notStarted">Not started</option>
        <option value="inProgress">In Progress</option>
        <option value="finished">Finished</option>
      </select>
      <label htmlFor="due-date">Due Date:</label>
      <input
        type="text"
        name="due-date"
        placeholder="dd-mm-yyyy"
        value={dueDate}
        onChange={handleDateChange}
        required
      />
      <label htmlFor="importance">Importance:</label>
      <select
        name="importance"
        id="importance"
        value={importance}
        onChange={(e) => setImportance(e.target.value)}
        required
      >
        <option value="">--Select importance--</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
