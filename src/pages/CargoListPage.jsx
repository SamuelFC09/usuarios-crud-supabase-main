import { useEffect, useState } from "react";
import supabase from '../supabase/supabaseClient';
import CargoList from "../components/CargoList";

const CargoListPage = () => {
    const [cargos, setCargos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCargos();
    }, []);

    async function getCargos() {
        const { data, error } = await supabase
            .from("cargos")
            .select()
            .order('id', { ascending: true});

        if (error) {
            console.error('Error fetching cargos:', error);
            return;
        }
        setCargos(data || []);
        setLoading(false);
    }

    return (
        <div className="page-container">
            <h1>Lista de Cargos Registrados</h1>
            <CargoList cargos={cargos} loading={loading} />
        </div>
    );
};

export default CargoListPage;