import { useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import HorarioForm from '../components/HorarioForm';

const CreateHorarioPage = () => {
    const navigate = useNavigate();

    const createHorario = async (horarioData) => {
        const { data, error } = await supabase
            .from("horarios")
            .insert([horarioData])
            .select();

        if (error) {
            console.error('Error creating horario:', error);
            alert('Error al crear el horario');
            return null;
        }
        return data;
    };

    const handleSubmit = (horarioData) => {
        createHorario(horarioData);
        navigate('/horarios');
    };

    return (
        <div className="page-container">
            <h1>Crear Nuevo Horario</h1>
            <HorarioForm onSubmit={handleSubmit} isEditing={false} />
        </div>
    );
};

export default CreateHorarioPage;