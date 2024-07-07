
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignInWithGoogle from './SignInWithGoogle';

function Login() {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();
    // const {loggedInUser, setLoggedInUser}  = useContext(userContext)
    
    const login = async (e) => {
        e.preventDefault();
      
        try {
            const loggedUser =  await signInWithEmailAndPassword(auth, email, pass);
             console.log(loggedUser);
             toast.success("User Login Successfully", { position: "top-center" });
            //   navigate("/home"); 
              setTimeout(() => {
                navigate("/home"); // navigate to the home page after successful signup
            }, 3000);
              setEmail("");
              setPass("");
          
          }
             
        catch (err) {
            console.log(err.message);
            toast.error(err.message, { position: "top-center" });
        }
    };

    return (
        <>
            <div className="container">
                <div className="card">
                    <h1>Welcome to CodePen</h1>
                    <form onSubmit={login}>
                        <h2>Login</h2>
                        <div className="form">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
                        </div>
                        <div className="form">
                            <label htmlFor="password">Password</label>
                            <input type="password" value={pass} onChange={(e) => setPass(e.currentTarget.value)} />
                        </div>
                        <button type="submit">Login</button>
                        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                       
                            <SignInWithGoogle />
                        
                    </form>
                </div>
               
            </div>
            <ToastContainer />
        </>
    );
}

export default Login;
