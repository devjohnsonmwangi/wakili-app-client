import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { vehiclesTableAPI } from '../../../../features/events/eventss';
import { Toaster, toast } from 'sonner';
import { Tvehicles } from '../../../../features/events/eventss';
import { useEffect } from 'react';

interface EditVehicleFormProps {
    vehicle: Tvehicles | null;
    modalId: string;
}

const validationSchema = yup.object().shape({
    rental_rate: yup.string().required('Rental Rate is required'),
    availability: yup.boolean().required('Availability is required'),
});

const EditVehicleForm = ({ vehicle, modalId }: EditVehicleFormProps) => {
    const id = vehicle?.vehicle_id;
    const specID = vehicle?.vehicleSpec_id;
    const [updateVehicle] = vehiclesTableAPI.useUpdateVehiclesTableMutation();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if (vehicle) {
            setValue('rental_rate', vehicle.rental_rate);
            setValue('availability', vehicle.availability);
        }
    }, [vehicle, setValue]);

    const onSubmit = async (data: any) => {
        if (!id) {
            toast.error('Vehicle ID is undefined.');
            return;
        }
        try {
            await updateVehicle({ vehicle_id: id, vehicleSpec_id: specID, ...data }).unwrap();
            toast.success('Vehicle updated successfully!');
            setTimeout(() => {
                (document.getElementById(modalId) as HTMLDialogElement)?.close();
            }, 1000);
        } catch (err) {
            console.log(err);
            toast.error('Failed to update vehicle.');
        }
    };

    const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toast.warning('Update cancelled');
        setTimeout(() => {
            (document.getElementById(modalId) as HTMLDialogElement)?.close();
        }, 1000);
    };

    return (
        <>
            <Toaster
                toastOptions={{
                    classNames: {
                        error: 'bg-red-400',
                        success: 'text-green-400',
                        warning: 'text-yellow-400',
                        info: 'bg-blue-400',
                    },
                }}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-wrap gap-4'>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rental_rate">
                            Rental Rate
                        </label>
                        <input
                            id="rental_rate"
                            type="string"
                            {...register('rental_rate')}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.rental_rate ? 'border-red-500' : ''}`}
                        />
                        {errors.rental_rate && <p className="text-red-500 text-xs italic">{errors.rental_rate.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="availability">
                            Availability
                        </label>
                        <input
                            id="availability"
                            type="boolean"
                            {...register('availability')}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.availability ? 'border-red-500' : ''}`}
                        />
                        {errors.availability && <p className="text-red-500 text-xs italic">{errors.availability.message}</p>}
                    </div>

                </div>
                <div className="flex items-center justify-between">
                    <button className="btn bg-webcolor text-text-light hover:text-black" onClick={handleCloseModal}>
                        Discard Changes
                    </button>
                    <button className="bg-webcolor hover:bg-webcolor-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Update
                    </button>
                </div>
            </form>
        </>
    );
};

export default EditVehicleForm;
