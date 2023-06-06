import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../authContext';

export default function User() {
    const signInEmailRef = useRef('');
    const signInPasswordRef = useRef('');
    const signUpEmailRef = useRef('');
    const signUpPasswordRef = useRef('');
    const { signup, signin } = useAuth();
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

    return (
        <article className="flex pt-64 px-96 justify-evenly h-full bg-slate-100">

            {/* Login section */}
            <section className="w-fit h-fit">
                <div>
                    <h2 className="mt-6 text-center text-5xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={signIn}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="signInEmail" className="sr-only">Email address</label>
                            <input id="signInEmail" name="signInEmail" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg" placeholder="Email address" ref={signInEmailRef} />
                        </div>
                        <div>
                            <label htmlFor="signInPassword" className="sr-only">Password</label>
                            <input id="signInPassword" name="signInPassword" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg" placeholder="Password" ref={signInPasswordRef} />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Sign in
                        </button>
                    </div>

                    {signInError && <p className="mt-2 text-center text-md text-red-600">{signInError}</p>}
                </form>
            </section>

            {/* Registration section */}
            <section className="w-fit h-fit">
                <div>
                    <h2 className="mt-6 text-center text-5xl font-extrabold text-gray-900">
                        Register a new account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={signUp}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="signUpEmail" className="sr-only">Email address</label>
                            <input id="signUpEmail" name="signUpEmail" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg" placeholder="Email address" ref={signUpEmailRef} />
                        </div>
                        <div>
                            <label htmlFor="signUpPassword" className="sr-only">Password</label>
                            <input id="signUpPassword" name="signUpPassword" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg" placeholder="Password" ref={signUpPasswordRef} />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Register
                        </button>
                    </div>

                    {signUpError && <p className="mt-2 text-center text-md text-red-600">{signUpError}</p>}
                </form>
            </section>
        </article>
    );
};
