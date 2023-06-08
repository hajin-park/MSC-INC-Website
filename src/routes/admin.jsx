import React from 'react';
import { useAuth } from '../authContext';
import AdminPanel from "../components/AdminPanel.jsx"
import HomeManagement from '../components/HomeManagement';
import EventFileManagement from '../components/EventFileManagement';
import EventCategoryManagement from '../components/EventCategoryManagement';
import StoryManagement from '../components/StoryManagement';
import ContactManagement from '../components/ContactManagement';
import DonateManagement from '../components/DonateManagement';

export default function Admin() {
    const { currentUser } = useAuth();

    // Check if the user is an admin
    return (
        (!currentUser || currentUser.email !== 'hajin1819@gmail.com') ? (
            <p className="text-center text-xl font-bold">You do not have permission to view this page.</p>
        ) : (
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
        )
    )
}