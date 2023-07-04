import { Outlet } from 'react-router-dom';
import CategorySidebar from '../components/EventPage/CategorySidebar';

export default function Events() {
    return (
        <div className="w-full min-h-full flex-grow flex lg:flex-row flex-col bg-zinc-50 pt-32">
            <CategorySidebar/>
            <Outlet />
        </div>
    );
}