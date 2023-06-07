export default function SignIn({ handleSignIn, signInEmailRef, signInPasswordRef, signInError, handleForgotPassword, forgotPasswordMessage }) {
    return (
        <section className="w-fit h-fit">
            <div>
                <h2 className="mt-6 text-center text-5xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
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

                <div className="mt-2">
                    <button type="button" onClick={handleForgotPassword} className="text-sm text-indigo-600 hover:text-indigo-500">
                        Forgot Password?
                    </button>
                </div>

                {signInError && <p className="mt-2 text-center text-md text-red-600">{signInError}</p>}
                {forgotPasswordMessage && <p className="mt-2 text-center text-md text-red-600">{forgotPasswordMessage}</p>}

            </form>
        </section>
    )
}