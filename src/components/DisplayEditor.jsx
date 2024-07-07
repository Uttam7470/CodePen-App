
import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import './DisplayEditor.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  



function DisplayEditor() {

  // html,css & js state store the content of html css and js editor


  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [title, setTitle] = useState('Untitled');
  const [srcDoc, setSrcDoc] = useState('');   // srcDoc state store the content to be displayed in the ifame preview
  const navigate = useNavigate();


  // useEffect is used update the srcDoc whenever html css and js changes

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



  // handlesave function is uesd to save the current project to localstorage

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
