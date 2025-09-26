import { useEffect, useState } from "react";
import supabase from '../supabase/supabaseClient';
import HorarioList from "../components/HorarioList";

const HorarioListPage = () => {
    const [horarios, setHorarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getHorarios();
    }, []);

    async function getHorarios() {
        const { data, error } = await supabase
            .from("horarios")
            .select()
            .order('hora_ingreso', { ascending: true });

        if (error) {
            console.error('Error fetching horarios:', error);
            return;
        }
        setHorarios(data || []);
        setLoading(false);
    }

    return (
        <div className="page-container">
            <h1>Gestión de Horarios</h1>
            <HorarioList horarios={horarios} loading={loading} />
        </div>
    );
};

export default HorarioListPage;