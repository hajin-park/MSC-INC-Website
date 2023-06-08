import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../authContext';

export default function Header() {
    const { currentUser } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: 'Home', to: 'home' },
        { name: 'Events & Activities', to: 'events' },
        { name: 'Our Story', to: 'story' },
        { name: 'Contact', to: 'contact' },
        { name: 'Donate', to: 'donate' }
    ];

    return (
        <header className="sticky top-0 bg-navbar shadow-md">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    {/* Add your logo here */}
                    <NavLink to="/" className="-m-1.5 p-1.5 text-3xl font-black text-white hover:text-link transition-colors">
                        Merced Senior Citizens Inc.
                    </NavLink>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white hover:text-link transition-colors"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex sm:gap-x-4 md:gap-x-12 lg:gap-x-24">
                    {navigation.map((item) => (
                        <NavLink key={item.name} to={item.to} className={({ isActive }) => "text-lg font-semibold leading-6 text-white hover:text-link transition-colors" + (isActive ? " text-link" : "")}>
                            {item.name}
                        </NavLink>
                    ))}
                    {currentUser && currentUser.email === "hajin1819@gmail.com" && (
                        <NavLink key="Admin" to="admin" className={({ isActive }) => "text-lg font-semibold leading-6 text-white hover:text-link transition-colors" + (isActive ? " text-link" : "")}>
                            Admin
                        </NavLink>
                    )}
                    {currentUser ? (
                        <NavLink key="Account" to="user-auth" className={({ isActive }) => "flex text-lg font-semibold leading-6 text-white hover:text-link transition-colors" + (isActive ? " text-link" : "")}>
                            Account <ArrowRightOnRectangleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </NavLink>
                    ) : (
                        <NavLink key="Log In" to="user-auth" className={({ isActive }) => "flex text-lg font-semibold leading-6 text-white hover:text-link transition-colors" + (isActive ? " text-link" : "")}>
                            Log In <ArrowRightOnRectangleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </NavLink>
                    )}
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-navbar px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        {/* Add your logo here */}
                        <NavLink to="/" className="-m-1.5 p-1.5 text-4xl font-black text-white hover:text-link transition-colors">
                            Merced Senior Citizens Inc.
                        </NavLink>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <NavLink
                                            key={item.name}
                                            to={item.to}
                                            className={({ isActive }) => "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50/10" + (isActive ? " text-link" : "")}
                                        >
                                            {item.name}
                                        </NavLink>
                                    ))}
                                    {currentUser ? (
                                        <NavLink key="Account" to="user-auth" className={({ isActive }) => "-mx-3 flex rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50/10" + (isActive ? " text-link" : "")}>
                                            Account <ArrowRightOnRectangleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </NavLink>
                                    ) : (
                                        <NavLink key="Log In" to="user-auth" className={({ isActive }) => "-mx-3 flex rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50/10" + (isActive ? " text-link" : "")}>
                                            Log In <ArrowRightOnRectangleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </NavLink>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
        </header>
        );
    }