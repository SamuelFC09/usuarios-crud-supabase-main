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
            .order('cargo', { ascending: true });

        if (error) {
            console.error('Error fetching cargos:', error);
            return;
        }
        setCargos(data || []);
        setLoading(false);
        console.log('Cargos:', data);
    }

    return (
        <div className="page-container">
            <h1>Gestión de Cargos</h1>
            <CargoList cargos={cargos} loading={loading} />
        </div>
    );
};

export default CargoListPage;