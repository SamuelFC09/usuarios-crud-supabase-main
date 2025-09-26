import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import { useEffect, useState } from "react";

const TicketDeletePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTicket();
    }, [id]);

    const getTicket = async () => {
        try {
            const { data: ticketData, error } = await supabase
                .from("tickets")
                .select("*")
                .eq("id", id)
                .single();

            if (error) throw error;

            const { data: usuarioData } = await supabase
                .from("usuarios")
                .select("nombre, email")
                .eq("id", ticketData.id_usuario)
                .single();

            setTicket(ticketData);
            setUsuario(usuarioData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const deleteTicket = async () => {
        const { error } = await supabase
            .from("tickets")
            .delete()
            .eq("id", id);

        if (error) {
            console.error('Error deleting ticket:', error);
            alert('Error al eliminar el ticket');
            return null;
        }
        return true;
    };

    const handleDelete = async () => {
        await deleteTicket();
        navigate('/tickets');
    };

    const handleCancel = () => {
        navigate('/tickets');
    };

    if (loading) {
        return (
            <div className="page-container">
                <h2>Eliminar Ticket</h2>
                <p>Cargando información...</p>
            </div>
        );
    }

    const formatFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-ES');
    };

    const getTipoTexto = (tipo) => {
        const textos = {
            entrada: 'Entrada',
            salida: 'Salida',
            break: 'Break',
            reunion: 'Reunión'
        };
        return textos[tipo] || tipo;
    };

    return (
        <div className="page-container">
            <h2>Eliminar Ticket</h2>
            {ticket && usuario ? (
                <div className="delete-confirmation">
                    <p>¿Estás seguro de que quieres eliminar este ticket?</p>
                    <div className="ticket-info">
                        <p><strong>Usuario:</strong> {usuario.nombre} ({usuario.email})</p>
                        <p><strong>Fecha:</strong> {formatFecha(ticket.fecha)}</p>
                        <p><strong>Hora:</strong> {ticket.hora}</p>
                        <p><strong>Tipo:</strong> {getTipoTexto(ticket.tipo)}</p>
                    </div>
                    <div className="delete-actions">
                        <button onClick={handleDelete} className="btn btn-danger">
                            Sí, Eliminar
                        </button>
                        <button onClick={handleCancel} className="btn btn-secondary">
                            Cancelar
                        </button>
                    </div>
                </div>
            ) : (
                <p>Error: No se pudo cargar la información del ticket.</p>
            )}
        </div>
    );
};

export default TicketDeletePage;