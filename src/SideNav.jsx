import { NavLink } from "react-router-dom";
import "./SideNav.css";
import asim from '/vite.svg'

export default function SideNav() {
    const NavItems = [
        { label: "Home", path: "/" },
        { label: "By City", path: "/city" },
        { label: "By Hour", path: "/hourly" },
        { label: "Up to 10 Days", path: "/forecast" },
    ];

    return (
        <nav className="sidebar">
            <div className="sidebar-header">
                <img src={asim} alt="" /> <span><h3>Weather Report</h3></span> 
                
            </div>

            <ul className="sidebar-list">
                {NavItems.map((item) => (
                    <li key={item.path}>
                        <NavLink to={item.path} className="sidebar-link">
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>

        </nav>
    );
}
