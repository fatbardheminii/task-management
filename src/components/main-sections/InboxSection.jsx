import { useState, useContext, useEffect, useRef } from "react";
import {
  FaInbox,
  FaCalendarDay,
  FaCalendarWeek,
  FaStar,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { TaskContext } from "../../contexts/TaskContext";

const InboxSection = () => {
  const { state, dispatch } = useContext(TaskContext);
  const { tasks, todayTasks, thisWeekTasks, importantTasks } = state;
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

  const handleFilter = (filterType) => {
    let filteredTasks = [];
    let filterName = "";
    switch (filterType) {
      case "all":
        filteredTasks = tasks;
        filterName = "All Tasks";
        break;
      case "today":
        filteredTasks = todayTasks;
        filterName = "Today";
        break;
      case "week":
        filteredTasks = thisWeekTasks;
        filterName = "This Week";
        break;
      case "important":
        filteredTasks = importantTasks;
        filterName = "Important";
        break;
      default:
        break;
    }
    dispatch({
      type: "SET_FILTER",
      payload: { tasks: filteredTasks, filterName },
    });
  };

  return (
    <section className={`inbox-sec ${isOpen ? "show" : ""}`} ref={sectionRef}>
      <div className="inbox-sec-header" onClick={toggleSection}>
        <h2>Inbox</h2>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      <ul className="inbox-sec-ul">
        <li className="inbox-sec-li" onClick={() => handleFilter("all")}>
          <FaInbox />
          <p>All Tasks</p>
          <span className="inbox-tasks-num">{tasks.length}</span>
        </li>
        <li className="inbox-sec-li" onClick={() => handleFilter("today")}>
          <FaCalendarDay />
          <p>Today</p>
          <span className="inbox-tasks-num">{todayTasks.length}</span>
        </li>
        <li className="inbox-sec-li" onClick={() => handleFilter("week")}>
          <FaCalendarWeek />
          <p>This Week</p>
          <span className="inbox-tasks-num">{thisWeekTasks.length}</span>
        </li>
        <li className="inbox-sec-li" onClick={() => handleFilter("important")}>
          <FaStar />
          <p>Important</p>
          <span className="inbox-tasks-num">{importantTasks.length}</span>
        </li>
      </ul>
    </section>
  );
};

export default InboxSection;
