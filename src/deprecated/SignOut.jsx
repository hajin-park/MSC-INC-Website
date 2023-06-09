import React from 'react';
import { useAuth } from '../authContext';

export default function AccountInfo({ handleSignOut, handleChangePassword }) {
    const { currentUser } = useAuth();

    return (
        <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Account Information</h3>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{currentUser.email}</dd>
                    </div>
                    <div className="bg-white px-4 py-6 sm:gap-4 sm:px-3">
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <button onClick={handleChangePassword} className="text-blue-600 hover:text-blue-700 mx-auto">
                                Change Password
                            </button>
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-6 sm:grid sm:gap-4 sm:px-3">
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <button onClick={handleSignOut} className="px-6 py-3 bg-red-600 rounded-md text-white font-medium tracking-wide hover:bg-red-500">
                                Logout
                            </button>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}
