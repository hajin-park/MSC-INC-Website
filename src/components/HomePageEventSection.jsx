import { NavLink } from 'react-router-dom';

export default function HomePageEventSection() {
    return (
        <div className="mx-auto h-[32rem] w-full flex items-center justify-center text-center bg-background text-gray-900 p-10">
            <div>
                <h2 className="text-4xl font-bold tracking-tight">Check out our Center!</h2>
                <p className="mt-6 text-lg leading-8">
                    If you are new to our Center and organization and would like to participate in classes, group activities or volunteer simply stop by the Center to pick up a monthly activity schedule, Emergency Contact form and take a tour of our facility at 755 W. 15 th Street Merced, CA 95340. 
                    The Center hours of operation are Monday through Friday 9:00 am to 3:00 pm. The Center is closed weekends and holidays.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <NavLink
                        to="/events"
                        className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                    >
                        Check Events & Activities
                    </NavLink>
                </div>
            </div>
        </div>
    );
}