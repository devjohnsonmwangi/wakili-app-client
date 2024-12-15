import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { TicketAPI } from "../../../../features/Tickets/AllTickets";
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Toaster, toast } from 'sonner';
import { TicketIcon } from 'lucide-react'; // Import Heroicons
import { useState } from 'react'; // Import useState

interface FormValues {
    subject: string;
    description: string;
}

const schema = yup.object().shape({
    subject: yup.string().required('Subject is required'),
    description: yup.string().required('Description is required'),
});

const CreateTicket = () => {
    const [createTicket] = TicketAPI.useCreateTicketMutation();
    const user = useSelector((state: RootState) => state.user);
    const user_id = user.user?.user_id ?? 0;

    // State for loading indicator
    const [loading, setLoading] = useState(false); 

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoading(true); // Start loading
        try {
            await createTicket({
                user_id: user_id,
                ...data
            }).unwrap();
            toast.success('🎉 Ticket created successfully!');
        } catch (error) {
            console.log('Failed to create ticket:', error);
            toast.error('❌ Failed to create ticket.');
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-4">
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
            <div className="bg-white w-full md:w-[70%] lg:w-[60%] p-8 shadow-xl rounded-xl relative">
                
                {/* Header Section */}
                <div className="flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-t-xl shadow-md">
                    <TicketIcon className="w-8 h-8 mr-3" />
                    <h3 className="text-center font-bold text-2xl lg:text-3xl">
                        ✍️ Create a New Ticket
                    </h3>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
                    {/* Subject Input */}
                    <div className="relative">
                        <label 
                            htmlFor="subject" 
                            className="block text-lg font-medium text-gray-700 pb-2"
                        >
                            🎫 Subject
                        </label>
                        <input
                            id="subject"
                            type="text"
                            {...register('subject')}
                            className="block w-full p-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.subject && (
                            <p className="text-red-500 text-sm absolute mt-1">{errors.subject.message}</p>
                        )}
                    </div>

                    {/* Description Input */}
                    <div className="relative">
                        <label 
                            htmlFor="description" 
                            className="block text-lg font-medium text-gray-700 pb-2"
                        >
                            📝 Description
                        </label>
                        <textarea
                            id="description"
                            rows={5}
                            {...register('description')}
                            className="block w-full p-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm absolute mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className={`w-full md:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transform transition-all duration-300 flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                    </svg>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <TicketIcon className="w-6 h-6 mr-2" />
                                    Create Ticket
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTicket;
