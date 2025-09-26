import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HorarioForm = ({ onSubmit, editingHorario, isEditing = false }) => {
    const [formData, setFormData] = useState({
        hora_ingreso: editingHorario?.hora_ingreso || '',
        hora_salida: editingHorario?.hora_salida || ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (editingHorario) {
            setFormData({
                hora_ingreso: editingHorario.hora_ingreso || '',
                hora_salida: editingHorario.hora_salida || ''
            });
        }
    }, [editingHorario]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = { ...formData };
        
        if (isEditing) {
            dataToSubmit.id = editingHorario.id;
        }
        
        onSubmit(dataToSubmit);
    };

    const handleCancel = () => {
        navigate('/horarios');
    };

    return (
        <div className="form-container">
            <h2>{isEditing ? 'Editar Horario' : 'Crear Horario'}</h2>
            <form onSubmit={handleSubmit} className="horario-form">
                <div className="form-group">
                    <label htmlFor='hora_ingreso'>Hora Ingreso:</label>
                    <input 
                        type="time" 
                        id="hora_ingreso" 
                        name="hora_ingreso" 
                        value={formData.hora_ingreso}
                        onChange={handleChange}
                        required
                    /> 
                </div>
                <div className="form-group">
                    <label htmlFor='hora_salida'>Hora Salida:</label>
                    <input 
                        type="time" 
                        id="hora_salida" 
                        name="hora_salida" 
                        value={formData.hora_salida}
                        onChange={handleChange}
                        required
                    /> 
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

export default HorarioForm;