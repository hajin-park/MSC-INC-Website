import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.jsx"
import Footer from "../components/Footer.jsx"

export default function Root() {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )   
}