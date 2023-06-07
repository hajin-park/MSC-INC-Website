import { Link } from 'react-router-dom';

export default function CategorySidebar({ categories }) {
    return (
        <div className="flex flex-col gap-y-5 overflow-y-auto border-r border-custom-text bg-custom-background px-6">
            <div className="flex h-16 items-center">
                <h2 className="text-2xl text-center font-bold my-8 text-custom-text">Our Events</h2>
            </div>
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    {categories.map(category => (
                        <li key={category.id}>
                            <Link to={category.name} className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-custom-text hover:bg-custom-accent">
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}