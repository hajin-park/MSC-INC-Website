import { NavLink } from 'react-router-dom';

export default function HomePageContactSection() {
    return (
        <div className="w-full 2xl:h-256 xl:h-240 lg:h-224 md:h-160 sm:h-144 h-128 bg-sky-100 text-gray-900">
            <div className="2xl:w-176 xl:w-176 lg:w-176 md:w-160 sm:w-160 w-full h-full p-8 mx-auto gap-y-4 flex flex-col items-center justify-center text-center">
                <h2 className="text-4xl font-bold tracking-tight">Contact Us</h2>
                <p className="text-lg leading-8">
                    See how you can get in touch with us!
                </p>
                <NavLink
                    to="/contact"
                    className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >
                    Contact Us
                </NavLink>
            </div>
        </div>
    );
}