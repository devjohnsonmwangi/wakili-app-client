import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TicketAPI } from "../../../../features/Tickets/AllTickets";
import { Toaster, toast } from 'sonner';
import { useEffect, useState } from 'react';
import { TypeTickets } from '../../../../features/Tickets/AllTickets';
import { FaEdit } from 'react-icons/fa'; // Importing an edit icon from react-icons

interface EditTicketFormProps {
    ticket:  TypeTickets  | null;
    modalId: string;
}

const validationSchema = yup.object().shape({
    subject: yup.string().required('Subject is required'),
    description: yup.string().required('Description is required'),
    status: yup.string().required('Status is required'),
});

const EditUserTicket = ({ ticket, modalId }: EditTicketFormProps) => {
    const id = Number(ticket?.ticket_id);
    const userID = ticket?.user_id;
    const [updateTicket] = TicketAPI.useUpdateTicketMutation();
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if (ticket) {
            setValue('subject', ticket.subject);
            setValue('description', ticket.description);
            setValue('status', ticket.status);
        }
    }, [ticket, setValue]);

    const onSubmit = async (data: any) => {
        if (!id) {
            toast.error('Ticket ID is undefined.');
            return;
        }

        setIsLoading(true); // Set loading state to true when the update starts

        try {
            await updateTicket({ ticket_id: id, user_id: userID, ...data }).unwrap();
            toast.success('Ticket updated successfully!');
            setTimeout(() => {
                (document.getElementById(modalId) as HTMLDialogElement)?.close();
            }, 1000);
        } catch (err) {
            toast.error('Failed to update ticket.');
        } finally {
            setIsLoading(false); // Set loading state back to false after the update is finished
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
                        error: 'bg-red-400 text-white p-3 rounded-md shadow-md',
                        success: 'bg-green-400 text-white p-3 rounded-md shadow-md',
                        warning: 'bg-yellow-400 text-white p-3 rounded-md shadow-md',
                        info: 'bg-blue-400 text-white p-3 rounded-md shadow-md',
                    },
                }}
            />
            {/* Header Section */}
            <div className="bg-green-800 text-white text-lg font-semibold p-4 flex items-center space-x-2 rounded-t-lg">
                <FaEdit className="text-white text-2xl" /> {/* Edit Icon */}
                <span>You are updating your ticket ✏️</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white rounded-b-lg shadow-lg">
                <div className="flex flex-col w-full space-y-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="subject">
                            Subject 📚
                        </label>
                        <input
                            id="subject"
                            type="text"
                            {...register('subject')}
                            className={`shadow-lg border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.subject ? 'border-red-500' : ''}`}
                        />
                        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="description">
                            Description ✍️
                        </label>
                        <textarea
                            id="description"
                            {...register('description')}
                            className={`shadow-lg border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none ${errors.description ? 'border-red-500' : ''}`}
                        />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-between mt-6">
                    <button
                        className="btn btn-sm bg-red-600 text-white hover:bg-red-900 font-semibold py-2 px-4 rounded-lg"
                        onClick={handleCloseModal}
                    >
                        ✖ Discard Changes
                    </button>
                    <button
                        className={`btn bg-blue-600 text-white hover:bg-blue-700 font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center space-x-2 ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                        type="submit"
                        disabled={isLoading} // Disable button while loading
                    >
                        {isLoading ? (
                            <div className="animate-spin border-4 border-t-4 border-white w-5 h-5 rounded-full"></div> // Loader spinner
                        ) : (
                            <span>💾 Save Changes</span>
                        )}
                    </button>
                </div>
            </form>
        </>
    );
};

export default EditUserTicket;
