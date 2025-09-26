import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import { useEffect, useState } from "react";

const CargoUsuarioDeletePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [asignacion, setAsignacion] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [cargo, setCargo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAsignacion();
    }, [id]);

    const getAsignacion = async () => {
        try {
            const { data: asignacionData, error } = await supabase
                .from("cargos_usuarios")
                .select("*")
                .eq("id", id)
                .single();

            if (error) throw error;

            // Cargar datos relacionados
            const [usuarioRes, cargoRes] = await Promise.all([
                supabase.from("usuarios").select("nombre, email").eq("id", asignacionData.id_usuario).single(),
                supabase.from("cargos").select("cargo").eq("id", asignacionData.id_cargo).single()
            ]);

            setAsignacion(asignacionData);
            setUsuario(usuarioRes.data);
            setCargo(cargoRes.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const deleteAsignacion = async () => {
        const { error } = await supabase
            .from("cargos_usuarios")
            .delete()
            .eq("id", id);

        if (error) {
            console.error('Error deleting asignacion:', error);
            alert('Error al eliminar la asignación');
            return null;
        }
        return true;
    };

    const handleDelete = async () => {
        await deleteAsignacion();
        navigate('/cargos-usuarios');
    };

    const handleCancel = () => {
        navigate('/cargos-usuarios');
    };

    if (loading) {
        return (
            <div className="page-container">
                <h2>Eliminar Asignación</h2>
                <p>Cargando información...</p>
            </div>
        );
    }

    const formatFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-ES');
    };

    return (
        <div className="page-container">
            <h2>Eliminar Asignación</h2>
            {asignacion && usuario && cargo ? (
                <div className="delete-confirmation">
                    <p>¿Estás seguro de que quieres eliminar esta asignación?</p>
                    <div className="asignacion-info">
                        <p><strong>Usuario:</strong> {usuario.nombre} ({usuario.email})</p>
                        <p><strong>Cargo:</strong> {cargo.cargo}</p>
                        <p><strong>Fecha Inicio:</strong> {formatFecha(asignacion.fecha_inicio)}</p>
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
                <p>Error: No se pudo cargar la información de la asignación.</p>
            )}
        </div>
    );
};

export default CargoUsuarioDeletePage;