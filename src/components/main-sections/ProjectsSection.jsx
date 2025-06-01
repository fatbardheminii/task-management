import { FaPlusCircle } from "react-icons/fa";
import AddProjectForm from "./AddProjectForm";
import ProjectCard from "./ProjectCard";

const ProjectsSection = ({projects}) => {
  return (
    <>
      <section className="project-sec">
        <h2>Projects <FaPlusCircle></FaPlusCircle></h2>
        <ul className="project-sec-ul">
          {projects.map(project => 
            <ProjectCard key={project.id} projectName={project.projectName}></ProjectCard>
          )}
        </ul>
      </section>
    </>
  );
};

export default ProjectsSection;
