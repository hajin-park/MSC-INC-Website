import { NavLink } from 'react-router-dom';

export default function HomePageDonateSection() {
    return (
        <div className="w-full 2xl:h-256 xl:h-240 lg:h-224 md:h-160 sm:h-144 h-128  bg-zinc-50 text-gray-900">
            <div className="2xl:w-176 xl:w-176 lg:w-176 md:w-160 sm:w-160 w-full h-full p-8 mx-auto gap-y-4 flex flex-col items-center justify-center text-center">
                <h2 className="text-4xl font-bold tracking-tight">Ways to Give</h2>
                <p className="text-lg leading-8">
                    Be the Legacy! Help support your Merced Senior Community Center
                </p>
                <NavLink
                    to="/donate"
                    className="w-32 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >
                    Donate Now
                </NavLink>
            </div>
        </div>
    );
}