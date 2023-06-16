import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"

export default function Root() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )   
}