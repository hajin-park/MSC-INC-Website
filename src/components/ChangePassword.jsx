export default function ChangePassword({ handleChangePassword, changePasswordRef, verifyChangePasswordRef, changePasswordError }) {
    return (
        <div className="flex h-fit items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Change Password</h2>
                    {changePasswordError && <div className="text-red-500 text-center mt-2">{changePasswordError}</div>}
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleChangePassword}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="new-password" className="sr-only">New Password</label>
                            <input id="new-password" name="new-password" type="password" required ref={changePasswordRef} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="New password"/>
                        </div>
                        <div>
                            <label htmlFor="verify-new-password" className="sr-only">Verify New Password</label>
                            <input id="verify-new-password" name="verify-new-password" type="password" required ref={verifyChangePasswordRef} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Verify new password"/>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}