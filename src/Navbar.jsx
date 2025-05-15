import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow">
      <NavLink className="navbar-brand fw-bold text-light" to="/">
        💹 Investment Tracker
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink
              to="/monthly"
              className="nav-link"
              activeclassname="active"
            >
              Investment by Month
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/total"
              className="nav-link"
              activeclassname="active"
            >
              Total Investments
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
