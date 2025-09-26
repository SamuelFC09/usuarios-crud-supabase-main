import { Link } from "react-router-dom";

const CargoItem = ({ cargo, onDelete }) => {
    const formatSueldo = (sueldo) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'USD'
        }).format(sueldo);
    };

    return (
        <div className="cargo-item">     
            <div className="cargo-details">
                <p><strong>ID:</strong> {cargo.id}</p>
                <p><strong>Cargo:</strong> {cargo.cargo}</p>
                <p><strong>Sueldo:</strong> {formatSueldo(cargo.sueldo)}</p>
            </div>
            <div className="cargo-actions">
                <Link to={`/cargos/edit/${cargo.id}`} className="btn btn-secondary">
                    Editar
                </Link>
                <Link to={`/cargos/delete/${cargo.id}`} className="btn btn-danger">
                    Eliminar
                </Link>
            </div>
        </div>
    );
};

export default CargoItem;