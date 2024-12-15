import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { TicketAPI, TypeTickets } from "../../../../features/Tickets/AllTickets";
import { logAPI } from "../../../../features/logs/logsapi";
import { RootState } from "../../../../app/store";
import AnimatedLoader from "../../../../components/AnimatedLoader";
import { useSelector } from "react-redux";
import { FaTicketAlt, FaCheckCircle, FaUser, FaEnvelope, FaFileAlt, FaRedo, FaTimes, FaPhone , FaRegComment, FaCalendarAlt , FaHeading ,
    FaIdCard} from "react-icons/fa";

const AllTicket = () => {
    const [tickets, setTickets] = useState<TypeTickets[]>([]);
    const { data: allUserTickets, isError, isLoading } = TicketAPI.useGetTicketsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 600000,
    });
    const [updateTicket] = TicketAPI.useUpdateTicketMutation();
    const { user } = useSelector((state: RootState) => state.user);
    const user_id = user?.user_id;
    const [addLog] = logAPI.useCreateLogMutation();
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<'success' | 'error' | null>(null);
    const [loadingTicketId, setLoadingTicketId] = useState<number | null>(null);
   

    const [filters, setFilters] = useState({
        full_name: '',
        email: '',
        subject: '',
        status: ''
    });

    const [selectedTickets, setSelectedTickets] = useState<Set<number>>(new Set());

    useEffect(() => {
        if (allUserTickets) {
            setTickets(allUserTickets);
        }
    }, [allUserTickets]);
    const showToast = (message: string, type: 'success' | 'error') => {
        setToastMessage(message);
        setToastType(type);
        setTimeout(() => {
            setToastMessage(null);
            setToastType(null);
        }, 3000);
    };

    const handleUpdateStatus = async (ticket_id: number, status: string) => {
        try {
            setLoadingTicketId(ticket_id);
            await updateTicket({ ticket_id, status }).unwrap();
            await addLog({ user_id, action: `📜 Ticket ${ticket_id} status updated to ${status}` }).unwrap();
            showToast('🎉 Ticket status updated successfully!', 'success');
        } catch (err) {
            showToast('❌ Failed to update ticket status', 'error');
        } finally {
            setLoadingTicketId(null);
        }
    };

    const handleBulkUpdateStatus = async (status: string) => {
        const selectedTicketIds = Array.from(selectedTickets);
        try {
            for (const ticket_id of selectedTicketIds) {
                await updateTicket({ ticket_id, status }).unwrap();
                await addLog({ user_id, action: `📜 Ticket ${ticket_id} status updated to ${status}` }).unwrap();
            }
            showToast('🎉 Bulk ticket status updated successfully!', 'success');
        } catch (err) {
            showToast('❌ Failed to update tickets status', 'error');
        }
    };

    // Filtering tickets based on filters
    const filteredTickets = tickets.filter((ticket) => {
        return (
            (filters.full_name ? ticket.user.full_name.toLowerCase().includes(filters.full_name.toLowerCase()) : true) &&
            (filters.email ? ticket.user.email.toLowerCase().includes(filters.email.toLowerCase()) : true) &&
            (filters.subject ? ticket.subject.toLowerCase().includes(filters.subject.toLowerCase()) : true) &&
            (filters.status ? ticket.status.toLowerCase() === filters.status.toLowerCase() : true)
        );
    });


    

    // Conditional rendering during loading state
    if (isLoading) {
        return <div className="text-center"><AnimatedLoader /> Loading Tickets...</div>;
    }

    if (isError) {
        showToast('❌ Failed to load tickets', 'error');
        return <div className="text-center">Failed to load tickets</div>;
    }

    const resetFilters = () => {
        setFilters({
            full_name: '',
            email: '',
            subject: '',
            status: ''
        });
    };

    const handleTicketSelection = (ticketId: number) => {
        setSelectedTickets(prevState => {
            const newSelection = new Set(prevState);
            if (newSelection.has(ticketId)) {
                newSelection.delete(ticketId);
            } else {
                newSelection.add(ticketId);
            }
            return newSelection;
        });
    };

    return (
        <div className="container mx-auto py-6 px-4">
            <div className="breadcrumbs text-sm my-6 text-yellow-300 flex items-center gap-2">
                <FaTicketAlt />
                <ul className="flex gap-2">
                    <li><Link to="/dashboard/profile">🏠 Dashboard</Link></li>
                    <li><Link to="/dashboard/account">📋 Admin</Link></li>
                    <li><span className="inline-flex items-center gap-2">🎟️ Tickets</span></li>
                </ul>
            </div>

            {toastMessage && (
                <div className={`toast ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'} p-3 rounded-md text-white mb-4`}>
                    {toastMessage}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 mb-2">
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
                        placeholder="Search by Subject"
                        value={filters.subject}
                        onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                        className="input input-bordered w-full md:w-64"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <FaTicketAlt />
                    <select
                        title="status"
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        className="select select-bordered w-full md:w-64"
                    >
                        <option value="">All Statuses</option>
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
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
                🚀 Pending Tickets
            </h2>

            <div className="flex justify-between mb-4">
                <button
                    className="btn bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => handleBulkUpdateStatus('Closed')}
                    disabled={selectedTickets.size === 0}
                >
                    Close Selected Tickets
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-4 gap-6">
                {filteredTickets.filter(ticket => ticket.status === 'Open').map((ticket) => (
                    <div key={ticket.ticket_id} className="card shadow-lg p-6 bg-gradient-to-r from-indigo-100 to-indigo-300 rounded-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                        <input
                            title="checkbox"
                            type="checkbox"
                            checked={selectedTickets.has(ticket.ticket_id)}
                            onChange={() => handleTicketSelection(ticket.ticket_id)}
                            className="checkbox"
                        />
                        <h3 className="text-xl font-bold text-indigo-700">
                            🎫 Ticket ID: {ticket.ticket_id}
                        </h3>
                        <h4 className="text-lg text-indigo-600 font-medium mt-2">
                            📝 {ticket.subject}
                        </h4>
                        <div className="p-4 bg-white border border-indigo-400 rounded-md mt-4 shadow-sm">
                            {/* <p className="text-lg text-indigo-600 font-medium mt-2"> 📰description</p> */}
                            <p className="text-md text-gray-800"><FaRegComment className="inline mr-1 text-indigo-600" />{ticket.description}</p>
                        </div>
                        <p className="text-sm mt-2 text-gray-600">
                             <FaUser className="inline" /> name:{ticket.user.full_name}
                        </p>
                        <p className="text-sm mt-2 text-gray-600">< FaEnvelope className="inline mr-1 text-indigo-600" />email:{ticket.user.email}</p>
                        <p className="text-sm mt-2 text-gray-600"><FaPhone className="inline mr-1 text-green-600" />phone: {ticket.user.phone_number}</p>
                        <div className="mt-4">
                            <button
                                className="btn btn-outline btn-info mr-2 text-white hover:bg-indigo-500"
                                onClick={() => handleUpdateStatus(ticket.ticket_id, 'Closed')}
                                disabled={loadingTicketId === ticket.ticket_id}
                            >
                                {loadingTicketId === ticket.ticket_id ? 'Closing...' : <FaCheckCircle className="inline mr-2" />}
                                Close Ticket
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="text-3xl font-semibold mt-8 mb-6 text-gray-700">
                ✅ Closed Tickets
            </h2>
            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
                <table className="table table-zebra text-gray-800">
                    <thead className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
                        <tr className="text-xl">
                            <th>🎫</th>
                            <th>📝 Subject</th>
                            <th>💬 Message</th>
                            <th>🙋 Full Name</th>
                            
                            <th>📧 Email</th>
                            <th><FaPhone className="inline mr-1 text-green-600" />phnone</th>
                            <th>📅 Date</th>
                            <th>⚙️ Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTickets.filter(ticket => ticket.status === 'Closed').map(ticket => (
                            <tr key={ticket.ticket_id} className="hover:bg-indigo-50">
                                <td><FaIdCard  className="inline mr-1 text-indigo-600" />{ticket.ticket_id}</td>
                                <td><FaHeading className="inline mr-1 text-indigo-600" />{ticket.subject}</td>
                               
                                <td><FaRegComment className="inline mr-1 text-indigo-600" />{ticket.description}</td>
                                <td><FaUser className="inline mr-1 text-indigo-600" />{ticket.user.full_name}</td>
                                
                                <td><FaEnvelope className="inline mr-1 text-indigo-600" />{ticket.user.email}</td>
                                <td><FaPhone className="inline mr-1  text-indigo-600" />{ticket.user.phone_number}</td>
                                
                                <td><FaCalendarAlt className="inline mr-1 text-indigo-600" />{ticket.updated_at}</td>
                                <td>
                                    <button
                                        onClick={() => handleUpdateStatus(ticket.ticket_id, 'Open')}
                                        className="btn btn-outline bg-yellow-500 text-white"
                                    >
                                        <FaRedo className="inline" /> Reopen
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllTicket;