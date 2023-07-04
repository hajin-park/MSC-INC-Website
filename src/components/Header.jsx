import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import useDetectScroll, { Direction } from "@smakss/react-scroll-direction";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathName = useLocation();
    const scrollDir = useDetectScroll({});
    const isHomePage = pathName.pathname == "/home" || pathName.pathname == "/"
    const isAdminPage = pathName.pathname.startsWith("/admin")
    const currentAdminDashboard = pathName.pathname.split("/").pop()
    const linkColor = (isHomePage ? "text-white" : "text-black")
    const navBarColor = (isHomePage ? "bg-neutral-950 " : "bg-neutral-50")

    const navigation = [
        { name: 'Home', to: 'home' },
        { name: 'Events & Activities', to: 'events' },
        { name: 'Our Story', to: 'story' },
        { name: 'Contact', to: 'contact' },
        { name: 'Donate', to: 'donate' }
    ]

    const getScrollDirection = (direction) => {
        switch (direction) {
          case Direction.Up:
            return "bg-transparent";
          case Direction.Down:
            return `${navBarColor} shadow-md`;
          default:
            return "bg-transparent";
        }
    }

    return (
        isAdminPage 
        ? (
            <header className={`flex transition-colors duration-300 h-20 fixed top-0 left-0 right-0 z-20 shadow-md ${linkColor} ${getScrollDirection(scrollDir)}`}>
                <h1 className="h-fit place-self-center px-8 text-4xl font-bold">
                    {`${currentAdminDashboard.toUpperCase()} DASHBOARD`}
                </h1>
            </header>
        )
        : (
            <header className={`flex transition-colors duration-300 h-24 fixed top-0 left-0 right-0 z-20 ${linkColor} ${getScrollDirection(scrollDir)}`}>
                <nav className="w-full h-full p-6 lg:px-8 flex items-center justify-between" aria-label="Global">
                    <NavLink to="/" className="text-3xl font-bold  hover:text-link transition-colors">
                        Merced Seniors
                    </NavLink>
                    <button
                        type="button"
                        className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5  hover:text-link transition-colors"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="px-8 hidden lg:flex 2xl:text-xl 2xl:gap-x-32 xl:text-lg xl:gap-x-24 lg:text-md lg:gap-x-16 text-md">
                        {navigation.map((item) => (
                            <NavLink key={item.name} to={item.to} className={({ isActive }) => "hover:text-link transition-colors" + (isActive ? " text-link" : "")}>
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <Dialog.Panel className="z-30 fixed inset-y-0 right-0 w-full overflow-y-auto bg-slate-950 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <NavLink to="/" className="-m-1.5 p-1.5 text-4xl font-black text-white hover:text-link transition-colors" onClick={() => setMobileMenuOpen(false)}>
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
                        <div className="mt-6 flow-root -my-6 divide-y divide-gray-500/10 space-y-2 py-6">
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.to}
                                    className={({ isActive }) => "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50/10" + (isActive ? " text-link" : "")}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </NavLink>
                            ))}
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
        )
    )
}