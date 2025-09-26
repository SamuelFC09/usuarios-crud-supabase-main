import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import { useEffect, useState } from "react";

const HorarioDeletePage = () => {
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

    const deleteHorario = async () => {
        const { error } = await supabase
            .from("horarios")
            .delete()
            .eq("id", id);

        if (error) {
            console.error('Error deleting horario:', error);
            alert('Error al eliminar el horario');
            return null;
        }
        return true;
    };

    const handleDelete = async () => {
        await deleteHorario();
        navigate('/horarios');
    };

    const handleCancel = () => {
        navigate('/horarios');
    };

    if (loading) {
        return (
            <div className="page-container">
                <h2>Eliminar Horario</h2>
                <p>Cargando información...</p>
            </div>
        );
    }

    return (
        <div className="page-container">
            <h2>Eliminar Horario</h2>
            {horario ? (
                <div className="delete-confirmation">
                    <p>¿Estás seguro de que quieres eliminar este horario?</p>
                    <div className="horario-info">
                        <p><strong>ID:</strong> {horario.id}</p>
                        <p><strong>Hora Ingreso:</strong> {horario.hora_ingreso}</p>
                        <p><strong>Hora Salida:</strong> {horario.hora_salida}</p>
                    </div>
                    <div className="delete-actions">
                        <button onClick={handleDelete} className="btn btn-danger">
                            Sí, Eliminar
                        </button>
                        <button onClick={handleCancel} className="btn btn-secondary">
                            Cancelar
                        </button>
                    </div>
                </div>
            ) : (
                <p>Error: No se pudo cargar la información del horario.</p>
            )}
        </div>
    );
};

export default HorarioDeletePage;