export default function SignUp({ handleSignUp, signUpEmailRef, signUpPasswordRef, verifySignUpPasswordRef, signUpError }) {
    return (
        <section className="w-fit h-fit bg-custom-background">
            <div>
                <h2 className="mt-6 text-center text-5xl font-extrabold text-custom-text">
                    Register a new account
                </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
                <input type="hidden" name="remember" value="true" />
                <fieldset className="rounded-md shadow-sm -space-y-px">
                    <legend className="sr-only">Registration details</legend>
                    <div>
                        <label htmlFor="signUpEmail" className="sr-only">Email address</label>
                        <input id="signUpEmail" name="signUpEmail" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-custom-text placeholder-custom-text text-custom-text rounded-t-md focus:outline-none focus:ring-custom-primary focus:border-custom-primary focus:z-10 sm:text-lg" placeholder="Email address" ref={signUpEmailRef} />
                    </div>
                    <div>
                        <label htmlFor="signUpPassword" className="sr-only">Password</label>
                        <input id="signUpPassword" name="signUpPassword" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-custom-text placeholder-custom-text text-custom-text rounded-b-md focus:outline-none focus:ring-custom-primary focus:border-custom-primary focus:z-10 sm:text-lg" placeholder="Password" ref={signUpPasswordRef} />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                        <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-custom-text placeholder-custom-text text-custom-text rounded-b-md focus:outline-none focus:ring-custom-primary focus:border-custom-primary focus:z-10 sm:text-lg" placeholder="Confirm Password" ref={verifySignUpPasswordRef} />
                    </div>
                </fieldset>

                <div>
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-custom-background bg-custom-primary hover:bg-custom-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-primary">
                        Register
                    </button>
                </div>

                {signUpError && <p className="mt-2 text-center text-md text-red-600">{signUpError}</p>}
            </form>
        </section>
    )
}