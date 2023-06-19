export default function SignIn({ handleSignIn, signInEmailRef, signInPasswordRef, signInError, handleForgotPassword, forgotPasswordMessage }) {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-background">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-text-primary">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSignIn}>
                    <div>
                        <label htmlFor="signInEmail" className="block text-sm font-medium leading-6 text-text-primary">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="signInEmail"
                                name="signInEmail"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-text-primary shadow-sm ring-1 ring-inset ring-border placeholder-text-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                placeholder="Email address"
                                ref={signInEmailRef}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="signInPassword" className="block text-sm font-medium leading-6 text-text-primary">
                                Password
                            </label>
                            <div className="text-sm">
                                <button type="button" onClick={handleForgotPassword} className="font-semibold text-link hover:text-primary">
                                    Forgot password?
                                </button>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="signInPassword"
                                name="signInPassword"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-text-primary shadow-sm ring-1 ring-inset ring-border placeholder-text-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                placeholder="Password"
                                ref={signInPasswordRef}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-button px-3 py-1.5 text-sm font-semibold leading-6 text-button-text shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                {signInError && <p className="mt-2 text-center text-sm text-alert">{signInError}</p>}
                {forgotPasswordMessage && <p className="mt-2 text-center text-sm text-success">{forgotPasswordMessage}</p>}
            </div>
        </div>
    )
}
