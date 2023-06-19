import { NavLink, useLocation } from 'react-router-dom';

export default function CategorySidebar({ categories }) {
    const pathName = useLocation();
    const isEventMainPage = pathName.pathname == "/events"

    return (
        <>
            <nav className="px-6 w-1/6 min-h-full flex-none flex flex-col gap-y-5 overflow-y-auto border-r border-custom-text bg-slate-100">
                <NavLink to="/events" className="text-2xl text-center font-bold my-8 text-custom-text">
                    Our Events & Activities
                </NavLink>
                <ul role="list" className="w-full flex flex-1 flex-col gap-y-7 text-center">
                    {Object.entries(categories).map(([name, category]) => (
                        <li key={category} className="w-full p-4 rounded-md bg-slate-600 hover:bg-slate-300  text-white">
                            <NavLink to={name} className="group text-xl font-semibold mix-blend-difference">
                                {name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            { isEventMainPage && (
                <section className="w-full h-full text-center text-text-primary">
                    <p>If you are new to our Center and organization and would like to participate in classes, group activities or volunteer simply stop by the Center to pick up a monthly activity schedule, Emergency Contact form and take a tour of our facility at 755 W. 15 th Street Merced, CA 95340. The Center hours of operation are Monday through Friday 9:00 am to 3:00 pm. The Center is closed weekends and holidays.</p>
                </section>
            )}
        </>
    );
}