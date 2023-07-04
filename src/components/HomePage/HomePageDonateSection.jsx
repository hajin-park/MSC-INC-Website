import { NavLink } from 'react-router-dom';

export default function HomePageDonateSection() {
    return (
        <div className="w-full 2xl:h-256 xl:h-240 lg:h-224 md:h-160 sm:h-144 h-128  bg-zinc-50 font-lato">
            <div className="2xl:w-192 xl:w-192 lg:w-176 md:w-160 sm:w-160 w-full h-full p-8 mx-auto gap-y-4 flex flex-col items-center justify-center text-center">
                <h2 className="2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-3xl tracking-tight text-gray-900">Ways to Give</h2>
                <p className="2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl sm:text-lg text-lg text-gray-700">
                    Be the Legacy! Help support your Merced Senior Community Center
                </p>
                <NavLink
                    to="/donate"
                    className="mt-8 w-32 rounded-md bg-neutral-900 px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500"
                >
                    Donate Now
                </NavLink>
            </div>
        </div>
    );
} 