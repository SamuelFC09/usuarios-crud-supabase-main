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

                {/* Sección Cargos - CON DOS BOTONES COMO USUARIOS */}
                <li className={`nav-item ${location.pathname === "/cargos" ? "active" : ""}`}>
                    <Link to="/cargos" className="nav-link">Ver Cargos</Link>
                </li>
                <li className={`nav-item ${location.pathname === "/cargos/create" ? "active" : ""}`}>
                    <Link to="/cargos/create" className="nav-link">Crear Cargo</Link>
                </li>
                
                {/* Sección Horarios */}
                <li className={`nav-item ${location.pathname === "/horarios" ? "active" : ""}`}>
                    <Link to="/horarios" className="nav-link">Horarios</Link>
                </li>
                <li className={`nav-item ${location.pathname === "/horarios/create" ? "active" : ""}`}>
                    <Link to="/horarios/create" className="nav-link">Crear Horario</Link>
                </li>
                
                {/* Sección Cargos-Usuarios */}
                <li className={`nav-item ${location.pathname === "/cargos-usuarios" ? "active" : ""}`}>
                    <Link to="/cargos-usuarios" className="nav-link">Cargos-Usuarios</Link>
                </li>
                <li className={`nav-item ${location.pathname === "/cargos-usuarios/create" ? "active" : ""}`}>
                    <Link to="/cargos-usuarios/create" className="nav-link">Crear Cargo-Usuario</Link>
                </li>
                
                {/* Sección Tickets */}
                <li className={`nav-item ${location.pathname === "/tickets" ? "active" : ""}`}>
                    <Link to="/tickets" className="nav-link">Tickets</Link>
                </li>
                <li className={`nav-item ${location.pathname === "/tickets/create" ? "active" : ""}`}>
                    <Link to="/tickets/create" className="nav-link">Crear Ticket</Link>
                </li>   
            </ul>
        </nav>
    );
}

export default Navbar;