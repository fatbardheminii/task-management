import { useState, useContext, useEffect } from "react";
import { isToday, isThisWeek } from "date-fns";
import { FaTimes } from "react-icons/fa";
import { TaskContext } from "../../contexts/TaskContext";
import { parseDDMMYYYY } from "../../utils/dateUtils";

const AddTaskForm = ({ setShowForm, taskToEdit = null }) => {
  const { dispatch, state } = useContext(TaskContext);
  const { projects } = state;
  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [description, setDescription] = useState(taskToEdit?.description || "");
  const [project, setProject] = useState(taskToEdit?.project || "");
  const [status, setStatus] = useState(taskToEdit?.status || "");
  const [dueDate, setDueDate] = useState(taskToEdit?.dueDate || "");
  const [importance, setImportance] = useState(taskToEdit?.importance || "");
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || "");
      setDescription(taskToEdit.description || "");
      setProject(taskToEdit.project || "");
      setStatus(taskToEdit.status || "");
      setDueDate(taskToEdit.dueDate || "");
      setImportance(taskToEdit.importance || "");
      setDateError("");
    }
  }, [taskToEdit]);

  const formatDateInput = (value) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length >= 5) {
      return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4, 8)}`;
    } else if (digits.length >= 3) {
      return `${digits.slice(0, 2)}-${digits.slice(2, 4)}`;
    }
    return digits;
  };

  const isValidDate = (dateString) => {
    if (!dateString || dateString.length !== 10) {
      return false;
    }
    const [day, month, year] = dateString.split("-").map(Number);
    if (!day || !month || !year) {
      return false;
    }
    if (
      day < 1 ||
      day > 31 ||
      month < 1 ||
      month > 12 ||
      year <  1900) {
      return false;
    }
    const date = parseDDMMYYYY(dateString);
    return (
      date &&
      date instanceof Date &&
      !isNaN(date)
    );
  };

  const handleDateChange = (e) => {
    const formatted = formatDateInput(e.target.value);
    setDueDate(formatted);
    setDateError(
      isValidDate(formatted) || formatted.length < 10
        ? ""
        : "Invalid date (dd-mm-yyyy)"
    );
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setProject("");
    setStatus("");
    setDueDate("");
    setImportance("");
    setDateError("");
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidDate(dueDate)) {
      setDateError("Please enter a valid date in dd-mm-yyyy format.");
      return;
    }

    const task = {
      id: taskToEdit ? taskToEdit.id : Date.now() + Math.random(),
      title,
      description,
      project,
      status,
      dueDate,
      importance,
    };

    const actionType = taskToEdit ? "EDIT_TASK" : "ADD_TASK";
    dispatch({ type: actionType, payload: task });

    if (!taskToEdit) {
      const parsedDate = parseDDMMYYYY(dueDate);
      if (isToday(parsedDate)) {
        dispatch({
          type: "ADD_TODAY_TASK",
          payload: task
        });
      }
      if (isThisWeek(parsedDate, { weekStartsOn: 1 })) {
        dispatch({
          type: "ADD_WEEK_TASK",
          payload: task
        });
      }
      if (importance === "high") {
        dispatch({
          type: "ADD_IMPORTANT_TASK",
          payload: task
        });
      }

      const projectExists = projects.some((p) => p.projectName === project);
      if (!projectExists && project.trim()) {
        const newProject = {
          id: Date.now() + Math.random(),
          projectName: project,
        };
        dispatch({
          type: "ADD_PROJECT",
          payload: newProject
        });
      }
    }

    handleClose();
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      {taskToEdit && (
        <button
          type="button"
          className="close-form-btn"
          onClick={handleClose}
          title="Close form"
        >
          <FaTimes />
        </button>
      )}
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Title name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        name="description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <label htmlFor="project">Project:</label>
      <input
        type="text"
        name="project"
        id="project"
        placeholder="Project name"
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
        placeholder="DD-MM-YYYY"
        value={dueDate}
        onChange={handleDateChange}
        required
      />
      {dateError && (
        <p
          style={{
            color: "red",
            fontSize: "0.8rem",
          }}
        >
          {dateError}
        </p>
      )}
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
      <button type="submit">{taskToEdit ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default AddTaskForm;