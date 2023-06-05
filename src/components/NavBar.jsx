import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <nav>
          <ul>
            <li>
              <Link to={`home`}>Home</Link>
            </li>
            <li>
              <Link to={`events`}>Events & Activities</Link>
            </li>
            <li>
              <Link to={`about`}>About Us</Link>
            </li>
            <li>
              <Link to={`contact`}>Contact</Link>
            </li>
            <li>
              <Link to={`donate`}>Donate</Link>
            </li>
          </ul>
        </nav>
    )
}