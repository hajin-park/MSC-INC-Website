import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6 px-4">
            <section className="max-w-7xl mx-auto grid grid-cols-2 gap-6 text-center">
                <h2 className="text-lg font-bold">Contact Information</h2>
                <h2 className="text-lg font-bold">Website Directory</h2>

                {/* Contact information */}
                <address className="space-y-4">
                    <div>
                        <p>123 Street Name</p>
                        <p>City, State, Zip</p>
                    </div>
                    <div>
                        <p>Email: contact@msci.org</p>
                        <p>Phone: +1 123-456-7890</p>
                    </div>
                </address>

                {/* Website directory */}
                <nav className="space-y-4">
                    <ul className="space-y-2">
                        <li><Link to="/home" className="hover:text-blue-400 transition-colors">Home</Link></li>
                        <li><Link to="/events" className="hover:text-blue-400 transition-colors">Events & Activities</Link></li>
                        <li><Link to="/story" className="hover:text-blue-400 transition-colors">Our Story</Link></li>
                        <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
                        <li><Link to="/donate" className="hover:text-blue-400 transition-colors">Donate</Link></li>
                    </ul>
                </nav>
            </section>
            
            {/* Copyright notice */}
            <small className="block mt-6 text-center text-gray-400">
                &copy; {new Date().getFullYear()} Merced Senior Citizens Inc. All rights reserved.
            </small>
        </footer>
    )
}