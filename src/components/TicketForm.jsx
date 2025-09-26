import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';

const TicketForm = ({ onSubmit, editingTicket, isEditing = false }) => {
    const [formData, setFormData] = useState({
        id_usuario: editingTicket?.id_usuario || '',
        fecha: editingTicket?.fecha || '',
        hora: editingTicket?.hora || '',
        tipo: editingTicket?.tipo || 'entrada'
    });
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        cargarUsuarios();
    }, []);

    useEffect(() => {
        if (editingTicket) {
            setFormData({
                id_usuario: editingTicket.id_usuario || '',
                fecha: editingTicket.fecha || '',
                hora: editingTicket.hora || '',
                tipo: editingTicket.tipo || 'entrada'
            });
        }
    }, [editingTicket]);

    const cargarUsuarios = async () => {
        try {
            const { data, error } = await supabase
                .from("usuarios")
                .select("id, nombre, email")
                .order('nombre');

            if (error) {
                console.error('Error loading users:', error);
            } else {
                setUsuarios(data || []);
            }
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
            dataToSubmit.id = editingTicket.id;
        }
        
        onSubmit(dataToSubmit);
    };

    const handleCancel = () => {
        navigate('/tickets');
    };

    if (loading) {
        return <div className="loading">Cargando datos...</div>;
    }

    return (
        <div className="form-container">
            <h2>{isEditing ? 'Editar Ticket' : 'Crear Ticket'}</h2>
            <form onSubmit={handleSubmit} className="ticket-form">
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
                    <label htmlFor='fecha'>Fecha:</label>
                    <input 
                        type="date" 
                        id="fecha" 
                        name="fecha" 
                        value={formData.fecha}
                        onChange={handleChange}
                        required
                    /> 
                </div>
                
                <div className="form-group">
                    <label htmlFor='hora'>Hora:</label>
                    <input 
                        type="time" 
                        id="hora" 
                        name="hora" 
                        value={formData.hora}
                        onChange={handleChange}
                        required
                    /> 
                </div>
                
                <div className="form-group">
                    <label htmlFor='tipo'>Tipo:</label>
                    <select 
                        id="tipo" 
                        name="tipo" 
                        value={formData.tipo}
                        onChange={handleChange}
                        required
                    >
                        <option value="entrada">Entrada</option>
                        <option value="salida">Salida</option>
                        <option value="break">Break</option>
                        <option value="reunion">Reunión</option>
                    </select>
                </div>
                
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        {isEditing ? 'Actualizar' : 'Crear'}
                    </button>
                    <button type="button" onClick={handleCancel} className="btn btn-secondary">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TicketForm;