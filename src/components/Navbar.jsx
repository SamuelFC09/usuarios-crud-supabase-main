import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                    <h2>Web II - Sistema CRUD</h2>
                </Link>
            </div>
            <ul className="navbar-nav">
                <li className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                
                {/* Sección Usuarios */}
                <li className={`nav-item ${location.pathname === "/users" ? "active" : ""}`}>
                    <Link to="/users" className="nav-link">Usuarios</Link>
                </li>
                <li className={`nav-item ${location.pathname === "/users/create" ? "active" : ""}`}>
                    <Link to="/users/create" className="nav-link">Crear Usuario</Link>
                </li>

                {/* Nueva Sección Cargos */}
                <li className={`nav-item ${location.pathname === "/cargos" ? "active" : ""}`}>
                    <Link to="/cargos" className="nav-link">Cargos</Link>
                </li>
                <li className={`nav-item ${location.pathname === "/cargos/create" ? "active" : ""}`}>
                    <Link to="/cargos/create" className="nav-link">Crear Cargo</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;