

// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Header.css';
// import { auth } from '../Firebase';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {useAuthState} from 'react-firebase-hooks/auth' ;


// function Header() {
//   const [user] = useAuthState(auth)


//   // const [user, setUser] = useState(null);
//   const navigate = useNavigate();
  
//   const handleLogout = async () => {
//     await signOut(auth);
//     toast.success("Logout Successfully", {position: "top-center"})
//     setTimeout(() => {
//       navigate("/home"); // navigate to the home page after successful signup
//   }, 3000);
//     // navigate('/home')
//   };

//   return (
//     <div className="header">
//       <img src="https://code-pen-sepia.vercel.app/assets/codepenlogo-Cz-WsP-X.webp" alt="CodePen Logo" className="logo" />
//       <div className="header-right">
//         <input type="search" placeholder="Search here..." className="search-input" />
//         {user ? (
//           <>
//             <span>Welcome, {user.displayName}</span>
//             <button className="header-button" onClick={handleLogout}>Logout</button>
//           </>
//         ) : (
//           <>
//             <button className="header-button" onClick={() => navigate('/signup')}>Signup</button>
//             <button className="header-button" onClick={() => navigate('/')}>Login</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Header;





import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { auth } from '../Firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { userContext } from '../App';

function Header() {
  const [user] = useAuthState(auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const{projects,handleProjectSelect} = useContext(userContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logout Successfully", { position: "top-center" });
    setTimeout(() => {
      navigate("/signup");
    }, 1000);
  };


  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const results = projects.filter(project =>
        project.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleProjectClick = (project) => {
    if (user) {
      handleProjectSelect(project);
    } else {
      toast.error("Please login to view the project", { position: "top-center" });
    }
  };

  return (
    <div className="header">
      <img src="https://code-pen-sepia.vercel.app/assets/codepenlogo-Cz-WsP-X.webp" alt="CodePen Logo" className="logo" />
      <div className="header-right">
        <input
          type="search"
          placeholder="Search Project here..."
          className="search-input"
          value={searchQuery}
          onChange={handleSearch}
        />
        {searchQuery && (
          <div className="search-results">
            {searchResults.length > 0 ? (
              searchResults.map((project, index) => (
                <div
                  key={index}
                  className="search-result-item"
                  onClick={() => handleProjectClick(project)}
                >
                  {project.title || `Project ${index + 1}`}
                </div>
              ))
            ) : (
              <div className="search-result-item">No results found</div>
            )}
          </div>
        )}
        {user ? (
          <>
            <span>Welcome, {user.displayName}</span>
            <button className="header-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className="header-button" onClick={() => navigate('/signup')}>Signup</button>
            <button className="header-button" onClick={() => navigate('/')}>Login</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
