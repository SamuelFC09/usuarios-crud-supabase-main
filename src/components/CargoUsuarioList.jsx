import { Link } from 'react-router-dom';
import CargoUsuarioItem from './CargoUsuarioItem';

const CargoUsuarioList = ({ asignaciones, loading }) => {
    if (loading) return <div className="loading">Cargando asignaciones...</div>;

    return (
        <div className="cargo-usuario-page">
            <div className="cargo-usuario-header">
                <h2>Asignaciones Cargo-Usuario ({asignaciones.length})</h2>
                <Link to="/cargos-usuarios/create" className="btn btn-primary">
                    Nueva Asignación
                </Link>
            </div>
            <div className="cargo-usuario-list">
                {asignaciones.length === 0 ? (
                    <p>No hay asignaciones disponibles.</p>
                ) : (
                    asignaciones.map((asignacion) => (
                        <CargoUsuarioItem key={asignacion.id} asignacion={asignacion} />
                    ))
                )}                        
            </div>
        </div>
    );
};

export default CargoUsuarioList;