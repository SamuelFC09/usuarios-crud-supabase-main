import { useParams, useNavigate } from "react-router-dom";
import TicketForm from "../components/TicketForm";
import supabase from '../supabase/supabaseClient';
import { useEffect, useState } from "react";

const EditTicketPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTicket();
    }, [id]);

    const getTicket = async () => {
        const { data, error } = await supabase
            .from("tickets")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error('Error fetching ticket:', error);
            setLoading(false);
            return;
        }
        setTicket(data);
        setLoading(false);
    };

    const updateTicket = async (ticketData) => {
        const { data, error } = await supabase
            .from("tickets")
            .update(ticketData)
            .eq("id", id)
            .select();

        if (error) {
            console.error('Error updating ticket:', error);
            alert('Error al actualizar el ticket');
            return null;
        }
        return data;
    };

    const handleSubmit = (ticketData) => {
        updateTicket(ticketData);
        navigate('/tickets');
    };

    if (loading) {
        return (
            <div className="page-container">
                <h2>Editar Ticket</h2>
                <p>Cargando información del ticket...</p>
            </div>
        );
    }

    return (
        <div className="page-container">
            <h2>Editar Ticket</h2>
            {ticket ? (
                <TicketForm 
                    onSubmit={handleSubmit} 
                    editingTicket={ticket}
                    isEditing={true}
                />
            ) : (
                <p>Error: No se pudo cargar la información del ticket.</p>
            )}
        </div>
    );
};

export default EditTicketPage;