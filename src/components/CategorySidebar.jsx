import { Link } from 'react-router-dom';

export default function CategorySidebar({ categories }) {
    return (
        <div className="w-1/5 border-r-2 border-gray-300 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            {categories.map(category => (
                <Link key={category.id} to={category.name} className="block py-2 px-4 hover:bg-gray-200">{category.name}</Link>
            ))}
        </div>
    );
}