
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Projects.css';
import { ToastContainer, toast } from 'react-toastify';

function Projects() {

  //savedProjects: State variable to store the list of saved projects.
  //selectedProject: State variable to store the currently selected project for viewing.

  const [savedProjects, setSavedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    setSavedProjects(projects);
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  const handleDelete = (index) => {
    const updatedProjects = savedProjects.filter((_, i) => i !== index);
    setSavedProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    toast.success("Delete Project Successfully" ,{position:"top-center"})
  };

  
  return (
    <div className="projects-container">
      <header className="projects-header">
        <h1>{selectedProject ? selectedProject.title || 'Untitled' : 'Availabel Projects'}</h1>
        <button onClick={() => navigate('/editor')}>Back to Editor</button>
      </header>
      <div className="projects-grid">
        {savedProjects.map((project, index) => (
          <div className="project-card" key={index}>
            <div onClick={() => handleProjectClick(project)}>
              <h3>{project.title || `Project ${index + 1}`}</h3>
              <p>Saved on: {new Date(project.timestamp).toLocaleString()}</p>
            </div>
            <button className="delete-button" onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
      {selectedProject && (
        <div className="project-modal">
          <div className="project-modal-content">
            <button className="close-button" onClick={handleClose}>X</button>
            <h3>{selectedProject.title || 'Untitled'}</h3>
            <iframe
              srcDoc={`<html>
                        <head><style>${selectedProject.css}</style></head>
                        <body>${selectedProject.html}
                        <script>${selectedProject.js}</script>
                        </body>
                      </html>`}
              title="project-output"
              sandbox="allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Projects;



