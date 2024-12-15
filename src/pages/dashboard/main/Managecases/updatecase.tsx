
import { useUpdateCaseMutation, CaseDataTypes } from '../../../../features/case/caseAPI';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Toaster, toast } from 'sonner';
import { useState, useEffect } from 'react';

interface EditCaseFormProps {
  caseItem: CaseDataTypes | null;
  modalId: string;
}

// Validation schema using Yup for Update Case
const validationSchema = yup.object().shape({
  case_type: yup.string().required('Case type is required'),
  case_status: yup.string().required('Case status is required'),
  case_number: yup.string().required('Case number is required').min(5, 'Case number must be at least 5 characters'),
  case_track_number: yup.string().required('Track number is required').min(5, 'Track number must be at least 5 characters'),
  fee: yup.number().typeError('Fee must be a number').required('Fee is required').positive('Fee must be a positive number'),
  payment_status: yup.string().required('Payment status is required'),
  case_description: yup.string().required('Case description is required').min(10, 'Description must be at least 10 characters'),
});

const UpdateCaseForm = ({ caseItem, modalId }: EditCaseFormProps) => {

  const id = Number(caseItem?.case_id);
  const userId = caseItem?.user_id;
  const [updateCase] = useUpdateCaseMutation();
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const { register, handleSubmit,reset, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(validationSchema),
});

  



  useEffect(() => {
    if (caseItem) {
      
      setValue('case_type', caseItem.case_type);
      setValue('case_status', caseItem.case_status);
      setValue('case_number', caseItem.case_number);
      setValue('case_track_number', caseItem.case_track_number);
      setValue('fee', caseItem.fee);
      setValue('payment_status', caseItem.payment_status);
      setValue('case_description', caseItem?.case_description ?? '');
    }
  }, [caseItem, setValue]);

const onSubmit = async (data: any) => {
  if (!id) {
      toast.error('case ID is undefined.');
      return;
  }

  setIsLoading(true); // Set loading state to true when the update starts

  try {
      await updateCase({ case_id: id, user_id: userId, ...data }).unwrap();
      toast.success('Case updated successfully!');
      setTimeout(() => {
          (document.getElementById(modalId) as HTMLDialogElement)?.close();
      }, 1000);
      reset();
     

  } catch (err) {
      toast.error('Failed to update case.');
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
    <div id={modalId} className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
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
        <h2 className="bg-blue-500 text-white text-2xl font-bold text-center py-4 rounded-md">Update Case</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="case_type" className="font-medium text-gray-700">Case Type</label>
            <select {...register('case_type')} className="p-3 border rounded-md">
            <option value="criminal">Criminal</option>
              <option value="civil">Civil</option>
              <option value="family">Family</option>
              <option value="corporate">Corporate</option>
              <option value="property">Property</option>
              <option value="employment">Employment</option>
              <option value="intellectual_property">Intellectual Property</option>
              <option value="immigration">Immigration</option>
            </select>
            {errors.case_type && <p className="text-red-500 text-sm">{errors.case_type.message}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="case_status" className="font-medium text-gray-700">Case Status</label>
            <select {...register('case_status')} className="p-3 border rounded-md">
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            {errors.case_status && <p className="text-red-500 text-sm">{errors.case_status.message}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="case_number" className="font-medium text-gray-700">Case Number</label>
            <input type="text" {...register('case_number')} className="p-3 border rounded-md" />
            {errors.case_number && <p className="text-red-500 text-sm">{errors.case_number.message}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="case_track_number" className="font-medium text-gray-700">Track Number</label>
            <input type="text" {...register('case_track_number')} className="p-3 border rounded-md" />
            {errors.case_track_number && <p className="text-red-500 text-sm">{errors.case_track_number.message}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="fee" className="font-medium text-gray-700">Fee</label>
            <input type="number" {...register('fee')} className="p-3 border rounded-md" />
            {errors.fee && <p className="text-red-500 text-sm">{errors.fee.message}</p>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="payment_status" className="font-medium text-gray-700">Payment Status</label>
            <select {...register('payment_status')} className="p-3 border rounded-md">
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
            {errors.payment_status && <p className="text-red-500 text-sm">{errors.payment_status.message}</p>}
          </div>

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

        <div className="flex justify-between">
        <button
                        className="submit bg-green-500 text-white py-2 px-4 rounded-md"
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

        {isLoading && <p className="text-blue-500 text-center mt-4">Updating...</p>}
      </form>
    </div>
  );
};

export default UpdateCaseForm;
