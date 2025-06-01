import { FaInbox } from "react-icons/fa";

const InboxSection = () => {
return (
  <>
    <section className="inbox-sec">
      <ul className="inbox-sec-ul">
        <li className="inbox-sec-li">
          <FaInbox></FaInbox>
          <p>Inbox</p>
          <span className="inbox-tasks-num">0</span>
        </li>
        <li className="inbox-sec-li">
          <FaInbox></FaInbox>
          <p>Inbox</p>
          <span className="inbox-tasks-num">0</span>
        </li>
        <li className="inbox-sec-li">
          <FaInbox></FaInbox>
          <p>Inbox</p>
          <span className="inbox-tasks-num">0</span>
        </li>
      </ul>
    </section>
  </>
);
}

export default InboxSection;