import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <nav className="w-full h-20 sticky top-0 grid grid-cols-[1fr_8fr] grid-rows-1 justify-items-end items-center bg-slate-100">
            <p className="text-4xl font-black"><a href="/" className="">Merced Senior Citizens Inc.</a></p>
            <ul className="flex gap-8 md:gap-20 pr-8 md:pr-32 text-xl font-semibold">
                <li><Link to={`home`} className="opacity-60 hover:opacity-100 transition-opacity">Home</Link></li>
                <li><Link to={`events`} className="opacity-60 hover:opacity-100 transition-opacity">Events & Activities</Link></li>
                <li><Link to={`about`} className="opacity-60 hover:opacity-100 transition-opacity">About Us</Link></li>
                <li><Link to={`contact`} className="opacity-60 hover:opacity-100 transition-opacity">Contact</Link></li>
                <li><Link to={`donate`} className="opacity-60 hover:opacity-100 transition-opacity">Donate</Link></li>
                <li><Link to={`user`} className="opacity-60 hover:opacity-100 transition-opacity">Log In</Link></li>
            </ul>
        </nav>
    )
}