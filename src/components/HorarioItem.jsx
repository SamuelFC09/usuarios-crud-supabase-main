import { Link } from "react-router-dom";

const HorarioItem = ({ horario }) => {
    return (
        <div className="horario-item">     
            <div className="horario-details">
                <p><strong>ID:</strong> {horario.id}</p>
                <p><strong>Hora Ingreso:</strong> {horario.hora_ingreso}</p>
                <p><strong>Hora Salida:</strong> {horario.hora_salida}</p>
                <p><strong>Duración:</strong> {calcularDuracion(horario.hora_ingreso, horario.hora_salida)}</p>
            </div>
            <div className="horario-actions">
                <Link to={`/horarios/edit/${horario.id}`} className="btn btn-secondary">
                    Editar
                </Link>
                <Link to={`/horarios/delete/${horario.id}`} className="btn btn-danger">
                    Eliminar
                </Link>
            </div>
        </div>
    );
};

const calcularDuracion = (ingreso, salida) => {
    if (!ingreso || !salida) return '-';
    const [h1, m1] = ingreso.split(':').map(Number);
    const [h2, m2] = salida.split(':').map(Number);
    const diff = (h2 * 60 + m2) - (h1 * 60 + m1);
    const horas = Math.floor(diff / 60);
    const minutos = diff % 60;
    return `${horas}h ${minutos}m`;
};

export default HorarioItem;