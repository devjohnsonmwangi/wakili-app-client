import { useState } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Toaster, toast } from 'sonner';
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { bookingVehicleAPI } from "../../../../features/case/caseAPI";
import { vehiclesAPI } from "../../../../features/events/events";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

type BookingFormData = {
  booking_date: Date;
  return_date: Date;
  booking_status?: string;
};

const schema = yup.object().shape({
  booking_date: yup.date().required("Booking date is required").min(new Date(), "Booking date cannot be in the past"),
  return_date: yup.date().required("Return date is required").when('booking_date', {
    is: (booking_date: Date) => !!booking_date,
    then: (schema) => schema.min(yup.ref('booking_date'), "Return date cannot be before booking date"),
  })
});

const BookingForm = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const { vehicle_id } = useParams<{ vehicle_id: string }>();
  const parsedVehicleId = vehicle_id ? parseInt(vehicle_id, 10) : NaN;

  if (isNaN(parsedVehicleId)) {
    return <div>Invalid vehicle ID</div>;
  }

  const { data: vehicleData, isLoading, error: vehicleError } = vehiclesAPI.useGetVehicleByIdQuery(parsedVehicleId);
  const [bookingVehicle] = bookingVehicleAPI.useCreateBookingVehicleMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const externalData = {
    user_id: user.user?.userID,
    vehicle_id: parsedVehicleId,
  };

  const { register, handleSubmit, formState: { errors }, control } = useForm<BookingFormData>({ resolver: yupResolver(schema) });

  const booking_date = useWatch({ control, name: "booking_date" });
  const return_date = useWatch({ control, name: "return_date" });

  const calculateTotalAmount = () => {
    if (booking_date && return_date) {
      const bookingDate = dayjs(booking_date);
      const returnDate = dayjs(return_date);
      const numberOfDays = returnDate.diff(bookingDate, 'day') + 1;
      return numberOfDays * Number(vehicleData?.rental_rate);
    }
    return '😋🤑';
  };

  const totalAmount = calculateTotalAmount();

  const onSubmit: SubmitHandler<BookingFormData> = async (formData) => {
    const dataToSubmit = {
      ...externalData,
      ...formData,
      total_amount: totalAmount.toString(),
    };

    try {
      setIsSubmitting(true);
     await bookingVehicle(dataToSubmit).unwrap();
      toast.success("Booking created successfully");

      setTimeout(() => {
        navigate('/dashboard/payments');
      }, 1000);

    } catch (err) {
      toast.error("Error creating booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (vehicleError) return <div>Error loading vehicle data</div>;

  return (
    <div className=" bg-slate-200 min-h-screen">
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

      <h1 className="text-xl font-bold mb-4 text-webcolor text-center p-5">Vehicle Details</h1>

      <div className="card rounded-lg p-4 lg:w-3/4 m-auto">
        {!isLoading && !vehicleError && vehicleData && (
          <div className="card lg:gap-10 border-2 lg:flex-row justify-center items-center bg-zinc-50 ">
            <figure className="w-[50%] lg:w-[35%] p-3 ">
              <img src={vehicleData.vehicle_specifications.image_url} alt="cardetails" className="rounded-lg" />
            </figure>

            <div className="card-body justify-center items-center text-justify space-y-4 p-6 rounded-lg">
              <h3 className="card-title text-2xl font-semibold">
                {vehicleData.vehicle_specifications.manufacturer} {vehicleData.vehicle_specifications.model}
                <span className={`ml-4 badge ${vehicleData.availability ? 'badge-success' : 'badge-error'}`}>
                  {vehicleData.availability ? 'Available' : 'Unavailable'}
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p className="text-lg"><strong>Fuel Type:</strong> {vehicleData.vehicle_specifications.fuel_type}</p>
                <p className="text-lg"><strong>Engine Capacity:</strong> {vehicleData.vehicle_specifications.engine_capacity}</p>
                <p className="text-lg"><strong>Color:</strong> {vehicleData.vehicle_specifications.color}</p>
                <p className="text-lg"><strong>Rental Rate:</strong> {vehicleData.rental_rate}</p>
                <p className="text-lg"><strong>Seating Capacity:</strong> {vehicleData.vehicle_specifications.seating_capacity}</p>
                <p className="text-lg"><strong>Transmission:</strong> {vehicleData.vehicle_specifications.transmission}</p>
                <p className="text-base col-span-1 sm:col-span-2"><strong>Features:</strong> {vehicleData.vehicle_specifications.features}</p>
                <p className="text-lg text-blue-600"><strong>You will pay:</strong> {totalAmount}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {vehicleData && vehicleData.availability ? (
        <>
          <h1 className="text-xl font-bold mb-4 text-webcolor text-center p-5">Booking Vehicle</h1>
          <div className="p-5 rounded-lg card lg:w-3/4 border-2 bg-zinc-50 m-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col lg:flex-row space-x-4 w-full">
                <div className="form-control lg:w-1/2">
                  <label htmlFor="booking_date" className="label">Booking Date</label>
                  <input type="date" id="booking_date" className="input input-bordered" {...register("booking_date")} />
                  <p className="text-red-500">{errors.booking_date?.message}</p>
                </div>
                <div className="form-control lg:w-1/2">
                  <label htmlFor="return_date" className="label">Return Date</label>
                  <input type="date" id="return_date" className="input input-bordered" {...register("return_date")} />
                  <p className="text-red-500">{errors.return_date?.message}</p>
                </div>
              </div>

              <div className="form-control mt-4">
                <button type="submit" className="btn bg-webcolor text-text-light hover:text-black border-none w-1/4 m-auto" >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner text-text-light"></span>
                      <span className='text-text-light'>Submitting...</span>
                    </>
                  ) : (
                    "Create Booking"
                  )}
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className="text-center p-5">
          <p className="text-xl">Vehicle is not available for booking</p>
          <Link to="/dashboard/vehicles" className="btn bg-webcolor text-text-light hover:text-black border-none mt-4">
            <ArrowLeft className="inline-block mr-2" /> Go Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
