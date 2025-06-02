import { useContext } from "react";
import {
  FaInbox,
  FaCalendarDay,
  FaCalendarWeek,
  FaExclamation,
} from "react-icons/fa";
import { TaskContext } from "../../contexts/TaskContext";

const InboxSection = ({ onSetFilter }) => {
  const { state } = useContext(TaskContext);
  const { tasks, todayTasks, thisWeekTasks, importantTasks } = state;

  return (
    <section className="inbox-sec">
      <ul className="inbox-sec-ul">
        <li
          className="inbox-sec-li"
          onClick={() => onSetFilter(tasks, "All tasks")}
        >
          <FaInbox />
          <p>All tasks</p>
          <span className="inbox-tasks-num">{tasks.length}</span>
        </li>
        <li
          className="inbox-sec-li"
          onClick={() => onSetFilter(todayTasks, "Today:")}
        >
          <FaCalendarDay />
          <p>Today</p>
          <span className="inbox-tasks-num">{todayTasks.length}</span>
        </li>
        <li
          className="inbox-sec-li"
          onClick={() => onSetFilter(thisWeekTasks, "This Week:")}
        >
          <FaCalendarWeek />
          <p>This Week</p>
          <span className="inbox-tasks-num">{thisWeekTasks.length}</span>
        </li>
        <li
          className="inbox-sec-li"
          onClick={() => onSetFilter(importantTasks, "Important:")}
        >
          <FaExclamation />
          <p>Important</p>
          <span className="inbox-tasks-num">{importantTasks.length}</span>
        </li>
      </ul>
    </section>
  );
};

export default InboxSection;
