import { useState } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import AddTaskForm from "./AddTaskForm";

const AddTaskSection = ({ onAddTask, onAddTodayTask, onAddThisWeekTask, onAddImportantTask, onAddProject, projects }) => {
  const [showForm, setShowForm] = useState(false);

  const handleToggle = () => setShowForm(!showForm);

  return (
    <>
      <section className="add-tasks-sec">
        <h2>
          Add Task:{" "}
          {showForm ? (
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
        {showForm && (
          <AddTaskForm
            onAddTask={(updateFunc) => {
              onAddTask(updateFunc);
              setShowForm(false);
            }}
            onAddTodayTask={onAddTodayTask}
            onAddWeekTask={onAddThisWeekTask}
            onAddImportantTask={onAddImportantTask}
            onAddProject={onAddProject}
            projects={projects}
          />
        )}
      </section>
    </>
  );
};

export default AddTaskSection;
