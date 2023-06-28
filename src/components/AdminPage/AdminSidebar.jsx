import { NavLink, useLocation } from 'react-router-dom';
import UserDashboard from './UserDashboard';

export default function AdminSidebar() {
    const pathName = useLocation();
    const isAdminMainPage = pathName.pathname == "/admin"
    const navigation = [
        { name: 'Home Page', to: 'home' },
        { name: 'Event Page', to: 'events' },
        { name: 'Story Page', to: 'story' },
        { name: 'Contact Page', to: 'contact' },
        { name: 'Donate Page', to: 'donate' },
        { name: 'Footer Section', to: 'footer' }
    ];

    return (
        <>
            <nav className="w-1/6 min-h-fit flex-none flex flex-col overflow-y-auto border-r border-t border-custom-text bg-slate-100 text-left">
                <NavLink to="/admin" className="p-8 text-2xl  font-bold text-custom-text">
                    Admin Dashboard
                </NavLink>
                <ul role="list" className="w-full flex-grow flex flex-1 flex-col">
                    {navigation.map((item) => (
                        <NavLink key={item.name} to={item.to} className="w-full h-24 p-4 border-t border-custom-text group text-xl font-semibold hover:bg-slate-300 text-black">
                            {item.name}
                        </NavLink>
                    ))}
                </ul>
            </nav>
            { isAdminMainPage && (
                <UserDashboard />
            )}
        </>
    );
}