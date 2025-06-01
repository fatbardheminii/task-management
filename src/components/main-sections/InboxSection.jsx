import { FaInbox, FaCalendarDay, FaCalendarWeek, FaExclamation } from "react-icons/fa";

const InboxSection = ({tasks, todayTasks, thisWeekTasks, importantTasks, onSetFilter}) => {
return (
  <>
    <section className="inbox-sec">
      <ul className="inbox-sec-ul">
        <li className="inbox-sec-li" onClick={() => onSetFilter(tasks)}>
          <FaInbox></FaInbox>
          <p>Inbox</p>
          <span className="inbox-tasks-num">{tasks.length}</span>
        </li>
        <li className="inbox-sec-li" onClick={() => onSetFilter(todayTasks)}>
          <FaCalendarDay></FaCalendarDay>
          <p>Today</p>
          <span className="inbox-tasks-num">{todayTasks.length}</span>
        </li>
        <li className="inbox-sec-li" onClick={() => onSetFilter(thisWeekTasks)}>
          <FaCalendarWeek></FaCalendarWeek>
          <p>This Week</p>
          <span className="inbox-tasks-num">{thisWeekTasks.length}</span>
        </li>
        <li className="inbox-sec-li" onClick={() => onSetFilter(importantTasks)}>
          <FaExclamation></FaExclamation>
          <p>Important</p>
          <span className="inbox-tasks-num">{importantTasks.length}</span>
        </li>
      </ul>
    </section>
  </>
);
}

export default InboxSection;