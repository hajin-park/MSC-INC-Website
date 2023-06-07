import React from 'react';
import { useAuth } from '../authContext';
import FileManagement from '../components/FileManagement';
import CategoryManagement from '../components/CategoryManagement';

export default function Admin() {
    const { currentUser } = useAuth();

    // Check if the user is an admin
    if (!currentUser || currentUser.email !== 'hajin1819@gmail.com') {
        return <p>You do not have permission to view this page.</p>;
    }

    return (
        <div className="flex gap-8 p-4 justify-evenly w-full h-screen">
            <FileManagement />
            <CategoryManagement />
        </div>
    );
}