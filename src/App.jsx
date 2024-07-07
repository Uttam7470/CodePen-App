
import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Header from './components/Header';
import Projects from './components/Projects';
import DisplayEditor from './components/DisplayEditor';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});  //LoggedInUser store information of current logged-in-user
  const [projects, setProjects] = useState([]);          // store the list of projects retrieve from localstorage
  const [selectedProject, setSelectedProject] = useState(null);  // it store the project select by user

  const location = useLocation();
  const navigate = useNavigate();
  let excludedPaths = ['/projects', '/editor'];  

  useEffect(() => {               // run the sideEffect once when the component mounts
    const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];  // get the projects from local storage and update state
    setProjects(savedProjects);
  }, []);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    navigate('/projects');
  };

  return (
    <userContext.Provider value={{ loggedInUser, setLoggedInUser,projects,handleProjectSelect,setProjects,selectedProject }}>
      { !excludedPaths.includes(location.pathname) && <Header/> }
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/editor" element={<DisplayEditor />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <ToastContainer />
    </userContext.Provider>
  );
}

export default App;
