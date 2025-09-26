import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from '../supabase/supabaseClient';

const TicketItem = ({ ticket }) => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarUsuario();
    }, [ticket]);

    const cargarUsuario = async () => {
        try {
            const { data, error } = await supabase
                .from("usuarios")
                .select("nombre, email")
                .eq("id", ticket.id_usuario)
                .single();

            if (error) throw error;
            setUsuario(data);
            setLoading(false);
        } catch (error) {
            console.error('Error loading user:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading-item">Cargando...</div>;
    }

    const formatFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-ES');
    };

    const getTipoColor = (tipo) => {
        const colores = {
            entrada: 'green',
            salida: 'red',
            break: 'orange',
            reunion: 'blue'
        };
        return colores[tipo] || 'gray';
    };

    return (
        <div className="ticket-item">     
            <div className="ticket-details">
                <p><strong>ID Ticket:</strong> {ticket.id}</p>
                <p><strong>Usuario:</strong> {usuario?.nombre} ({usuario?.email})</p>
                <p><strong>Fecha:</strong> {formatFecha(ticket.fecha)}</p>
                <p><strong>Hora:</strong> {ticket.hora}</p>
                <p>
                    <strong>Tipo:</strong> 
                    <span 
                        className="tipo-badge" 
                        style={{backgroundColor: getTipoColor(ticket.tipo)}}
                    >
                        {ticket.tipo.toUpperCase()}
                    </span>
                </p>
            </div>
            <div className="ticket-actions">
                <Link to={`/tickets/edit/${ticket.id}`} className="btn btn-secondary">
                    Editar
                </Link>
                <Link to={`/tickets/delete/${ticket.id}`} className="btn btn-danger">
                    Eliminar
                </Link>
            </div>
        </div>
    );
};

export default TicketItem;