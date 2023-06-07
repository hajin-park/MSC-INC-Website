import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../authContext"
import SignUp from "../components/SignUp.jsx"
import SignIn from "../components/SignIn.jsx"
import SignOut from "../components/SignOut.jsx"
import ChangePassword from "../components/ChangePassword.jsx"

export default function User() {
    const signInEmailRef = useRef('');
    const signInPasswordRef = useRef('');
    const signUpEmailRef = useRef('');
    const signUpPasswordRef = useRef('');
    const verifySignUpPasswordRef = useRef('');
    const changePasswordRef = useRef('');
    const verifyChangePasswordRef = useRef('');
    const [signInError, setSignInError] = useState(null);
    const [signUpError, setSignUpError] = useState(null);
    const [changePasswordError, setChangePasswordError] = useState(null);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [forgotPasswordMessage, setForgotPasswordMessage] = useState('');
    const { signup, signin, signout, changepassword, forgotpassword, currentUser } = useAuth();
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
        if (signUpPasswordRef.current.value !== verifySignUpPasswordRef.current.value) {
            console.log([signUpPasswordRef, verifySignUpPasswordRef])
            setSignUpError("Passwords do not match");
        } else {
            try {
                await signup(signUpEmailRef.current.value, signUpPasswordRef.current.value);
                navigate('/home');
            } catch (err) {
                setSignUpError('Error during registration.');
            }
        }
    }

    const signOut = async (event) => {
        event.preventDefault();
        try {
            await signout();
            setShowChangePassword(false);  // Reset showChangePassword after logging out
            navigate('/user-auth');
        } catch (err) {
            console.log("Error logging out...")
        }
    }

    const changePassword = async (event) => {
        event.preventDefault();
        try {
            if (changePasswordRef.current.value !== verifyChangePasswordRef.current.value) {
                throw new Error('Passwords do not match.');
            }
            await changepassword(changePasswordRef.current.value);
            setShowChangePassword(false);
            navigate('/user-auth');
        } catch (err) {
            setChangePasswordError(err.message);
        }
    }

    const forgotPassword = async (event) => {
        event.preventDefault();
        try {
            await forgotpassword(signInEmailRef.current.value);
            setForgotPasswordMessage("Check your inbox for further instructions");
        } catch {
            setForgotPasswordMessage("Failed to reset password");
        }
    }

    if (currentUser) {
        if (showChangePassword) {
            return (
                <article className="flex pt-16 px-6 md:px-16 lg:px-32 justify-evenly h-full bg-custom-background">
                    <ChangePassword handleChangePassword={changePassword} changePasswordRef={changePasswordRef} verifyChangePasswordRef={verifyChangePasswordRef} changePasswordError={changePasswordError} handleBackButton={() => setShowChangePassword(false)}/>
                </article>
            )
        } else {
            return (
                <article className="flex pt-16 px-6 md:px-16 lg:px-32 justify-evenly h-full bg-custom-background">
                    <SignOut handleSignOut={signOut} handleChangePassword={() => setShowChangePassword(true)} />
                </article>
            )
        }
    } else {
        return (
            <article className="flex pt-16 px-6 md:px-16 lg:px-32 justify-evenly h-full bg-custom-background">
                <SignIn handleSignIn={signIn} signInEmailRef={signInEmailRef} signInPasswordRef={signInPasswordRef} signInError={signInError} handleForgotPassword={forgotPassword} forgotPasswordMessage={forgotPasswordMessage}/>
                <SignUp handleSignUp={signUp} signUpEmailRef={signUpEmailRef} signUpPasswordRef={signUpPasswordRef} verifySignUpPasswordRef={verifySignUpPasswordRef} signUpError={signUpError}/>
            </article>
        );
    }
};