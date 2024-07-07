
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [user, loading] = useAuthState(auth);
// useAuthState Hook: Returns the current user and loading state
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);


  const handleStartCoding = () => {
    // Navigate to the coding page or any other page
    navigate('/editor');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      <div className="home-container">
        <h1>Welcome to CodePen</h1>
        {user ? (
          <div className="user-info">
            <p>Username: {user.displayName}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>Please log in to see your information.</p>
        )}
        <button className="glow-on-hover" onClick={handleStartCoding}>
          Start Coding
        </button>
      </div>
    </div> 
  );
}

export default Home;
