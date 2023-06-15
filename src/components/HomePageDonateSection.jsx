import { NavLink } from 'react-router-dom';

export default function HomePageDonateSection() {
    return (
        <div className="mx-auto h-1/2 w-full flex items-center justify-center text-center bg-gray-500 text-gray-900 p-10">
            <div>
                <h2 className="text-4xl font-bold tracking-tight">Donate</h2>
                <p className="mt-6 text-lg leading-8">
                    Be the Legacy! Help support your Merced Senior Community Center
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <NavLink
                        to="/donate"
                        className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                    >
                        Donate Now
                    </NavLink>
                </div>
            </div>
        </div>
    );
}