
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from 'firebase/auth';
import { auth } from "../Firebase";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';

function Signup() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const signup = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
            console.log(userCredential);
            await updateProfile(userCredential.user, { displayName: name });
            toast.success("User Signed Up Successfully", { position: "top-center" });

            // Delay navigation to ensure the toast displays
            setTimeout(() => {
                navigate("/"); // navigate to the home page after successful signup
            }, 3000); // 2-second delay

        } catch (err) {
            console.log(err.message);
            toast.error(err.message, { position: "top-center" });
        }
    };

    return (
        <>
            <div className='topp'>
                <div className='card'>
                    <h1>Sign Up for CodePen</h1>
                    <form onSubmit={signup}>
                        <h2>Create Account</h2>
                        <div className="form">
                            <label htmlFor="name">Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.currentTarget.value)} />
                        </div>
                        <div className="form">
                            <label htmlFor="email">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
                        </div>
                        <div className="form">
                            <label htmlFor="password">Password</label>
                            <input type="password" value={pass} onChange={(e) => setPass(e.currentTarget.value)} />
                        </div>
                        <button type="submit">Sign Up</button>
                        <p>Already have an account? <Link to="/">Login</Link></p>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Signup;
