import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { caseAndPaymentAPI, TypeCases } from "../../../../features/case/caseAPI"; // Adjusted import
import { Toaster, toast } from 'sonner';
import { logAPI } from "../../../../features/logs/logsapi";
import { RootState } from "../../../../app/store";
import AnimatedLoader from "../../../../components/AnimatedLoader";
import { useSelector } from "react-redux";
import { 
    FaFileAlt, FaCheckCircle, FaUser, FaEnvelope, FaTimes, 
    FaPhone, FaRegComment, FaCalendarAlt, FaIdCard 
} from "react-icons/fa";

const AllCases = () => {
    const [cases, setCases] = useState<TypeCases[]>([]);
    const [selectedCase, setSelectedCase] = useState<TypeCases | null>(null); // State for selected case
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const { data: allUserCases, isError, isLoading } = caseAndPaymentAPI.useFetchCasesQuery(undefined, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 600000,
    });
    const [updateCase] = caseAndPaymentAPI.useUpdateCaseMutation(); // Adjusted for cases
    const { user } = useSelector((state: RootState) => state.user);
    const user_id = user?.user_id;
    const [addLog] = logAPI.useCreateLogMutation();
    

    const [loadingCaseId, setLoadingCaseId] = useState<number | null>(null);
    const [loadingReopenId, setLoadingReopenId] = useState<number | null>(null);
   
    const [filters, setFilters] = useState({
        full_name: '',
        email: '',
        subject: '',
        status: ''
    });

    const [selectedCases, setSelectedCases] = useState<Set<number>>(new Set());

    useEffect(() => {
        if (allUserCases) {
            setCases(allUserCases);
        }
    }, [allUserCases]);



    const handleUpdateStatus = async (case_id: number, status: string) => {
        try {
            setLoadingCaseId(case_id);
            await updateCase({ case_id, case_status: status }).unwrap(); // Adjusted for cases
            await addLog({ user_id, action: `📜 Case ${case_id} status updated to ${status}` }).unwrap();
            toast.success ('🎉 Case status updated successfully!');
        } catch (err) {
            toast.error ('❌ Failed to update case status');
        } finally {
            setLoadingCaseId(null);
        }
    };

    const handleBulkUpdateStatus = async (status: string) => {
        const selectedCaseIds = Array.from(selectedCases);
        try {
            for (const case_id of selectedCaseIds) {
                await updateCase({ case_id, case_status: status }).unwrap(); // Adjusted for cases
                await addLog({ user_id, action: `📜 Case ${case_id} status updated to ${status}` }).unwrap();
            }
            toast.success ('🎉 Bulk case status updated successfully!');
        } catch (err) {
            toast.error ('❌ Failed to update cases status');
        }
    };
    

    const handleReopenCase = async (case_id: number) => {
        try {
            setLoadingReopenId(case_id);
            await updateCase({ case_id, case_status: 'open' }).unwrap();
            await addLog({ user_id, action: `📜 Case ${case_id} status updated to open` }).unwrap();
            toast.success ('🎉 Case reopened successfully! ');
        } catch (err) {
            toast.error ('❌ Failed to reopen case');
        } finally {
            setLoadingReopenId(null);
        }
    };

    // Filtering cases based on filters
    const filteredCases = cases.filter((caseItem) => {
        return (
            (filters.full_name ? caseItem.user.full_name.toLowerCase().includes(filters.full_name.toLowerCase()) : true) &&
            (filters.email ? caseItem.user.email.toLowerCase().includes(filters.email.toLowerCase()) : true) &&
            (filters.subject ? caseItem.case_description.toLowerCase().includes(filters.subject.toLowerCase()) : true) &&
            (filters.status ? caseItem.case_status.toLowerCase() === filters.status.toLowerCase() : true)
        );
    });

    // Conditional rendering during loading state
    if (isLoading) {
        return <div className="text-center"><AnimatedLoader /> Loading Cases...</div>;
    }

    if (isError) {
        toast.error ('❌ Failed to load cases');
        return <div className="text-center">Failed to load cases</div>;
    }

    const resetFilters = () => {
        setFilters({
            full_name: '',
            email: '',
            subject: '',
            status: ''
        });
    };

    const handleCaseSelection = (caseId: number) => {
        setSelectedCases(prevState => {
            const newSelection = new Set(prevState);
            if (newSelection.has(caseId)) {
                newSelection.delete(caseId);
            } else {
                newSelection.add(caseId);
            }
            return newSelection;
        });
    };

    const openModal = (caseItem: TypeCases) => {
        setSelectedCase(caseItem);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCase(null);
    };

    return (
        <>
        <Toaster position="top-right" />
        <div className="container mx-auto py-6 px-4">
            {/* Toast Notification */}
            {/* {toastMessage && (
                <div className={`toast ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'} position="top-right" `}>
                    {toastMessage}
                </div>
            )} */}

            <div className="breadcrumbs text-sm my-6 text-yellow-300 flex items-center gap-2">
                <FaFileAlt />
                <ul className="flex gap-2">
                    <li><Link to="/dashboard/profile">🏠 Dashboard</Link></li>
                    <li><Link to="/dashboard/account">📋 Admin</Link></li>
                    <li><span className="inline-flex items-center gap-2">📁 Cases</span></li>
                </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
                <div className="flex items-center gap-1">
                    <FaUser />
                    <input
                        type="text"
                        placeholder="Search by Full Name"
                        value={filters.full_name}
                        onChange={(e) => setFilters({ ...filters, full_name: e.target.value })}
                        className="input input-bordered w-full md:w-64"
                    />
                </div>
                <div className="flex items-center gap-1">
                    <FaEnvelope />
                    <input
                        type="text"
                        placeholder="Search by Email"
                        value={filters.email}
                        onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                        className="input input-bordered w-full md:w-64"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <FaFileAlt />
                    <input
                        type="text"
                        placeholder="Search by Description"
                        value={filters.subject}
                        onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                        className="input input-bordered w-full md:w-64"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <FaFileAlt />
                    <select
                        title="status"
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        className="select select-bordered w-full md:w-64"
                    >
                        <option value="">All Statuses</option>
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
                <div className="flex justify-center items-center">
                    <button
                        onClick={resetFilters}
                        className="btn btn-outline btn-error mt-4 md:mt-0"
                    >
                        <FaTimes className="inline mr-2" />
                        Reset Filters
                    </button>
                </div>
            </div>

            <h2 className="text-3xl font-semibold mb-6 text-indigo-600">
                🚀 Pending Cases
            </h2>

            <div className="flex justify-between mb-4">
                <button
                    className="btn bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => handleBulkUpdateStatus('closed')}
                    disabled={selectedCases.size === 0}
                >
                    Close Selected Cases
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                {filteredCases.filter(caseItem => caseItem.case_status === 'open' || caseItem.case_status === 'in_progress').map((caseItem) => (
                    <div key={caseItem.case_id} className="card shadow-lg p-6 bg-gradient-to-r from-indigo-100 to-indigo-300 rounded-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                        <input
                            title="checkbox"
                            type="checkbox"
                            checked={selectedCases.has(caseItem.case_id)}
                            onChange={() => handleCaseSelection(caseItem.case_id)}
                            className="checkbox"
                        />
                        <h3 className="text-xl font-bold text-indigo-700">
                            📁 Case ID: {caseItem.case_id}
                        </h3>
                        <h4 className="text-lg text-indigo-600 font-medium mt-2">
                            📝 {caseItem.case_description}
                        </h4>
                        <div className="p-4 bg-white border border-indigo-400 rounded-md mt-4 shadow-sm">
                            <p className="text-md text-gray-800">
                                <FaRegComment className="inline mr-1 text-indigo-600" />
                                {caseItem.case_description}
                            </p>
                        </div>
                        <p className="text-sm mt-2 text-gray-600">
                             <FaUser className="inline" /> Name: {caseItem.user.full_name}
                        </p>
                        <p className="text-sm mt-2 text-gray-600">
                            <FaEnvelope className="inline mr-1 text-indigo-600" /> Email: {caseItem.user.email}
                        </p>
                        <p className="text-sm mt-2 text-gray-600">
                            <FaPhone className="inline mr-1 text-green-600" /> Phone: {caseItem.user.phone_number}
                        </p>
                        <p className="text-sm mt-2 text-gray-600">
                            <strong>Case Type:</strong> {caseItem.case_type}
                        </p>
                        <p className="text-sm mt-2 text-gray-600">
                            <strong>Case Number:</strong> {caseItem.case_number}
                        </p>
                        <p className="text-sm mt-2 text-gray-600">
                            <strong>Track Number:</strong> {caseItem.case_track_number}
                        </p>
                        <p className="text-sm mt-2 text-gray-600">
                            <strong>Fee:</strong> ${caseItem.fee}
                        </p>
                        <p className="text-sm mt-2 text-gray-600">
                            <strong>Payment Status:</strong> {caseItem.payment_status}
                        </p>
                        <p className="text-sm mt-2 text-gray-600">
                            <strong>Created At:</strong> {new Date(caseItem.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-sm mt-2 text-gray-600">
                            <strong>Updated At:</strong> {new Date(caseItem.updated_at).toLocaleDateString()}
                        </p>
                        <div className="mt-4">
                            <button
                                className="btn btn-outline btn-info mr-2 text-white hover:bg-indigo-500"
                                onClick={() => handleUpdateStatus(caseItem.case_id, 'closed')}
                                disabled={loadingCaseId === caseItem.case_id}
                            >
                                {loadingCaseId === caseItem.case_id ? 'Closing...' : <FaCheckCircle className="inline mr-2" />}
                                Close Case
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="text-3xl font-semibold mt-8 mb-6 text-gray-700">
                ✅ Closed Cases
            </h2>
            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
                <table className="table table-zebra text-gray-800">
                    <thead className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
                        <tr className="text-xl">
                            <th>📁</th>
                            <th>🙋 Full Name</th>
                            <th><FaPhone className="inline mr-1 text-green-600" />Phone</th>
                            <th>Case Type</th>
                            <th>Case Number</th>
                            <th>Track Number</th>
                            <th>Fee</th>
                            <th>Payment Status</th>
                            <th>📅 Date</th>
                            <th>⚙️ Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCases.filter(caseItem => caseItem.case_status === 'closed').map(caseItem => (
                            <tr key={caseItem.case_id} className="hover:bg-indigo-50">
                                <td><FaIdCard className="inline mr-1 text-indigo-600" />{caseItem.case_id}</td>
                                <td><FaUser className="inline mr-1 text-indigo-600" />{caseItem.user.full_name}</td>
                                <td><FaPhone className="inline mr-1 text-indigo-600" />{caseItem.user.phone_number}</td>
                                <td>{caseItem.case_type}</td>
                                <td>{caseItem.case_number}</td>
                                <td>{caseItem.case_track_number}</td>
                                <td>${caseItem.fee}</td>
                                <td>{caseItem.payment_status}</td>
                                <td>
                                    <FaCalendarAlt className="inline mr-1 text-indigo-600" />
                                    {new Date(caseItem.updated_at).toLocaleDateString()}
                                </td>
                                <td className="flex gap-2 justify-center">
                                    <button className="btn btn-outline btn-info text-white hover:bg-indigo-500" onClick={() => openModal(caseItem)}>
                                        View Details
                                    </button>
                                    <div key={caseItem.case_id} className="card shadow-lg">
                 
                        <button 
                            className="btn btn-outline btn-warning"
                            onClick={() => handleReopenCase(caseItem.case_id)}
                            disabled={loadingReopenId === caseItem.case_id}
                        >
                            {loadingReopenId === caseItem.case_id ? 'Reopening...' : 'Reopen Case'}
                        </button>
                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for displaying case details */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3 shadow-lg">
                        <h2 className="text-xl font-bold mb-4 text-indigo-600">Case Details</h2>
                        {selectedCase && (
                            <>
                                <p className="text-md"><strong>Case ID:</strong> {selectedCase.case_id}</p>
                                <p className="text-md"><strong>Full Name:</strong> {selectedCase.user.full_name}</p>
                                <p className="text-md"><strong>Email:</strong> {selectedCase.user.email}</p>
                                <p className="text-md"><strong>Phone:</strong> {selectedCase.user.phone_number}</p>
                                <p className="text-md"><strong>Case Type:</strong> {selectedCase.case_type}</p>
                                <p className="text-md"><strong>Case Number:</strong> {selectedCase.case_number}</p>
                                <p className="text-md"><strong>Track Number:</strong> {selectedCase.case_track_number}</p>
                                <p className="text-md"><strong>Fee:</strong> ${selectedCase.fee}</p>
                                <p className="text-md"><strong>Payment Status:</strong> {selectedCase.payment_status}</p>
                                <p className="text-md"><strong>Created At:</strong> {new Date(selectedCase.created_at).toLocaleDateString()}</p>
                                <p className="text-md"><strong>Updated At:</strong> {new Date(selectedCase.updated_at).toLocaleDateString()}</p>
                                <div className="mt-4">
                                    <strong>Description:</strong>
                                    <div className="border border-gray-300 rounded-md p-2 mt-2 bg-gray-100">
                                        <p>{selectedCase.case_description}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button
                                        className="btn btn-outline btn-warning text-white hover:bg-yellow-500"
                                        onClick={() => handleUpdateStatus(selectedCase.case_id, 'open')}
                                    >
                                        Reopen Case
                                    </button>
                                    <button className="btn btn-outline btn-error" onClick={closeModal}>
                                        <FaTimes className="inline mr-2" /> Close
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default AllCases;




