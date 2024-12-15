import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { caseAndPaymentAPI, CaseDataTypes,CaseStatus} from "../../../../features/case/caseAPI"; // Adjust this import to your actual Case API file
import { useState, useMemo, useEffect } from 'react';
import CreateCase from '../../main/Managecases/createcase'; // Component to create new cases
import EditUserCase from '../../main/Managecases/updatecase'; // Component to edit existing cases
// import DeleteUserCase from '../../main/Managecases/deletecase'; // Component to delete cases
import { FaEdit,  FaRegWindowRestore, FaPlus, FaSearch } from 'react-icons/fa'; // Icons

// Define your CaseStatus and CaseDataTypes


// MyCases component
const MyCases = () => {
    const user = useSelector((state: RootState) => state.user);
    const user_id = user.user?.user_id ?? 0;

    // Fetch user-specific cases data
    const { data: caseData, isLoading: caseLoading, error: caseError } = caseAndPaymentAPI. useGetUserCasesByUserIdQuery(user_id, {
        refetchOnMountOrArgChange: true,
    });

    // Keep track of the cases locally
    const [cases, setCases] = useState<CaseDataTypes[]>([]);
    const [filter, setFilter] = useState({ subject: '', description: '', status: '' });

    // Update Case
    const [updateCase] = caseAndPaymentAPI.useUpdateCaseMutation();
    const [editCase, setEditCase] = useState<CaseDataTypes | null>(null);
    // const [deleteCase, setDeleteCase] = useState<CaseDataTypes | null>(null);


        // // Update Ticket
        // const [updateTicket] = TicketAPI.useUpdateTicketMutation();
        // const [editTicket, setEditTicket] = useState<TypeTickets | null>(null);
        // const [deleteTicket, setDeleteTicket] = useState<TypeTickets | null>(null);

    // Handle side effects when caseData changes
    useEffect(() => {
        if (caseData) {
            setCases(caseData);
        }
    }, [caseData]);
///
    // const handleDeleteCase = (caseItem: CaseDataTypes) => {
    //     setDeleteCase(caseItem);
    //     (document.getElementById('delete_case_modal') as HTMLDialogElement)?.showModal();
    // }

   const handleEditCase = (caseItem: CaseDataTypes) => {
        setEditCase(caseItem);
        (document.getElementById('edit_case_modal') as HTMLDialogElement)?.showModal();
     }
//
    const handleReopenCase = async (caseItem: CaseDataTypes) => {
        try {
            const updatedCase = { ...caseItem, case_status: 'open' as CaseStatus }; // Reopen the case
            await updateCase(updatedCase);

            // Update the local case list with the reopened case
            setCases((prevCases) =>
                prevCases.map((c) => (c.case_id === caseItem.case_id ? updatedCase : c))
            );
        } catch (error) {
            console.error('Error reopening case', error);
        }
    }

    // Apply filtering logic
    const filteredCases = useMemo(() => {
        if (!cases) return [];
        return cases.filter(caseItem => {
            const matchesSubject = caseItem.case_number.toLowerCase().includes(filter.subject.toLowerCase());
            const matchesDescription = caseItem.case_description?.toLowerCase().includes(filter.description.toLowerCase());
            const matchesStatus = filter.status ? caseItem.case_status.toLowerCase() === filter.status.toLowerCase() : true;
            return matchesSubject && matchesDescription && matchesStatus;
        });
    }, [cases, filter]);

    // Reset the filters
    const resetFilters = () => {
        setFilter({ subject: '', description: '', status: '' });
    };

    if (caseLoading) {
        return <div className="text-center p-8 text-2xl font-bold text-webcolor">Loading...</div>;
    }

    if (caseError) {
        return <div className="text-center p-8 text-xl text-red-600">Error loading data 😞</div>;
    }

    return (
        <div className='bg-slate-100 min-h-screen'>
            <div className='card mx-auto bg-slate-200 w-full rounded-md mb-5 border-2'>
                <h2 className="text-center text-xl sm:text-2xl p-4 rounded-t-md text-webcolor font-bold bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-md">
                    🗂️ My Cases
                </h2>

                {/* Create Case Button */}
                <div className="flex flex-wrap justify-between items-center px-4 py-3 space-x-2 sm:space-x-4">
                    <button
                        className="btn bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out px-6 py-2 rounded-lg shadow-lg flex items-center"
                        onClick={() => (document.getElementById('create_case') as HTMLDialogElement)?.showModal()}
                    >
                        <FaPlus className="mr-2" /> Create Case
                    </button>
                </div>

                {/* Filter Section */}
                <div className="flex flex-wrap justify-between items-center px-4 py-3 space-x-2 sm:space-x-4">
                    <div className="flex flex-wrap items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <FaSearch />
                            <input
                                type="text"
                                placeholder="Search by Case Number"
                                value={filter.subject}
                                onChange={(e) => setFilter({ ...filter, subject: e.target.value })}
                                className="input input-bordered w-40 sm:w-52"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaSearch />
                            <input
                                type="text"
                                placeholder="Search by Description"
                                value={filter.description}
                                onChange={(e) => setFilter({ ...filter, description: e.target.value })}
                                className="input input-bordered w-40 sm:w-52"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaSearch />
                            <select
                                title='status'
                                value={filter.status}
                                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                                className="input input-bordered w-40 sm:w-52"
                            >
                                <option value="">Select Status</option>
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                    </div>

                    {/* Reset Filters Button */}
                    <button
                        className="btn bg-green-800 text-white font-semibold hover:bg-green-700 transition duration-300 ease-in-out px-6 py-2 rounded-lg shadow-lg mt-2 sm:mt-0"
                        onClick={resetFilters}
                    >
                        Reset Filters
                    </button>
                </div>

                <div className="overflow-x-auto px-4 py-2">
                    {filteredCases.length > 0 ? (
                        <table className="table-auto w-full shadow-lg bg-white rounded-lg">
                            <thead className="bg-green-800 text-white">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm sm:text-base">Case ID 📑</th>
                                    <th className="px-4 py-2 text-left text-sm sm:text-base">case_type</th>
                                    <th className="px-4 py-2 text-left text-sm sm:text-base">case_number 📝</th>
                                    <th className="px-4 py-2 text-left text-sm sm:text-base">Description 📰</th>
                                    <th className="px-4 py-2 text-left text-sm sm:text-base">Status ⚡</th>
                                    <th className="px-4 py-2 text-left text-sm sm:text-base">track_number</th> 
                                    <th className="px-4 py-2 text-left text-sm sm:text-base">fees</th>
                                    <th className="px-4 py-2 text-left text-sm sm:text-base">paymentstatus</th>
                                    <th className="px-4 py-2 text-left text-sm sm:text-base">Actions 🔧</th>

                                </tr>
                            </thead>
                            <tbody>
                                {filteredCases.map((caseItem) => (
                                    <tr key={caseItem.case_id} className="border-b hover:bg-slate-100 transition duration-300">
                                        <td className="px-4 py-2 text-sm sm:text-base font-medium text-gray-700">{caseItem.case_id} 📜</td>
                                        <td className="px-4 py-2 text-sm sm:text-base font-medium text-gray-700">{caseItem.case_type}</td>
                                        <td className="px-4 py-2 text-sm sm:text-base font-medium text-gray-700">{caseItem.case_number} ✍️</td>
                                        <td className="px-4 py-2 text-sm sm:text-base text-gray-600">{caseItem.case_description}</td>
                                        <td className="px-4 py-2">
                                            <span className={`inline-block px-2 py-1 rounded-full ${(caseItem.case_status)}`}>
                                                {caseItem.case_status }
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-sm sm:text-base text-gray-600">{caseItem.case_track_number}</td>
                                        <td className="px-4 py-2 text-sm sm:text-base text-gray-600">{caseItem.fee}</td>
                                        <td className="px-4 py-2 text-sm sm:text-base text-gray-600">{caseItem.payment_status}</td>
                                        <td className="px-4 py-2 flex items-center space-x-3">
                                            {caseItem.case_status === 'closed' ? (
                                                <button
                                                    className="btn bg-yellow-500 text-white flex items-center space-x-2"
                                                    onClick={() => handleReopenCase(caseItem)} // Reopen case
                                                >
                                                    <FaRegWindowRestore />
                                                    <span>Reopen</span>
                                                </button>
                                            ) : (
                                                <>
                                                 <button
                                                        className="btn bg-blue-500 text-white flex items-center space-x-2"
                                                        onClick={() => handleEditCase(caseItem)} // Open the edit modal
                                                    >
                                                        <FaEdit />
                                                        <span>Edit</span>
                                                    </button>
                                                    {/* <button
                                                        className="btn bg-red-500 text-white flex items-center space-x-2"
                                                        onClick={() => handleDeleteCase(caseItem)} // Open the delete modal
                                                    >
                                                        <FaTrashAlt />
                                                        <span>Delete</span>
                                                    </button> */}
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-6">No cases found. 🤔</div>
                    )}
                </div>
            </div>
            
            {/* Edit case modal */}
            
            {/* Delete case modal */}
            {/* {deleteCase && <DeleteUserCase caseItem={deleteCase} />} */}
            <dialog id='create_case' className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form method="dialog" className="relative">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <CreateCase />
                </div>
            </dialog>
            {/* {editCase && <EditUserCase caseItem={editCase} />} */}
                       {/* Edit Ticket Modal */}
                       <dialog id='edit_case_modal' className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form method="dialog" className="relative">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <EditUserCase  caseItem={editCase} modalId="edit_case_modal" />
                </div>
            </dialog>
            {/* Edit Ticket Modal */}
            {/* <dialog id='edit_case_modal' className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form method="dialog" className="relative">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <DeleteUserCase caseItem={deleteCase}  modalId="edit_case_modal" />
                </div>
            </dialog> */}
            {/* Create case modal */}
          
        </div>
    );
};



export default MyCases;
