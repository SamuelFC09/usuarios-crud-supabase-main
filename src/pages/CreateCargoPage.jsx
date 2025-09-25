import { useNavigate } from 'react-router-dom';
import supabase from '../supabase/supabaseClient';
import CargoForm from '../components/CargoForm';

const CreateCargoPage = () => {
    const navigate = useNavigate();

    const createCargo = async (cargoData) => {
        const { data, error } = await supabase
            .from("cargos")
            .insert([cargoData])
            .select();

        if (error) {
            console.error('Error creating cargo:', error);
            alert('Error al crear el cargo');
            return null;
        }
        return data;
    };

    const handleSubmit = (cargoData) => {
        console.log('Creating cargo:', cargoData);
        createCargo(cargoData);
        navigate('/cargos');
    };

    return (
        <div className="page-container">
            <h1>Crear Nuevo Cargo</h1>
            <CargoForm onSubmit={handleSubmit} isEditing={false} />
        </div>
    );
};

export default CreateCargoPage;