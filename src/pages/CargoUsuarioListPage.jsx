import { useEffect, useState } from "react";
import supabase from '../supabase/supabaseClient';
import CargoUsuarioList from "../components/CargoUsuarioList";

const CargoUsuarioListPage = () => {
    const [asignaciones, setAsignaciones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAsignaciones();
    }, []);

    async function getAsignaciones() {
        const { data, error } = await supabase
            .from("cargos_usuarios")
            .select(`
                *,
                usuarios(nombre, email),
                cargos(cargo, sueldo)
            `)
            .order('id', { ascending: true });

        if (error) {
            console.error('Error fetching tickets COMPLETO:', error);
        // Muestra más detalles del error
        console.log('Código del error:', error.code);
        console.log('Mensaje detallado:', error.message);
        console.log('Detalles:', error.details);
        console.log('Hint:', error.hint);
        return;
        }
        setAsignaciones(data || []);
        setLoading(false);
    }

    return (
        <div className="page-container">
            <h1>Gestión de Asignaciones Cargo-Usuario</h1>
            <CargoUsuarioList asignaciones={asignaciones} loading={loading} />
        </div>
    );
};

export default CargoUsuarioListPage;