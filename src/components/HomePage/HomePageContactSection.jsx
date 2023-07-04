import { NavLink } from 'react-router-dom';

export default function HomePageContactSection() {
    return (
        <div className="w-full 2xl:h-256 xl:h-240 lg:h-224 md:h-160 sm:h-144 h-128 bg-neutral-900 font-lato">
            <div className="2xl:w-192 xl:w-192 lg:w-176 md:w-160 sm:w-160 w-full h-full p-8 mx-auto gap-y-4 flex flex-col items-center justify-center text-center">
                <h2 className="2xl:text-7xl xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-3xl tracking-tight text-zinc-50">Contact Us</h2>
                <p className="2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl sm:text-lg text-lg text-zinc-300">
                    See how you can get in touch with us!
                </p>
                <NavLink
                    to="/contact"
                    className="mt-8 rounded-md text-black bg-sky-200 px-3.5 py-2.5 text-sm font-bold shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >
                    Learn More
                </NavLink>
            </div>
        </div>
    );
}