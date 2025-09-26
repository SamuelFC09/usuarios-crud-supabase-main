import { useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import TicketForm from '../components/TicketForm';

const CreateTicketPage = () => {
    const navigate = useNavigate();

    const createTicket = async (ticketData) => {
        const { data, error } = await supabase
            .from("tickets")
            .insert([ticketData])
            .select();

        if (error) {
            console.error('Error creating ticket:', error);
            alert('Error al crear el ticket');
            return null;
        }
        return data;
    };

    const handleSubmit = (ticketData) => {
        createTicket(ticketData);
        navigate('/tickets');
    };

    return (
        <div className="page-container">
            <h1>Crear Nuevo Ticket</h1>
            <TicketForm onSubmit={handleSubmit} isEditing={false} />
        </div>
    );
};

export default CreateTicketPage;