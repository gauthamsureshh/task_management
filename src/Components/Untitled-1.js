import { NavLink } from "react-router-dom";

function Navbar() {
    const user = false;
    return <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="navbar-brand">
            <h4>My app</h4>
        </div>
        <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div
        className="collapse navbar-collapse mr-auto"
        id="navbarNav"
        style={{ float: "left" }}
        >
            <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
                <li className="nav-item">
                <NavLink to={"/"} >
                    Home
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink to={"/aboutus"} className="nav-link">
                    About us
                </NavLink>
                </li>
            </ul>
            <span className="navbar-text">
                    {user ? (
                        <p>Welcome, username</p>
                        ) : (
                        <p>Welcome, Guest</p>
                    )}
                </span>
        </div>
    </nav>;
}

export default Navbar;