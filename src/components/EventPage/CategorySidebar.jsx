import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

export default function CategorySidebar() {
    const [categories, setCategories] = useState([])
    const pathName = useLocation();
    const isEventMainPage = pathName.pathname == "/events"

    useEffect(() => {
        const docRef = doc(db, 'pages', 'EventPage');
        const unsubscribe = onSnapshot(docRef, (doc) => {
            setCategories(doc.data().categories);
        });

        return unsubscribe;
    }, []);

    return (
        <>
            <nav className="px-6 lg:w-1/6 w-full min-h-full flex-none flex flex-col gap-y-5 overflow-y-auto border-r border-t border-custom-text bg-slate-100">
                <NavLink to="/events" className="text-2xl text-center font-bold my-8 text-custom-text">
                    Our Events & Activities
                </NavLink>
                <ul role="list" className="w-full flex-grow flex flex-1 flex-col">
                    {categories.map(category => (
                        <NavLink key={crypto.randomUUID()} to={category.name} className="w-full h-24 p-4 border-t border-custom-text group text-xl font-semibold hover:bg-slate-300 text-black">
                            {category.name}
                        </NavLink>
                    ))}
                </ul>
            </nav>
            { isEventMainPage && (
                <section className="w-full h-full text-center text-text-primary">
                    <p className="mt-4 2xl:text-2xl xl:text-xl lg:text-lg md:text-md sm:text-md text-md text-center">
                        If you are new to our Center and organization and would like to participate in classes, group activities or volunteer simply stop by the Center to pick up a monthly activity schedule, Emergency Contact form and take a tour of our facility at 755 W. 15 th Street Merced, CA 95340. The Center hours of operation are Monday through Friday 9:00 am to 3:00 pm. The Center is closed weekends and holidays.
                    </p>
                </section>
            )}
        </>
    );
}