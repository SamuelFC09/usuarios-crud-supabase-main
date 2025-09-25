import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import { useEffect, useState } from "react";

const CargoDeletePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cargo, setCargo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCargo();
    }, [id]);

    const getCargo = async () => {
        const { data, error } = await supabase
            .from("cargos")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error('Error fetching cargo:', error);
            setLoading(false);
            return;
        }
        setCargo(data);
        setLoading(false);
    };

    const deleteCargo = async () => {
        // Verificar si el cargo está siendo usado en cargos_usuarios
        const { data: relaciones, error: errorRelaciones } = await supabase
            .from("cargos_usuarios")
            .select("id")
            .eq("id_cargo", id)
            .limit(1);

        if (errorRelaciones) {
            console.error('Error checking relations:', errorRelaciones);
        }

        if (relaciones && relaciones.length > 0) {
            alert('No se puede eliminar el cargo porque está asignado a usuarios.');
            navigate('/cargos');
            return;
        }

        const { error } = await supabase
            .from("cargos")
            .delete()
            .eq("id", id);

        if (error) {
            console.error('Error deleting cargo:', error);
            alert('Error al eliminar el cargo');
            return null;
        }
        return true;
    };

    const handleDelete = async () => {
        console.log('Deleting cargo with id:', id);
        await deleteCargo();
        navigate('/cargos');
    };

    const handleCancel = () => {
        navigate('/cargos');
    };

    if (loading) {
        return (
            <div className="page-container">
                <h2>Eliminar Cargo</h2>
                <p>Cargando información...</p>
            </div>
        );
    }

    return (
        <div className="page-container">
            <h2>Eliminar Cargo</h2>
            {cargo ? (
                <div className="delete-confirmation">
                    <p>¿Estás seguro de que quieres eliminar el cargo?</p>
                    <div className="cargo-info">
                        <p><strong>ID:</strong> {cargo.id}</p>
                        <p><strong>Cargo:</strong> {cargo.cargo}</p>
                        <p><strong>Sueldo:</strong> ${cargo.sueldo}</p>
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
                <p>Error: No se pudo cargar la información del cargo.</p>
            )}
        </div>
    );
};

export default CargoDeletePage;