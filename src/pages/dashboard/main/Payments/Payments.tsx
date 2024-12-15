import { useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { RootState } from '../../../../app/store';
import { bookingVehicleAPI } from '../../../../features/case/caseAPI';
import { vehiclesAPI } from '../../../../features/events/events';
import { toast, Toaster } from 'sonner';
import { loadStripe } from '@stripe/stripe-js';
import { paymentAPI } from '../../../../features/payment/paymentAPI';
import { Link } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51O0yZQFnVjhMqK7vwrYX1wz3VThFWgoAEjafFFKVNSv0KQ76YMKbFW0dWDWOOs9DSXcp3zeNvRt14lVPO4C5FmyW00iLYryWNn');

const UserBookings = () => {
  const user = useSelector((state: RootState) => state.user);
  const id = user.user?.userID;
  const user_id = id ? id : 0;

  // get user-specific bookings data
  const { data: bookingData, isLoading: bookingLoading, error: bookingError } = bookingVehicleAPI.useGetUserBookingQuery(user_id, {
    refetchOnMountOrArgChange: true,
  });

  // Fetch vehicles data
  const { data: vehicleData, isLoading: vehicleLoading, error: vehicleError } = vehiclesAPI.useFetchCarSpecsQuery({});

  const [createPayment] = paymentAPI.useCreatePaymentMutation();
  const [isPaymentLoading, setIsPaymentLoading] = useState<number | null>(null);

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
    return 'Vehicle id not found';
  };

  // handle payment initiation
  const handleMakePayment = async (booking_id: number, amount: string) => {
    console.log('Initiating payment with booking_id:', booking_id, 'and amount:', amount);

    // Convert amount to number to ensure it's valid
    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber)) {
      toast.error('Invalid amount');
      console.error('Invalid amount:', amount);
      return;
    }

    setIsPaymentLoading(booking_id);
    try {
      const paymentResponse = await createPayment({ booking_id, total_amount: amountNumber }).unwrap();
      toast.success('Payment initiated successfully');
      console.log('Payment response:', paymentResponse);

      const stripe = await stripePromise;

      // Redirect to the Stripe checkout URL
      if (paymentResponse.url && stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: paymentResponse.sessionId,
        });
        if (error) {
          console.error('Error redirecting to checkout:', error);
          toast.error('Error redirecting to checkout');
        }
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error('Error initiating payment');
    } finally {
      setIsPaymentLoading(null);
    }
  };

  if (bookingLoading || vehicleLoading) {
    return <div>Loading...</div>;
  }

  if (bookingError || vehicleError) {
    return <div>Error loading data</div>;
  }

  if (!bookingData || bookingData.length === 0) {
    return <div className='flex flex-col'>
      <h2 className="text-center text-xl p-2 rounded-t-md text-webcolor font-bold border-b-2 border-slate-500">No Payment History</h2>
      <button>
       <Link to='/dashboard/vehicles' className='btn bg-webcolor text-text-light hover:text-black'>Book a Vehicle</Link>
      </button>
    </div>;
  }

  return (
    <>
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
      <div className='card shadow-xl mx-auto w-full rounded-md mb-10 border-2 bg-slate-200 min-h-screen'>
      <h2 className="text-center text-xl p-2 rounded-t-md text-webcolor font-bold border-b-2 border-slate-500">My Payment History</h2>

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
                <th className="px-4 py-2 text-left text-text-light">Payment Status</th>
                <th className="px-4 py-2 text-left text-text-light">Action</th>
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
                  <td className="px-4 py-2">
                    {booking.payments.length > 0 ? booking.payments[0].payment_status : 'Not paid'}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="btn bg-webcolor text-text-light hover:text-black border-none"
                      onClick={() => handleMakePayment(booking.booking_id, booking.total_amount)}
                      disabled={isPaymentLoading === booking.booking_id || (booking.payments.length > 0 && booking.payments[0].payment_status === 'Paid')}
                    >
                      {isPaymentLoading === booking.booking_id ? (
                        <div className='flex items-center'>
                          <span className="loading loading-spinner text-text-light"></span>
                          <span> Processing...</span>
                        </div>
                      ) : (
                        "Make Payment"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserBookings;
