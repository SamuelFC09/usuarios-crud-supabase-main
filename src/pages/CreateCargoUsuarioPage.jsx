import { useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import CargoUsuarioForm from '../components/CargoUsuarioForm';

const CreateCargoUsuarioPage = () => {
    const navigate = useNavigate();

    const createAsignacion = async (asignacionData) => {
        const { data, error } = await supabase
            .from("cargos_usuarios")
            .insert([asignacionData])
            .select();

        if (error) {
            console.error('Error creating asignacion:', error);
            alert('Error al crear la asignación');
            return null;
        }
        return data;
    };

    const handleSubmit = (asignacionData) => {
        createAsignacion(asignacionData);
        navigate('/cargos-usuarios');
    };

    return (
        <div className="page-container">
            <h1>Asignar Cargo a Usuario</h1>
            <CargoUsuarioForm onSubmit={handleSubmit} isEditing={false} />
        </div>
    );
};

export default CreateCargoUsuarioPage;