// Firebase Authentication implemented with email and password signup only.
// React context sharing user state for administrative features.

import React, { useContext, useEffect, useState, useMemo } from 'react'
import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    updatePassword,
    sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "./firebase.js"

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}
  
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);

    async function signup(email, password) {
        await createUserWithEmailAndPassword(auth, email, password);
    }
    
    async function signin(email, password) {
        await signInWithEmailAndPassword(auth, email, password);
    }

    async function signout() {
        await signOut(auth);
    }

    async function changepassword(newPassword) {
        if (currentUser) {
            await updatePassword(currentUser, newPassword);
        }
    }

    async function forgotpassword(email) {
        await sendPasswordResetEmail(auth, email);
    }

    const value = useMemo(() => ({
        currentUser,
        signup,
        signin,
        signout,
        changepassword,
        forgotpassword
    }), [currentUser]);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}