import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { RootState } from '../../../../app/store';
import { bookingVehicleAPI } from '../../../../features/case/caseAPI';
import { vehiclesAPI } from '../../../../features/events/events';
import { Link } from 'react-router-dom';

const MyBookings = () => {
    const user = useSelector((state: RootState) => state.user);
    const id = user.user?.userID;
    const user_id = id ? id : 0;

    // Fetch user-specific bookings data
    const { data: bookingData, isLoading: bookingLoading, error: bookingError } = bookingVehicleAPI.useGetUserBookingQuery(user_id, {
        refetchOnMountOrArgChange: true,
    });

    // Fetch vehicles data
    const { data: vehicleData, isLoading: vehicleLoading, error: vehicleError } = vehiclesAPI.useFetchCarSpecsQuery({})

    // Function to format ISO date string
    const formatDate = (isoDate: string | number | Date) => {
        return format(new Date(isoDate), 'MM/dd/yyyy');
    };

    // Function to get vehicle details by vehicle_id
    const getVehicleDetails = (vehicleId: number) => {
        if (vehicleData) {
            const vehicle = vehicleData.find((v: { vehicle_id: number; }) => v.vehicle_id === vehicleId);
            if (vehicle) {
                return `${vehicle.vehicle_specifications?.manufacturer} ${vehicle.vehicle_specifications?.model}`;
            } else {
                console.log(`Vehicle with ID ${vehicleId} not found`);
            }
        }
        return 'Unknown Vehicle';
    };

    if (bookingLoading || vehicleLoading) {
        return <div>Loading...</div>;
    }

    if (bookingError || vehicleError) {
        return <div>Error loading data</div>;
    }

    if (!bookingData || bookingData.length === 0) {
        return <div className='flex flex-col'>
        <h2 className="text-center text-xl p-2 rounded-t-md text-webcolor font-bold border-b-2 border-slate-500">No Booking History</h2>
        <button>
         <Link to='/dashboard/vehicles' className='btn bg-webcolor text-text-light hover:text-black'>Book a Vehicle</Link>
        </button>
      </div>;
    }

    return (
        <div className='bg-slate-200 min-h-screen'>

            <div className='mx-auto bg-slate-200 w-full rounded-md mb-5 border-2'>
                <h2 className="text-center text-xl p-2 rounded-t-md text-webcolor font-bold">My Bookings History</h2>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead>
                            <tr className="bg-slate-700">
                                <th className="px-4 py-2 text-left text-text-light">Booking ID</th>
                                <th className="px-4 py-2 text-left text-text-light">Vehicle Details</th>
                                <th className="px-4 py-2 text-left text-text-light">Booking Date</th>
                                <th className="px-4 py-2 text-left text-text-light">Return Date</th>
                                <th className="px-4 py-2 text-left text-text-light">Total Amount</th>
                                <th className="px-4 py-2 text-left text-text-light">Booking Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingData.map((booking) => (
                                <tr key={booking.booking_id} className="border-b border-slate-600">
                                    <td className="px-4 py-2">{booking.booking_id}</td>
                                    <td className="px-4 py-2">{getVehicleDetails(booking.vehicle_id)}</td>
                                    <td className="px-4 py-2">{formatDate(booking.booking_date)}</td>
                                    <td className="px-4 py-2">{formatDate(booking.return_date)}</td>
                                    <td className="px-4 py-2">{booking.total_amount}</td>
                                    <td className="px-4 py-2">{booking.booking_status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyBookings;
