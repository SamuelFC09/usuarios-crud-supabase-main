import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';

const CargoUsuarioForm = ({ onSubmit, editingAsignacion, isEditing = false }) => {
    const [formData, setFormData] = useState({
        id_usuario: editingAsignacion?.id_usuario || '',
        id_cargo: editingAsignacion?.id_cargo || '',
        fecha_inicio: editingAsignacion?.fecha_inicio || ''
    });
    const [usuarios, setUsuarios] = useState([]);
    const [cargos, setCargos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        cargarDatos();
    }, []);

    useEffect(() => {
        if (editingAsignacion) {
            setFormData({
                id_usuario: editingAsignacion.id_usuario || '',
                id_cargo: editingAsignacion.id_cargo || '',
                fecha_inicio: editingAsignacion.fecha_inicio || ''
            });
        }
    }, [editingAsignacion]);

    const cargarDatos = async () => {
        try {
            const [usuariosRes, cargosRes] = await Promise.all([
                supabase.from("usuarios").select("id, nombre, email").order('nombre'),
                supabase.from("cargos").select("id, cargo").order('cargo')
            ]);

            if (usuariosRes.error) console.error('Error loading users:', usuariosRes.error);
            if (cargosRes.error) console.error('Error loading cargos:', cargosRes.error);

            setUsuarios(usuariosRes.data || []);
            setCargos(cargosRes.data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error loading data:', error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = { ...formData };
        
        if (isEditing) {
            dataToSubmit.id = editingAsignacion.id;
        }
        
        onSubmit(dataToSubmit);
    };

    const handleCancel = () => {
        navigate('/cargos-usuarios');
    };

    if (loading) {
        return <div className="loading">Cargando datos...</div>;
    }

    return (
        <div className="form-container">
            <h2>{isEditing ? 'Editar Asignación' : 'Asignar Cargo a Usuario'}</h2>
            <form onSubmit={handleSubmit} className="cargo-usuario-form">
                <div className="form-group">
                    <label htmlFor='id_usuario'>Usuario:</label>
                    <select 
                        id="id_usuario" 
                        name="id_usuario" 
                        value={formData.id_usuario}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccionar usuario</option>
                        {usuarios.map(usuario => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nombre} ({usuario.email})
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="form-group">
                    <label htmlFor='id_cargo'>Cargo:</label>
                    <select 
                        id="id_cargo" 
                        name="id_cargo" 
                        value={formData.id_cargo}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccionar cargo</option>
                        {cargos.map(cargo => (
                            <option key={cargo.id} value={cargo.id}>
                                {cargo.cargo}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="form-group">
                    <label htmlFor='fecha_inicio'>Fecha Inicio:</label>
                    <input 
                        type="date" 
                        id="fecha_inicio" 
                        name="fecha_inicio" 
                        value={formData.fecha_inicio}
                        onChange={handleChange}
                        required
                    /> 
                </div>
                
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        {isEditing ? 'Actualizar' : 'Asignar'}
                    </button>
                    <button type="button" onClick={handleCancel} className="btn btn-secondary">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CargoUsuarioForm;