import React from 'react';
import { useAuth } from '../authContext';
import FileManagement from '../components/FileManagement';
import CategoryManagement from '../components/CategoryManagement';

export default function Admin() {
    const { currentUser } = useAuth();

    // Check if the user is an admin
    return (
        <div className="flex gap-8 p-8 justify-evenly w-full h-screen bg-custom-background text-custom-text">
            {(!currentUser || currentUser.email !== 'hajin1819@gmail.com') ? (
                <p className="text-center text-xl font-bold">You do not have permission to view this page.</p>
            ) : (
                <>
                    <FileManagement />
                    <CategoryManagement />
                </>
            )}
        </div>
    )
}