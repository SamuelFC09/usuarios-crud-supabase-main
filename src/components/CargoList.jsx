import { Link } from 'react-router-dom';
import CargoItem from './CargoItem';

const CargoList = ({ cargos, loading }) => {
    if (loading) return <div className="loading">Cargando cargos...</div>;

    return (
        <div className="cargo-page">
            <div className="cargo-header">
                <h2>Lista de Cargos ({cargos.length})</h2>
                <Link to="/cargos/create" className="btn btn-primary">
                    Crear Cargo
                </Link>
            </div>
            <div className="cargo-list">
                {cargos.length === 0 ? (
                    <p>No hay cargos disponibles.</p>
                ) : (
                    cargos.map((cargo) => (
                        <CargoItem key={cargo.id} cargo={cargo} />
                    ))
                )}                        
            </div>
        </div>
    );
};

export default CargoList;