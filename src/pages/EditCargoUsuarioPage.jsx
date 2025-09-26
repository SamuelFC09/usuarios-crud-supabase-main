import { useParams, useNavigate } from "react-router-dom";
import CargoUsuarioForm from "../components/CargoUsuarioForm";
import supabase from '../supabase/supabaseClient';
import { useEffect, useState } from "react";

const EditCargoUsuarioPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [asignacion, setAsignacion] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAsignacion();
    }, [id]);

    const getAsignacion = async () => {
        const { data, error } = await supabase
            .from("cargos_usuarios")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error('Error fetching asignacion:', error);
            setLoading(false);
            return;
        }
        setAsignacion(data);
        setLoading(false);
    };

    const updateAsignacion = async (asignacionData) => {
        const { data, error } = await supabase
            .from("cargos_usuarios")
            .update(asignacionData)
            .eq("id", id)
            .select();

        if (error) {
            console.error('Error updating asignacion:', error);
            alert('Error al actualizar la asignación');
            return null;
        }
        return data;
    };

    const handleSubmit = (asignacionData) => {
        updateAsignacion(asignacionData);
        navigate('/cargos-usuarios');
    };

    if (loading) {
        return (
            <div className="page-container">
                <h2>Editar Asignación</h2>
                <p>Cargando información de la asignación...</p>
            </div>
        );
    }

    return (
        <div className="page-container">
            <h2>Editar Asignación</h2>
            {asignacion ? (
                <CargoUsuarioForm 
                    onSubmit={handleSubmit} 
                    editingAsignacion={asignacion}
                    isEditing={true}
                />
            ) : (
                <p>Error: No se pudo cargar la información de la asignación.</p>
            )}
        </div>
    );
};

export default EditCargoUsuarioPage;