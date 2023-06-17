import { NavLink } from 'react-router-dom';

export default function HomePageEventSection() {
    return (
        <div className="w-full h-96 py-12  bg-gray-200 text-gray-900">
            <div className="w-72 h-full md:w-144 lg:w-192 xl:w-236 mx-auto gap-y-4 flex flex-col items-center justify-center text-center">
                <h2 className="text-4xl font-bold tracking-tight">Check out our Center!</h2>
                <p className="text-lg leading-8">
                    If you are new to our Center and organization and would like to participate in classes, group activities or volunteer simply stop by the Center to pick up a monthly activity schedule, Emergency Contact form and take a tour of our facility at 755 W. 15 th Street Merced, CA 95340. 
                    The Center hours of operation are Monday through Friday 9:00 am to 3:00 pm. The Center is closed weekends and holidays.
                </p>
                <NavLink
                    to="/events"
                    className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >
                    Learn More
                </NavLink>
            </div>
        </div>
    );
}