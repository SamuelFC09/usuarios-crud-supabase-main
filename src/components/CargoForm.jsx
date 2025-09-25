import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CargoForm = ({ onSubmit, editingCargo, isEditing = false }) => {
    const [formData, setFormData] = useState({
        cargo: editingCargo?.cargo || '',
        sueldo: editingCargo?.sueldo || ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (editingCargo) {
            setFormData({
                cargo: editingCargo.cargo || '',
                sueldo: editingCargo.sueldo || ''
            });
        }
    }, [editingCargo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = { ...formData };
        
        if (isEditing) {
            dataToSubmit.id = editingCargo.id;
        }
        
        if (dataToSubmit.sueldo) {
            dataToSubmit.sueldo = parseFloat(dataToSubmit.sueldo);
        }
        
        onSubmit(dataToSubmit);
    };

    const handleCancel = () => {
        navigate('/cargos');
    };

    return (
        <div className="form-container">
            <h2>{isEditing ? 'Editar Cargo' : 'Crear Cargo'}</h2>
            <form onSubmit={handleSubmit} className="cargo-form">
                <div className="form-group">
                    <label htmlFor='cargo'>Cargo:</label>
                    <input 
                        type="text" 
                        id="cargo" 
                        name="cargo" 
                        value={formData.cargo}
                        onChange={handleChange}
                        required
                    /> 
                </div>
                <div className="form-group">
                    <label htmlFor='sueldo'>Sueldo:</label>
                    <input 
                        type="number" 
                        id="sueldo" 
                        name="sueldo" 
                        value={formData.sueldo}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
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

export default CargoForm;