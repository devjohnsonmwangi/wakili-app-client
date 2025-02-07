import { useSelector } from 'react-redux';
import { useCreateCaseMutation } from '../../../../features/case/caseAPI';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '../../../../app/store';
import { Toaster, toast } from 'sonner';

// Validation schema using Yup
const validationSchema = yup.object().shape({
  case_type: yup.string().required('Case type is required'),
  case_status: yup.string().required('Case status is required'),
  case_number: yup.string().required('Case number is required').min(5, 'Case number must be at least 5 characters'),
  case_track_number: yup.string().required('Track number is required').min(5, 'Track number must be at least 5 characters'),
  court:  yup.string().required('court is required'),
  station: yup.string().required('Court station  is required'),
  parties: yup.string().required('parties are  is required').min(5,'parties must be at least 5 characters'),
  fee: yup.number().typeError('Fee must be a number').required('Fee is required').positive('Fee must be a positive number'),


  payment_status: yup.string().required('Payment status is required'),
  case_description: yup.string().required('Case description is required').min(10, 'Description must be at least 10 characters'),
});

const CreateCaseForm: React.FC = () => {
  const [createCase, { isLoading, isSuccess, isError }] = useCreateCaseMutation();
  const user = useSelector((state: RootState) => state.user);
  const userId = user.user?.user_id ?? 0;

  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      case_type: 'criminal',
      case_status: 'open',
      case_description: '',
      case_number: '',
      case_track_number: '',
      court:'',
      station:'',
      parties:'',
      fee: 0,
      payment_status: 'pending',
    },
  });

  const onSubmit = async (formData: any) => {
    try {
      await createCase({ ...formData, user_id: userId }).unwrap();
      toast.success('🎉 Case created successfully!');
      reset();
    } catch (error) {
      console.error('Error creating case:', error);
      toast.error('❌ Failed to create case.');
    }
  };

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
        <h2 className="bg-blue-500 text-white text-2xl font-bold text-center py-4 rounded-md">Create a New Case</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Case Type */}
          <div className="flex flex-col">
            <label htmlFor="case_type" className="font-medium text-gray-700">Case Type</label>
            <select 
              {...register('case_type')} 
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value="criminal">Criminal</option>
              <option value="civil">Civil</option>
              <option value="family">Family</option>
              <option value="corporate">Corporate</option>
              <option value="property">Property</option>
              <option value="employment">Employment</option>
              <option value="intellectual_property">Intellectual Property</option>
              <option value="immigration">Immigration</option>
              <option value="elc">ELC</option>
              <option value="childrenCase">childrencase</option>
              <option value="Tribunal">Tribunal</option>
              <option value="conveyances ">conveyances </option>
              
            </select>
            {errors.case_type && <p className="text-red-500 text-sm">{errors.case_type.message}</p>}
          </div>

          {/* Case Status */}
          <div className="flex flex-col">
            <label htmlFor="case_status" className="font-medium text-gray-700">Case Status</label>
            <select 
              {...register('case_status')} 
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            {errors.case_status && <p className="text-red-500 text-sm">{errors.case_status.message}</p>}
          </div>

          {/* Case Number */}
          <div className="flex flex-col">
            <label htmlFor="case_number" className="font-medium text-gray-700">Case Number</label>
            <input 
              type="text" 
              {...register('case_number')} 
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {errors.case_number && <p className="text-red-500 text-sm">{errors.case_number.message}</p>}
          </div>

          {/* Case Track Number */}
          <div className="flex flex-col">
            <label htmlFor="case_track_number" className="font-medium text-gray-700">Track Number</label>
            <input 
              type="text" 
              {...register('case_track_number')} 
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {errors.case_track_number && <p className="text-red-500 text-sm">{errors.case_track_number.message}</p>}
          </div>
        {/* court */}
          {/* Case Number */}
          <div className="flex flex-col">
            <label htmlFor="court" className="font-medium text-gray-700">Court</label>
            <input 
              type="text" 
              {...register('court')} 
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {errors.court && <p className="text-red-500 text-sm">{errors.court.message}</p>}
          </div>

          {/* station */}
          
          {/* Case Number */}
          <div className="flex flex-col">
            <label htmlFor="station" className="font-medium text-gray-700">station</label>
            <input 
              type="text" 
              {...register('station')} 
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {errors.station && <p className="text-red-500 text-sm">{errors.station.message}</p>}
          </div>
          {/* parties */}
          
          {/* Case Number */}
          <div className="flex flex-col">
            <label htmlFor="parties" className="font-medium text-gray-700">parties</label>
            <input 
              type="text" 
              {...register('parties')} 
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {errors.parties && <p className="text-red-500 text-sm">{errors.parties.message}</p>}
          </div>
          {/* Fee */}
          <div className="flex flex-col">
            <label htmlFor="fee" className="font-medium text-gray-700">Fee</label>
            <input 
              type="number" 
              {...register('fee')} 
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            {errors.fee && <p className="text-red-500 text-sm">{errors.fee.message}</p>}
          </div>

          {/* Payment Status */}
          <div className="flex flex-col">
            <label htmlFor="payment_status" className="font-medium text-gray-700">Payment Status</label>
            <select 
              {...register('payment_status')} 
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
            </select>
            {errors.payment_status && <p className="text-red-500 text-sm">{errors.payment_status.message}</p>}
          </div>

          {/* Case Description */}
          <div className="sm:col-span-2">
            <label htmlFor="case_description" className="font-medium text-gray-700">Case Description</label>
            <textarea 
              {...register('case_description')} 
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              rows={4}
            ></textarea>
            {errors.case_description && <p className="text-red-500 text-sm">{errors.case_description.message}</p>}
          </div>
        </div>
        
        <button 
          type="submit" 
          className="w-full sm:w-56 bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-blue-600 transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Create Case'}
        </button>

        {isSuccess && <p className="text-green-500 text-center mt-4">Case created successfully!</p>}
        {isError && <p className="text-red-500 text-center mt-4">Error creating case. Please try again.</p>}
      </form>
    </div>
  );
};

export default CreateCaseForm;
