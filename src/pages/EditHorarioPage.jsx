import { useParams, useNavigate } from "react-router-dom";
import HorarioForm from "../components/HorarioForm";
import supabase from '../supabase/supabaseClient';
import { useEffect, useState } from "react";

const EditHorarioPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [horario, setHorario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getHorario();
    }, [id]);

    const getHorario = async () => {
        const { data, error } = await supabase
            .from("horarios")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error('Error fetching horario:', error);
            setLoading(false);
            return;
        }
        setHorario(data);
        setLoading(false);
    };

    const updateHorario = async (horarioData) => {
        const { data, error } = await supabase
            .from("horarios")
            .update(horarioData)
            .eq("id", id)
            .select();

        if (error) {
            console.error('Error updating horario:', error);
            alert('Error al actualizar el horario');
            return null;
        }
        return data;
    };

    const handleSubmit = (horarioData) => {
        updateHorario(horarioData);
        navigate('/horarios');
    };

    if (loading) {
        return (
            <div className="page-container">
                <h2>Editar Horario</h2>
                <p>Cargando información del horario...</p>
            </div>
        );
    }

    return (
        <div className="page-container">
            <h2>Editar Horario</h2>
            {horario ? (
                <HorarioForm 
                    onSubmit={handleSubmit} 
                    editingHorario={horario}
                    isEditing={true}
                />
            ) : (
                <p>Error: No se pudo cargar la información del horario.</p>
            )}
        </div>
    );
};

export default EditHorarioPage;