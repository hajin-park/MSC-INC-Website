import { useState } from 'react';
import AdminPanel from "../components/AdminPanel.jsx"
import HomeManagement from '../components/HomeManagement';
import EventFileManagement from '../components/EventFileManagement';
import EventCategoryManagement from '../components/EventCategoryManagement';
import StoryManagement from '../components/StoryManagement';
import ContactManagement from '../components/ContactManagement';
import DonateManagement from '../components/DonateManagement';

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
            <main className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-8 w-full h-full bg-custom-background text-custom-text">
                <AdminPanel name="Home Page Management">
                    <HomeManagement />
                </AdminPanel>
                <AdminPanel name="Event Calender Management">
                    <EventFileManagement />         
                </AdminPanel>
                <AdminPanel name="Event Category Management">
                    <EventCategoryManagement />
                </AdminPanel>
                <AdminPanel name="Story Page Management">
                    <StoryManagement />
                </AdminPanel>
                <AdminPanel name="Contact Info Management">
                    <ContactManagement />
                </AdminPanel> 
                <AdminPanel name="Donate Link Management">
                    <DonateManagement />
                </AdminPanel>
            </main>
        ) : (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Admin Login
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={password} onChange={handlePasswordChange} />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}