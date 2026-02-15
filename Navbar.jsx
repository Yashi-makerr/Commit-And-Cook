import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <nav className="navbar-glass">
      <div className="nav-left">
        <Link
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "active-link" : ""}
        >
          Dashboard
        </Link>

        <Link
          to="/recommend"
          className={location.pathname === "/recommend" ? "active-link" : ""}
        >
          Recommendations
        </Link>

        <Link
          to="/saved"
          className={location.pathname === "/saved" ? "active-link" : ""}
        >
          Saved
        </Link>

        <Link
          to="/taste"
          className={location.pathname === "/taste" ? "active-link" : ""}
        >
          Taste Profile
        </Link>

        <Link
          to="/upload"
          className={location.pathname === "/upload" ? "active-link" : ""}
        >
          Upload Report
        </Link>
      </div>

      <div className="nav-right">
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}
