import { NavLink } from 'react-router-dom';

export default function CategorySidebar({ categories }) {
    return (
        <nav className="px-6 w-1/6 min-h-full  flex flex-col gap-y-5 overflow-y-auto border-r border-custom-text bg-custom-background">
            <h2 className="text-2xl text-center font-bold my-8 text-custom-text">Our Events</h2>
            <ul role="list" className="w-full flex flex-1 flex-col gap-y-7 text-center">
                {Object.entries(categories).map(([name, category]) => (
                    <li key={category}>
                        <NavLink to={name} className="group gap-x-3 rounded-md p-2 text-xl leading-6 font-semibold text-custom-text hover:bg-custom-accent">
                            {name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}