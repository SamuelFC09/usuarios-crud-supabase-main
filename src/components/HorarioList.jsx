import { Link } from 'react-router-dom';
import HorarioItem from './HorarioItem';

const HorarioList = ({ horarios, loading }) => {
    if (loading) return <div className="loading">Cargando horarios...</div>;

    return (
        <div className="horario-page">
            <div className="horario-header">
                <h2>Lista de Horarios ({horarios.length})</h2>
                <Link to="/horarios/create" className="btn btn-primary">
                    Crear Horario
                </Link>
            </div>
            <div className="horario-list">
                {horarios.length === 0 ? (
                    <p>No hay horarios disponibles.</p>
                ) : (
                    horarios.map((horario) => (
                        <HorarioItem key={horario.id} horario={horario} />
                    ))
                )}                        
            </div>
        </div>
    );
};

export default HorarioList;