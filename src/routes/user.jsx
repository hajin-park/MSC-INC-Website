import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../authContext"
import SignUp from "../components/SignUp.jsx"
import SignIn from "../components/SignIn.jsx"
import SignOut from "../components/SignOut.jsx"

export default function User() {
    const signInEmailRef = useRef('');
    const signInPasswordRef = useRef('');
    const signUpEmailRef = useRef('');
    const signUpPasswordRef = useRef('');
    const { signup, signin, signout, currentUser } = useAuth();
    const [signInError, setSignInError] = useState(null);
    const [signUpError, setSignUpError] = useState(null);
    const navigate = useNavigate();
    
    const signIn = async (event) => {
        event.preventDefault();
        try {
            await signin(signInEmailRef.current.value, signInPasswordRef.current.value);
            navigate('/home');
        } catch (err) {
            setSignInError('Invalid email or password.');
        }
    }
    
    const signUp = async (event) => {
        event.preventDefault();
        try {
            await signup(signUpEmailRef.current.value, signUpPasswordRef.current.value);
            navigate('/home');
        } catch (err) {
            setSignUpError('Error during registration.');
        }
    }

    const signOut = async (event) => {
        try {
            await signout();
            navigate('/user');
        } catch (err) {
            console.log("Error logging out...")
        }
    }

    const changePassword = async (event) => {
        navigate('/change-password');
    }

    if (currentUser) {
        return (
            <article className="flex pt-64 px-96 justify-evenly h-full bg-slate-100">
                <SignOut handleSignOut={signOut} handleChangePassword={changePassword}/>
            </article>
        );
    } else {
        return (
            <article className="flex pt-64 px-96 justify-evenly h-full bg-slate-100">
                <SignIn handleSignIn={signIn} signInEmailRef={signInEmailRef} signInPasswordRef={signInPasswordRef} signInError={signInError}/>
                <SignUp handleSignUp={signUp} signUpEmailRef={signUpEmailRef} signUpPasswordRef={signUpPasswordRef} signUpError={signUpError}/>
            </article>
        );
    }
};
