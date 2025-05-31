import { FaGithub } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer>
        <p>&copy; {currentYear} Fatbardh Emini</p>
        <a
          href="https://github.com/fatbardheminii"
          target="_blank"
          aria-label="Visit Fatbardh Emini's Github profile"
        >
          <FaGithub className="github-icon"></FaGithub>
        </a>
      </footer>
    </>
  );
};

export default Footer;
