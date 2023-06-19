import { NavLink } from 'react-router-dom';

export default function HomePageContactSection() {
    return (
        <div className="w-full h-96 py-12  bg-gray-400 text-gray-900">
            <div className="w-72 h-full md:w-144 lg:w-192 xl:w-236 mx-auto gap-y-4 flex flex-col items-center justify-center text-center">
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