// import React, { useState, useEffect } from 'react';
// import Editor from './Editor';
// import './DisplayEditor.css'
// import Projects from './Projects';
// import { useNavigate } from 'react-router-dom';

// function DisplayEditor() {
//   const [html, setHtml] = useState(''); // State for HTML editor content
//   const [css, setCss] = useState(''); // State for CSS editor content
//   const [js, setJs] = useState(''); // State for JavaScript editor content
//   const navigate = useNavigate(); // Hook for navigation in React Router

//   // Load previously saved project from localStorage on component mount
//   useEffect(() => {
//     const savedProject = JSON.parse(localStorage.getItem('project'));
//     if (savedProject) {
//       setHtml(savedProject.html);
//       setCss(savedProject.css);
//       setJs(savedProject.js);
//     }
//   }, []);

//   // Function to handle saving the current project
//   const handleSave = () => {
//     const project = {
//       html,
//       css,
//       js,
//       timestamp: new Date().toISOString()
//     };

//     // Save current project in localStorage
//     localStorage.setItem('project', JSON.stringify(project));
//     alert('Project saved!');

//     // Load all saved projects from localStorage
//     const projects = JSON.parse(localStorage.getItem('projects')) || [];
//     projects.push(project); // Add current project to projects array
//     localStorage.setItem('projects', JSON.stringify(projects)); // Save projects array back to localStorage

//     // Clear editors after saving
//     setHtml('');
//     setCss('');
//     setJs('');
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <button onClick={() => navigate('/projects')}>Projects</button> {/* Navigation button to Projects page */}
//         <button onClick={handleSave}>Save Project</button> {/* Button to save current project */}
//       </header>
//       <div className="pane top-pane">
//         <Editor
//           displayName="HTML"
//           language="xml"
//           value={html}
//           onChange={setHtml}
//         />
//         <Editor
//           displayName="CSS"
//           language="css"
//           value={css}
//           onChange={setCss}
//         />
//         <Editor
//           displayName="JavaScript"
//           language="javascript"
//           value={js}
//           onChange={setJs}
//         />
//       </div>
//       <div className="preview-pane">
//         {/* iframe to preview the output of HTML, CSS, JS */}
//         <iframe
//           srcDoc={`<html>
//                     <head><style>${css}</style></head>
//                     <body>${html}
//                     <script>${js}</script>
//                     </body>
//                   </html>`}
//           title="output"
//           sandbox="allow-scripts"
//           frameBorder="0"
//           width="100%"
//           height="100%"
//         />
//       </div>
//     </div>
//   );
// }

// export default DisplayEditor;




// import React, { useState, useEffect } from 'react';
// import Editor from './Editor';
// import './DisplayEditor.css'
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast, useToast } from 'react-toastify';

// function DisplayEditor() {
//   const [html, setHtml] = useState(''); // State for HTML editor content
//   const [css, setCss] = useState(''); // State for CSS editor content
//   const [js, setJs] = useState(''); // State for JavaScript editor content
//   const [title, setTitle] = useState('Untitled'); // State for project title
//   const navigate = useNavigate(); // Hook for navigation in React Router

//   // Load previously saved project from localStorage on component mount
//   useEffect(() => {
//     const savedProject = JSON.parse(localStorage.getItem('project'));
//     if (savedProject) {
//       setHtml(savedProject.html);
//       setCss(savedProject.css);
//       setJs(savedProject.js);
//       setTitle(savedProject.title || 'Untitled'); // Load the title or set to 'Untitled' if not present
//     }
//   }, []);

//   // Function to handle saving the current project
//   const handleSave = () => {
//     const project = {
//       html,
//       css,
//       js,
//       title,
//       timestamp: new Date().toISOString()
//     };

//     // Save current project in localStorage
//     localStorage.setItem('project', JSON.stringify(project));
//     // alert('Project saved!');
//     toast.success("Project Saved", {position:"top-center"})
//     // Load all saved projects from localStorage
//     const projects = JSON.parse(localStorage.getItem('projects')) || [];
//     projects.push(project); // Add current project to projects array
//     localStorage.setItem('projects', JSON.stringify(projects)); // Save projects array back to localStorage

//     // Clear editors after saving
//     setHtml('');
//     setCss('');
//     setJs('');
//     setTitle('Untitled');
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//        <div className='logo'>
//         <img src= "https://blog.codepen.io/wp-content/uploads/2023/09/logo-white.png" alt="" />
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Enter project title"
//         />
//         </div>
//         <div className='btn'>
//          <button onClick={() => navigate('/projects')}>Projects</button> {/* Navigation button to Projects page */}
//         <button onClick={handleSave}>Save Project</button> {/* Button to save current project */}
//         </div>
//       </header>
//       <div className="pane top-pane">
//         <Editor
//           displayName=
//           "HTML"
//           language="xml"
//           value={html}
//           onChange={setHtml}
//         />
//         <Editor
//           displayName="CSS"
//           language="css"
//           value={css}
//           onChange={setCss}
//         />
//         <Editor
//           displayName="JavaScript"
//           language="javascript"
//           value={js}
//           onChange={setJs}
//         />
//       </div>
//       <div className="preview-pane">
//         <h2>Result</h2>
//         {/* iframe to preview the output of HTML, CSS, JS */}
//         <iframe
//           srcDoc={`<html>
//                     <head><style>${css}</style></head>
//                     <body>${html}
//                     <script>${js}</script>
//                     </body>
//                   </html>`}
//           title="output"
//           sandbox="allow-scripts"
//           frameBorder="0"
//           width="100%"
//           height="100%"
//         />
//       </div>
//       <ToastContainer />
//     </div>
    
//   );
// }

// export default DisplayEditor;




import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import './DisplayEditor.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Make sure to import the CSS



function DisplayEditor() {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [title, setTitle] = useState('Untitled');
  const [srcDoc, setSrcDoc] = useState('');
  const navigate = useNavigate();

  // useEffect(() => {
  //   const savedProject = JSON.parse(localStorage.getItem('project'));
  //   if (savedProject) {
  //     setHtml(savedProject.html);
  //     setCss(savedProject.css);
  //     setJs(savedProject.js);
  //     setTitle(savedProject.title || 'Untitled');
  //   }
  // }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head><style>${css}</style></head>
          <body>${html}
          <script>${js}</script>
          </body>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const handleSave = () => {
    const project = {
      html,
      css,
      js,
      title,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem('project', JSON.stringify(project));
    toast.success('Project Saved', { position: 'top-center' });

    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));

    setHtml('');
    setCss('');
    setJs('');
    setTitle('Untitled');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">
          <img
            src="https://blog.codepen.io/wp-content/uploads/2023/09/logo-white.png"
            alt=""
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project title"
          />
        </div>
        <div className="btn">
          <button onClick={() => navigate('/home')}>Home</button>
          <button onClick={() => navigate('/projects')}>Projects</button>
          <button onClick={handleSave}>Save Project</button>
        </div>
      </header>
      <div className="pane top-pane">
        <Editor displayName="HTML" language="xml" value={html} onChange={setHtml} />
        <Editor displayName="CSS" language="css" value={css} onChange={setCss} />
        <Editor
          displayName="JavaScript"
          language="javascript"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="preview-pane">
        <h2 style={{textAlign:'center', padding:"5px"}}>Result</h2>
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
      <ToastContainer />
    </div>
  );
}

export default DisplayEditor;
