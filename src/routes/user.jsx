import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";

export default function User() {
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [signInError, setSignInError] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const navigate = useNavigate();

    const signIn = async (event) => {
        event.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
            navigate('/home');
        } catch (err) {
            setSignInError('Invalid email or password.');
        }
    }

    const register = async (event) => {
        event.preventDefault();

        try {
            await createUserWithEmailAndPassword(getAuth(), registerEmail, registerPassword);
            navigate('/home');
        } catch (err) {
            setRegisterError('Error during registration.');
        }
    }

    return (
        <article className="flex items-center justify-evenly h-full bg-slate-100">

            {/* Login section */}
            <section className="w-fit h-fit">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={signIn}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="signInEmail" className="sr-only">Email address</label>
                            <input id="signInEmail" name="signInEmail" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" value={signInEmail} onChange={e => setSignInEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="signInPassword" className="sr-only">Password</label>
                            <input id="signInPassword" name="signInPassword" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={signInPassword} onChange={e => setSignInPassword(e.target.value)} />
                        </div>
                    </div>

                    {signInError && <p className="mt-2 text-center text-sm text-red-600">{signInError}</p>}

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign in
                        </button>
                    </div>
                </form>
            </section>

            {/* Registration section */}
            <section className="w-fit h-fit">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Register a new account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={register}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="registerEmail" className="sr-only">Email address</label>
                            <input id="registerEmail" name="registerEmail" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" value={registerEmail} onChange={e => setRegisterEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="registerPassword" className="sr-only">Password</label>
                            <input id="registerPassword" name="registerPassword" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} />
                        </div>
                    </div>

                    {registerError && <p className="mt-2 text-center text-sm text-red-600">{registerError}</p>}

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Register
                        </button>
                    </div>
                </form>
            </section>
        </article>
    );
};
