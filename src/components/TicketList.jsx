import { Link } from 'react-router-dom';
import TicketItem from './TicketItem';

const TicketList = ({ tickets, loading }) => {
    if (loading) return <div className="loading">Cargando tickets...</div>;

    return (
        <div className="ticket-page">
            <div className="ticket-header">
                <h2>Lista de Tickets ({tickets.length})</h2>
                <Link to="/tickets/create" className="btn btn-primary">
                    Crear Ticket
                </Link>
            </div>
            <div className="ticket-list">
                {tickets.length === 0 ? (
                    <p>No hay tickets disponibles.</p>
                ) : (
                    tickets.map((ticket) => (
                        <TicketItem key={ticket.id} ticket={ticket} />
                    ))
                )}                        
            </div>
        </div>
    );
};

export default TicketList;