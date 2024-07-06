import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth } from '../Firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './SignInWithGoogle.css';

function SignInWithGoogle() {
  const navigate = useNavigate();

  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      if (result.user) {
        toast.success("User logged in Successfully", { position: "top-center" });
        navigate("/home");
      }
    });
  }

  return (
    <>
      <div className="container">
        <p>--- or Continue with ---</p>
        <div className="google-login" onClick={googleLogin}>
          <Link>
            <img src="https://developers.google.com/static/identity/images/branding_guideline_sample_lt_sq_lg.svg" alt="Google" />
          </Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default SignInWithGoogle;
