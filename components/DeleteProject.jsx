import React from "react";
import { useState, useEffect } from "react";
const DeleteProject = () => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({
    project_name: "",
    developer: "",
    support: "",
    status: "",
    notes: "",
  });
  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data);
    };
    fetchProject();
  }, []);
  const handleSelectedProject = (e) => {
    const projectName = e.target.value;
    const foundProject = projects.find(
      (project) => project.project_name === projectName
    );
    setProject(foundProject);
  };
  const handleDelete = async (event) => {
    event.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (userConfirmed) {
      alert("Deleting Project");
      const response = await fetch(`/api/projects/${project.id}`, {
        method: "DELETE",
      });
      const { statusResponse, message } = await response.json();
      alert(message);
      if(response.ok){
        setProjects(projects.filter(project=>project.id!==project.id));
        setProject({
            project_name: "",
            developer: "",
            support: "",
            status: "",
            notes: "",
          })
      }
    }
  };
  return (
    <form
      className="grid grid-cols-[1fr,3fr] gap-4  text-lg"
      onSubmit={handleDelete}
    >
      <div className="p-4">
        <label htmlFor="dropdown">Select Project</label>
      </div>
      <div className="p-4">
        <div>
          <select
            onChange={handleSelectedProject}
            value={project.project_name || ""}
            name="project_name"
            className="text-base p-2"
          >
            <option value="" disabled>
              Select an option
            </option>
            {projects.map((project, index) => (
              <option key={index} value={project.project_name}>
                {project.project_name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-yellow-500 rounded-lg mt-4"
        >
          Delete Project
        </button>
      </div>
    </form>
  );
};

export default DeleteProject;
