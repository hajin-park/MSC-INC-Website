import React from 'react';
import { useAuth } from '../authContext';
import { useNavigate } from "react-router-dom"


export default function SignIn({ handleSignOut, handleChangePassword }) {
    const { currentUser, logout } = useAuth();

    return (
        <section className="w-fit h-fit bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                <div className="flex justify-center items-center space-x-5">
                    <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                        <h2 className="leading-relaxed">Account Information</h2>
                    </div>
                </div>
                <div className="divide-y divide-gray-200">
                    <div className="py-8 text-base text-center leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                        <p>Email: {currentUser.email}</p>
                    </div>
                    <div className="py-6 text-base text-center leading-6 font-bold sm:text-lg sm:leading-7">
                        <button onClick={handleChangePassword} className="text-blue-600 hover:text-blue-700">
                            Change Password
                        </button>
                    </div>
                    <div className="pt-6 text-base text-center leading-6 font-bold sm:text-lg sm:leading-7">
                        <button onClick={handleSignOut} className="px-6 py-3 bg-red-600 rounded-md text-white font-medium tracking-wide hover:bg-red-500">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}