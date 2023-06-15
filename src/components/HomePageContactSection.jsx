import { NavLink } from 'react-router-dom';

export default function HomePageContactSection() {
    return (
        <div className="mx-auto h-[32rem] w-full flex items-center justify-center text-center bg-gray-400 text-gray-900 p-10">
            <div>
                <h2 className="text-4xl font-bold tracking-tight">Contact Us</h2>
                <p className="mt-6 text-lg leading-8">
                    If you have any further questions or concerns please contact the Merced Senior Community Center at 209- 385-8803. Thank you for visiting our website and we look forward to your visit!
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <NavLink
                        to="/contact"
                        className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                    >
                        Contact Us
                    </NavLink>
                </div>
            </div>
        </div>
    );
}