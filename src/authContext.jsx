import React, { useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
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

    const value = {
        currentUser,
        signup,
        signin
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}