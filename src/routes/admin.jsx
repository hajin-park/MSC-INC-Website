import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminPage/AdminSidebar';

export default function Admin() {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        if (password === "1234") {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect password");
        }
    };

    return (
        isAuthenticated ? (
            <div className="w-full min-h-full flex flex-grow pt-24">
                <AdminSidebar/>
                <Outlet />
            </div>
        ) : (
            <div className="w-full min-h-full flex-grow flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Admin Login
                </h2>
                <form className="max-w-xs w-full space-y-6" onSubmit={handleLogin}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={password} onChange={handlePasswordChange} />
                    </div>
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign in
                    </button>
                </form>
            </div>
        )
    );
}