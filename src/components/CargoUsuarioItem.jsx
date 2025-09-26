import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from '../supabase/supabaseClient';

const CargoUsuarioItem = ({ asignacion }) => {
    const [usuario, setUsuario] = useState(null);
    const [cargo, setCargo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarDatos();
    }, [asignacion]);

    const cargarDatos = async () => {
        try {
            const [usuarioRes, cargoRes] = await Promise.all([
                supabase.from("usuarios").select("nombre, email").eq("id", asignacion.id_usuario).single(),
                supabase.from("cargos").select("cargo, sueldo").eq("id", asignacion.id_cargo).single()
            ]);

            setUsuario(usuarioRes.data);
            setCargo(cargoRes.data);
            setLoading(false);
        } catch (error) {
            console.error('Error loading data:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading-item">Cargando...</div>;
    }

    const formatFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-ES');
    };

    return (
        <div className="cargo-usuario-item">     
            <div className="cargo-usuario-details">
                <p><strong>ID Asignación:</strong> {asignacion.id}</p>
                <p><strong>Usuario:</strong> {usuario?.nombre} ({usuario?.email})</p>
                <p><strong>Cargo:</strong> {cargo?.cargo}</p>
                <p><strong>Fecha Inicio:</strong> {formatFecha(asignacion.fecha_inicio)}</p>
                <p><strong>Sueldo:</strong> ${cargo?.sueldo}</p>
            </div>
            <div className="cargo-usuario-actions">
                <Link to={`/cargos-usuarios/edit/${asignacion.id}`} className="btn btn-secondary">
                    Editar
                </Link>
                <Link to={`/cargos-usuarios/delete/${asignacion.id}`} className="btn btn-danger">
                    Eliminar
                </Link>
            </div>
        </div>
    );
};

export default CargoUsuarioItem;