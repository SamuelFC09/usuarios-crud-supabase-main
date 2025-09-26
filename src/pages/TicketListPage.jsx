import { useEffect, useState } from "react";
import supabase from '../supabase/supabaseClient';
import TicketList from "../components/TicketList";

const TicketListPage = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTickets();
    }, []);

    async function getTickets() {
    const { data, error } = await supabase
        .from("tickets")
        .select(`
            *,
            usuarios (nombre, email)
        `)
        .order('id', { ascending: true })  // ← Nuevo: ordenar por ID
        .order('fecha', { ascending: false })
        .order('hora', { ascending: false });

    if (error) {
        console.error('Error fetching tickets:', error);
        return;
    }
    setTickets(data || []);
    setLoading(false);
}
    return (
        <div className="page-container">
            <h1>Gestión de Tickets</h1>
            <TicketList tickets={tickets} loading={loading} />
        </div>
    );
};

export default TicketListPage;