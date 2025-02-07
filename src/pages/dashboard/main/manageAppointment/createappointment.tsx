import { useSelector } from 'react-redux';
import { useCreateAppointmentMutation } from '../../../../features/appointment/appointmentapi';
import { useFetchUsersByRoleQuery } from '../../../../features/users/usersAPI';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '../../../../app/store';
import { Toaster, toast } from 'sonner';

// Validation schema using Yup
const validationSchema = yup.object().shape({
  lawyer_id: yup.number().required('Lawyer is required'),
  appointment_date: yup.string().required('Appointment date is required'),
  status: yup.string().required('Status is required'),
});

const CreateAppointmentForm: React.FC = () => {
  const [createAppointment, { isLoading, isSuccess, isError }] = useCreateAppointmentMutation();
  const user = useSelector((state: RootState) => state.user);
  const userId = user.user?.user_id ?? 0;

  const { data: lawyers = [], isLoading: isLoadingLawyers, isError: isErrorLawyers } = useFetchUsersByRoleQuery(); // Set default value to empty array

  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      lawyer_id: 0,
      appointment_date: '',
      status: 'pending',
    },
  });

  const onSubmit = async (formData: any) => {
    try {
      await createAppointment({ ...formData, client_id: userId }).unwrap();
      toast.success('🎉 Appointment created successfully!');
      reset();
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast.error('❌ Failed to create appointment.');
    }
  };

  if (isLoadingLawyers) return <p>Loading lawyers...</p>;
  if (isErrorLawyers) return <p>Error loading lawyers. Please try again.</p>;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
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
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="w-full sm:w-4/5 max-w-4xl bg-white p-4 sm:p-8 rounded-lg shadow-md space-y-6"
      >
        <h2 className="bg-blue-500 text-white text-2xl font-bold text-center py-4 rounded-md">Create a New Appointment</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Lawyer Selection */}
          <div className="flex flex-col">
            <label htmlFor="lawyer_id" className="font-medium text-gray-700">Select Lawyer</label>
            <select 
              {...register('lawyer_id')} 
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value="">Select a lawyer</option>
              {lawyers.map((lawyer) => (
                <option key={lawyer.user_id} value={lawyer.user_id}>
                  {lawyer.full_name}
                </option>
              ))}
            </select>
            {errors.lawyer_id && <p className="text-red-500 text-sm">{errors.lawyer_id.message}</p>}
          </div>

          {/* Appointment Date */}
          <div className="flex flex-col">
            <label htmlFor="appointment_date" className="font-medium text-gray-700">Appointment Date</label>
            <input 
              type="datetime-local" 
              {...register('appointment_date')} 
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {errors.appointment_date && <p className="text-red-500 text-sm">{errors.appointment_date.message}</p>}
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label htmlFor="status" className="font-medium text-gray-700">Status</label>
            <select 
              {...register('status')} 
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
          </div>
        </div>
        
        <button 
          type="submit" 
          className="w-full sm:w-56 bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-blue-600 transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Create Appointment'}
        </button>

        {isSuccess && <p className="text-green-500 text-center mt-4">Appointment created successfully!</p>}
        {isError && <p className="text-red-500 text-center mt-4">Error creating appointment. Please try again.</p>}
      </form>
    </div>
  );
};

export default CreateAppointmentForm;
