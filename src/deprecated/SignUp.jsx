export default function SignUp({ handleSignUp, signUpEmailRef, signUpPasswordRef, verifySignUpPasswordRef, signUpError }) {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-background">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-text-primary">
                    Register a new account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSignUp}>
                    <div>
                        <label htmlFor="signUpEmail" className="block text-sm font-medium leading-6 text-text-primary">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="signUpEmail"
                                name="signUpEmail"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-text-primary shadow-sm ring-1 ring-inset ring-border placeholder-text-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                placeholder="Email address"
                                ref={signUpEmailRef}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="signUpPassword" className="block text-sm font-medium leading-6 text-text-primary">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="signUpPassword"
                                name="signUpPassword"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-text-primary shadow-sm ring-1 ring-inset ring-border placeholder-text-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                placeholder="Password"
                                ref={signUpPasswordRef}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-text-primary">
                            Confirm Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-text-primary shadow-sm ring-1 ring-inset ring-border placeholder-text-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                placeholder="Confirm Password"
                                ref={verifySignUpPasswordRef}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-button px-3 py-1.5 text-sm font-semibold leading-6 text-button-text shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            Register
                        </button>
                    </div>
                </form>

                {signUpError && <p className="mt-2 text-center text-sm text-alert">{signUpError}</p>}
            </div>
        </div>
    )
}