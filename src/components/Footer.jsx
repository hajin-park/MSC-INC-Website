import { Link } from "react-router-dom"

export default function Footer() {
    const navigation = {
        directory: [
            { name: 'Home', href: '/home' },
            { name: 'Events & Activities', href: '/events' },
            { name: 'Our Story', href: '/story' },
            { name: 'Contact', href: '/contact' },
            { name: 'Donate', href: '/donate' },
        ],
        contact: [
            { name: '123 Street Name, City, State, Zip' },
            { name: 'Email: contact@msci.org' },
            { name: 'Phone: +1 123-456-7890' },
        ],
    }

    return (
        <footer className="w-full bg-footer text-text-light py-6 px-4">
            <section className="max-w-7xl mx-auto grid grid-cols-2 gap-6 text-center">
                <h2 className="text-lg font-bold text-text-light">Contact Information</h2>
                <h2 className="text-lg font-bold text-text-light">Website Directory</h2>

                {/* Contact information */}
                <address className="space-y-4">
                    {navigation.contact.map((item) => (
                        <p key={item.name}>{item.name}</p>
                    ))}
                </address>

                {/* Website directory */}
                <nav className="space-y-4">
                    <ul className="space-y-2">
                        {navigation.directory.map((item) => (
                            <li key={item.name}>
                                <Link to={item.href} className="text-text-light hover:text-secondary transition-colors">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
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