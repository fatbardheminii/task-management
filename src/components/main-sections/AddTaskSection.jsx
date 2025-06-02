import { useState } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import AddTaskForm from "./AddTaskForm";

const AddTaskSection = () => {
  const [showForm, setShowForm] = useState(false);

  const handleToggle = () => setShowForm(!showForm);

  return (
    <section className="add-tasks-sec">
      <h2>
        Add Task:{" "}
        {showForm ? (
          <FaMinusCircle onClick={handleToggle} className="plus-circle" />
        ) : (
          <FaPlusCircle onClick={handleToggle} className="plus-circle" />
        )}
      </h2>
      {showForm && <AddTaskForm setShowForm={setShowForm} />}
    </section>
  );
};

export default AddTaskSection;
