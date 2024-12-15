import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import { TicketAPI } from "../../../../features/Tickets/AllTickets";
import { useState, useMemo, useEffect } from 'react';
import CreateTicket from './CreateTicket';
import EditUserTicket from './EditUserTicket';
import DeleteUserTicket from './DeleteUserTicket';
import { TypeTickets } from '../../../../features/Tickets/AllTickets';
import { FaEdit, FaTrashAlt, FaRegWindowRestore, FaPlus, FaSearch } from 'react-icons/fa'; // Icons

const MyTickets = () => {
    const user = useSelector((state: RootState) => state.user);
    const user_id = user.user?.user_id?? 0;

    // Fetch user-specific tickets data
    const { data: ticketData, isLoading: ticketLoading, error: ticketError} = TicketAPI.useGetUserTicketsQuery(user_id, {
        refetchOnMountOrArgChange: true,
    });

    // Keep track of the tickets locally
    const [tickets, setTickets] = useState<TypeTickets[]>([]);
    const [filter, setFilter] = useState({ subject: '', description: '', status: '' });

    // Update Ticket
    const [updateTicket] = TicketAPI.useUpdateTicketMutation();
    const [editTicket, setEditTicket] = useState<TypeTickets | null>(null);
    const [deleteTicket, setDeleteTicket] = useState<TypeTickets | null>(null);

    // Handle side effects when ticketData changes
    useEffect(() => {
        if (ticketData) {
            setTickets(ticketData);
        }
    }, [ticketData]);

    const handleDeleteTicket = (ticket: TypeTickets) => {
        setDeleteTicket(ticket);
        (document.getElementById('delete_ticket_modal') as HTMLDialogElement)?.showModal();
    }

    const handleEditTicket = (ticket: TypeTickets) => {
        setEditTicket(ticket);
        (document.getElementById('edit_ticket_modal') as HTMLDialogElement)?.showModal();
    }

    const handleReopenTicket = async (ticket: TypeTickets) => {
        try {
            const updatedTicket = { ...ticket, status: 'Open' };
            await updateTicket(updatedTicket);

            // Update the local ticket list with the reopened ticket
            setTickets((prevTickets) =>
                prevTickets.map((t) => (t.ticket_id === ticket.ticket_id ? updatedTicket : t))
            );
        } catch (error) {
            console.error('Error reopening ticket', error);
        }
    }

    // Apply filtering logic
    const filteredTickets = useMemo(() => {
        if (!tickets) return [];
        return tickets.filter(ticket => {
            const matchesSubject = ticket.subject.toLowerCase().includes(filter.subject.toLowerCase());
            const matchesDescription = ticket.description.toLowerCase().includes(filter.description.toLowerCase());
            const matchesStatus = filter.status ? ticket.status.toLowerCase() === filter.status.toLowerCase() : true;
            return matchesSubject && matchesDescription && matchesStatus;
        });
    }, [tickets, filter]);

    // Reset the filters
    const resetFilters = () => {
        setFilter({ subject: '', description: '', status: '' });
    };

    if (ticketLoading) {
        return <div className="text-center p-8 text-2xl font-bold text-webcolor">Loading...</div>;
    }

    if (ticketError) {
        return <div className="text-center p-8 text-xl text-red-600">Error loading data 😞</div>;
    }

    return (
        <div className='bg-slate-100 min-h-screen'>
            <div className='card mx-auto bg-slate-200 w-full rounded-md mb-5 border-2'>
                <h2 className="text-center text-xl sm:text-2xl p-4 rounded-t-md text-webcolor font-bold bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-md">
                    🗂️ My Tickets
                </h2>

                {/* Create Ticket Button */}
                <div className="flex flex-wrap justify-between items-center px-4 py-3 space-x-2 sm:space-x-4">
                    <button
                        className="btn bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out px-6 py-2 rounded-lg shadow-lg flex items-center"
                        onClick={() => (document.getElementById('create_ticket') as HTMLDialogElement)?.showModal()}
                    >
                        <FaPlus className="mr-2" /> Create Ticket
                    </button>
                </div>

                {/* Filter Section */}
                <div className="flex flex-wrap justify-between items-center px-4 py-3 space-x-2 sm:space-x-4">
                    <div className="flex flex-wrap items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <FaSearch />
                            <input
                                type="text"
                                placeholder="Search by Subject"
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
                                <option value="Open">Open</option>
                                <option value="Closed">Closed</option>
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
                    {filteredTickets.length > 0 ? (
                        <table className="table-auto w-full shadow-lg bg-white rounded-lg">
                            <thead className="bg-green-800 text-white">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm sm:text-base">Ticket ID 📑</th>
                                    <th className="px-4 py-2 text-left text-sm sm:text-base">Subject 📝</th>
                                    <th className="px-4 py-2 text-left text-sm sm:text-base">Description 📰</th>
                                    <th className="px-4 py-2 text-left text-sm sm:text-base">Status ⚡</th>
                                    <th className="px-4 py-2 text-left text-sm sm:text-base">Actions 🔧</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTickets.map((ticket) => (
                                    <tr key={ticket.ticket_id} className="border-b hover:bg-slate-100 transition duration-300">
                                        <td className="px-4 py-2 text-sm sm:text-base font-medium text-gray-700">{ticket.ticket_id} 📜</td>
                                        <td className="px-4 py-2 text-sm sm:text-base font-medium text-gray-700">{ticket.subject} ✍️</td>
                                        <td className="px-4 py-2 text-sm sm:text-base text-gray-600">
                                            <span role="img" aria-label="description">📝</span> {ticket.description}
                                        </td>
                                        <td className="px-4 py-2">
                                            <span className={`inline-block px-2 py-1 rounded-full ${getStatusClassName(ticket.status)}`}>
                                                {ticket.status === 'Open' ? '🚨 Open' : '✅ Closed'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 flex items-center space-x-3">
                                            {ticket.status === 'Closed' ? (
                                                <button
                                                    className="btn bg-yellow-500 text-white flex items-center space-x-2"
                                                    onClick={() => handleReopenTicket(ticket)} // Reopen ticket
                                                >
                                                    <FaRegWindowRestore />
                                                    <span>Reopen</span>
                                                </button>
                                            ) : (
                                                <>
                                                    <button
                                                        className="btn bg-blue-500 text-white flex items-center space-x-2"
                                                        onClick={() => handleEditTicket(ticket)} // Open the edit modal
                                                    >
                                                        <FaEdit />
                                                        <span>Edit</span>
                                                    </button>
                                                    <button
                                                        className="btn bg-red-500 text-white flex items-center space-x-2"
                                                        onClick={() => handleDeleteTicket(ticket)} // Open the delete modal
                                                    >
                                                        <FaTrashAlt />
                                                        <span>Delete</span>
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center p-8 text-xl text-gray-600">
                            😔 No tickets found. Try adjusting your filters.
                        </div>
                    )}
                </div>
            </div>

            {/* Create Ticket Modal */}
            <dialog id='create_ticket' className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form method="dialog" className="relative">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <CreateTicket />
                </div>
            </dialog>

            {/* Edit Ticket Modal */}
            <dialog id='edit_ticket_modal' className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form method="dialog" className="relative">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <EditUserTicket ticket={editTicket} modalId="edit_ticket_modal" />
                </div>
            </dialog>

            {/* Delete Ticket Modal */}
            <dialog id='delete_ticket_modal' className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <form method="dialog" className="relative">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <DeleteUserTicket ticket={deleteTicket} modalId="delete_ticket_modal" />
                </div>
            </dialog>
        </div>
    );
};

// Utility function for status styling
const getStatusClassName = (status: string) => {
    switch (status) {
        case 'Closed':
            return 'bg-green-200 text-green-800';
        case 'Open':
            return 'bg-red-200 text-red-800'; 
        default:
            return 'bg-gray-300 text-gray-800';
    }
};

export default MyTickets;
