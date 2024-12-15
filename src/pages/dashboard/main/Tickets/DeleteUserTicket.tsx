import { TicketAPI } from "../../../../features/Tickets/AllTickets";
import { Toaster, toast } from 'sonner';
import { TypeTickets } from "../../../../features/Tickets/AllTickets";

interface DeleteUserTicketProps {
    ticket: TypeTickets | null;
    modalId: string;
}

const DeleteUserTicket = ({ ticket, modalId }: DeleteUserTicketProps) => {
    const [deleteTicket] = TicketAPI.useDeleteTicketMutation();

    const handleDelete = async () => {
        if (ticket) {
            try {
                const ticketIdToDelete = ticket.ticket_id;
                const response = await deleteTicket(ticketIdToDelete).unwrap();
    
                if (response.success) {
                    toast.success('Ticket deleted successfully!');
                    (document.getElementById(modalId) as HTMLDialogElement)?.close();
                } else {
                    toast.error('Failed to delete ticket.');
                }
            } catch (err: any) {
                console.error('Error during ticket deletion:', err);
    
                if (err?.status === 403 || err?.originalStatus === 403) {
                    toast.error('You are not authorized to delete this ticket.');
                } else if (err?.error?.includes('Forbidden')) {
                    toast.error('Access denied. Please log in again.');
                } else {
                    toast.error('An error occurred while deleting the ticket.');
                }
            }
        }
    };

    const handleCloseModal = () => {
        toast.warning('Ticket deletion cancelled.');
        (document.getElementById(modalId) as HTMLDialogElement)?.close();
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
                Are you sure you want to delete the following ticket?
            </h3>
            {ticket && (
                <div>
                    <table className='table-auto m-auto w-full lg:w-[80%]'>
                        <tbody>
                            <tr>
                                <td className='border px-4 py-1'>ID</td>
                                <td className='border px-4 py-1'>{ticket.ticket_id}</td>
                            </tr>
                            <tr>
                                <td className='border px-4 py-1'>Subject</td>
                                <td className='border px-4 py-1'>{ticket.subject}</td>
                            </tr>
                            <tr>
                                <td className='border px-4 py-1'>Description</td>
                                <td className='border px-4 py-1'>{ticket.description}</td>
                            </tr>
                            <tr>
                                <td className='border px-4 py-1'>Status</td>
                                <td className='border px-4 py-1'>{ticket.status}</td>
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

export default DeleteUserTicket;
