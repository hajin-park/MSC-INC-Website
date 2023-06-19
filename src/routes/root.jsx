import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import ScrollToTop from "../utils/ScrollToTop.jsx";

export default function Root() {
    return (
        <div className="flex flex-col min-h-screen">
            <ScrollToTop />
            <Header />
            <Outlet />
            <Footer />
        </div>
    )   
}