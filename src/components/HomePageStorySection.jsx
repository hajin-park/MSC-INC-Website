import { NavLink } from 'react-router-dom';

export default function HomePageStorySection() {
    return (
        <div className="w-full h-96 py-12  bg-gray-300 text-gray-900">
            <div className="w-72 h-full md:w-144 lg:w-192 xl:w-236 mx-auto gap-y-4 flex flex-col items-center justify-center text-center">
                <h2 className="text-4xl font-bold tracking-tight">Our Story</h2>
                <p className="text-lg leading-8">
                    Serving Merced seniors since 1984!
                </p>
                <NavLink
                    to="/story"
                    className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >
                    Learn More
                </NavLink>
            </div>
        </div>
    );
}