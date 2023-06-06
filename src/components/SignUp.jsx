export default function SignUp({ handleSignUp, signUpEmailRef, signUpPasswordRef, signUpError }) {
    return (
        <section className="w-fit h-fit">
            <div>
                <h2 className="mt-6 text-center text-5xl font-extrabold text-gray-900">
                    Register a new account
                </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
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
    )
}