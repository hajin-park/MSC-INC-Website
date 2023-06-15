import { NavLink } from 'react-router-dom';

export default function HomePageStorySection() {
    return (
        <div className="mx-auto h-92 w-full flex items-center justify-center text-center bg-gray-300 text-gray-900 p-10">
            <div>
                <h2 className="text-4xl font-bold tracking-tight">Our Story</h2>
                <p className="mt-6 text-lg leading-8">
                    Serving Merced seniors since 1984!
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <NavLink
                        to="/story"
                        className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                    >
                        Read Our Story
                    </NavLink>
                </div>
            </div>
        </div>
    );
}