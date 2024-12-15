import { Toaster, toast } from 'sonner';
import { caseAndPaymentAPI,CaseDataTypes  } from '../../../../features/case/caseAPI';


interface DeleteCaseFormProps {
    caseItem:CaseDataTypes  | null;
    modalId: string;
}

const DeleteCaseForm = ({ caseItem, modalId }: DeleteCaseFormProps) => {
    const [deleteCase] =caseAndPaymentAPI .useDeleteCaseMutation();

    const handleDelete = async () => {
        if (caseItem) {
            try {
                await deleteCase(caseItem.case_id).unwrap();
                toast.success('Case deleted successfully!');
                (document.getElementById(modalId) as HTMLDialogElement)?.close();
            } catch (err) {
                toast.error('Failed to delete case.');
            }
        }
    };

    const handleCloseModal = () => {
        (document.getElementById(modalId) as HTMLDialogElement)?.close();
        toast.warning('Deletion cancelled');
    };

    return (
        <div>
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
            <h3 className='text-center text-base lg:text-lg py-3 text-webcolor font-semibold'>
                Are you sure you want to delete the following case?
            </h3>
            {caseItem && (
                <div>
                    <table className='table-auto m-auto w-full lg:w-[80%]'>
                        <tbody>
                            <tr>
                                <td className='border px-4 py-1'>ID</td>
                                <td className='border px-4 py-1'>{caseItem.case_id}</td>
                            </tr>
                            <tr>
                                <td className='border px-4 py-1'>Title</td>
                                <td className='border px-4 py-1'>{caseItem.case_number}</td>
                            </tr>
                            <tr>
                                <td className='border px-4 py-1'>Status</td>
                                <td className='border px-4 py-1'>{caseItem.case_track_number}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            <div className='flex justify-around mt-4'>
                <button className="btn bg-webcolor text-text-light hover:text-black" onClick={handleCloseModal}>
                    No, cancel
                </button>
                <button className="btn bg-red-600 text-white hover:bg-red-700" onClick={handleDelete}>
                    Yes, I confirm
                </button>
            </div>
        </div>
    );
};

export default DeleteCaseForm;
