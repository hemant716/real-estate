import React from 'react'
import { GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { signInFailure,signInStart,signInSuccess } from '../redux/user/userSlice';
import { Navigate, useNavigate} from "react-router-dom";

export default function OAuth() {
 const dispatch= useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("http://localhost:8080/api/auth/google", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
           email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
     const data= await res.json();
     //console.log(data);
     dispatch(signInSuccess(data));
     Navigate("/sign-up");
    } catch (error) {
      console.log("cannot login with Google", error);
    }

  }

  return (
    <button onClick={handleGoogleClick}
      type=" button"
      className=' bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 '>
      continue with Google
    </button>
  )
}