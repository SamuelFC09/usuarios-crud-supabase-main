import CargoItem from './CargoItem';

const CargoList = ({ cargos, loading }) => {
    if (loading) return <div className="loading">Cargando lista de cargos...</div>;

    return (
        <div className="cargo-page">
            <div className="cargo-header">
                <h2>Cargos Registrados en el Sistema ({cargos.length})</h2>
                {/* QUITADO: El botón de crear cargo */}
            </div>
            <div className="cargo-list">
                {cargos.length === 0 ? (
                    <div className="no-data">
                        <p>No hay cargos registrados en el sistema.</p>
                       
                    </div>
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