import { useParams, useNavigate } from "react-router-dom";
import CargoForm from "../components/CargoForm";
import supabase from '../supabase/supabaseClient';
import { useEffect, useState } from "react";

const EditCargoPage = () => {
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
        console.log('Cargo data:', data);
    };

    const updateCargo = async (cargoData) => {
        const { data, error } = await supabase
            .from("cargos")
            .update(cargoData)
            .eq("id", id)
            .select();

        if (error) {
            console.error('Error updating cargo:', error);
            alert('Error al actualizar el cargo');
            return null;
        }
        return data;
    };

    const handleSubmit = (cargoData) => {
        console.log('Updating cargo:', cargoData);
        updateCargo(cargoData);
        navigate('/cargos');
    };

    if (loading) {
        return (
            <div className="page-container">
                <h2>Editar Cargo</h2>
                <p>Cargando información del cargo...</p>
            </div>
        );
    }

    return (
        <div className="page-container">
            <h2>Editar Cargo</h2>
            {cargo ? (
                <CargoForm 
                    onSubmit={handleSubmit} 
                    editingCargo={cargo}
                    isEditing={true}
                />
            ) : (
                <p>Error: No se pudo cargar la información del cargo.</p>
            )}
        </div>
    );
};

export default EditCargoPage;