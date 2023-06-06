import { Link } from "react-router-dom"
import { useAuth } from '../authContext';

export default function Header() {
    const { currentUser } = useAuth();

    return (
        <nav className="sticky top-0 z-50 bg-sky-100 shadow-md">
            <div className="relative flex items-center justify-between h-24">
                <section className="flex items-center px-16">
                    <div className="flex-shrink-0">
                        <a href="/" className="text-4xl font-black text-blue-600 hover:text-blue-800 transition-colors">Merced Senior Citizens Inc.</a>
                    </div>
                </section>
                <section className="flex-1 flex items-center justify-end px-16">
                    <div className="flex space-x-8">
                        <Link to={`home`} className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-xl font-medium border-gray-400 hover:border-blue-600 transition-all">Home</Link>
                        <Link to={`events`} className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-xl font-medium border-gray-400 hover:border-blue-600 transition-all">Events & Activities</Link>
                        <Link to={`story`} className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-xl font-medium border-gray-400 hover:border-blue-600 transition-all">Our Story</Link>
                        <Link to={`contact`} className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-xl font-medium border-gray-400 hover:border-blue-600 transition-all">Contact</Link>
                        <Link to={`donate`} className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-xl font-medium border-gray-400 hover:border-blue-600 transition-all">Donate</Link>
                        <Link to={`user`} className="text-gray-900 inline-flex pl-8 items-center px-1 pt-1 border-l-2 text-xl font-medium border-gray-400 hover:text-blue-600 transition-all">{currentUser ? "Account" : "Log In"}</Link>
                    </div>
                </section>
            </div>
        </nav>
    )
}