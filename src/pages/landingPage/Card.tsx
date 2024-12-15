// import { vehiclesAPI } from "../../features/events/events";
// import { VehicleDataTypes } from "../../features/events/events";
// import Loader from "../Loader";
// import { Link } from "react-router-dom";

// const Card = () => {
//     const page = 1;
//     const { data: vehicleData = [], isLoading, isError } = vehiclesAPI.useFetchCarSpecsQuery(page, {
//         refetchOnMountOrArgChange: true,
//         pollingInterval: 10000,
//     });

//     if (isLoading) {
//         return <Loader />;
//     }

//     if (isError) {
//         console.error('Error loading vehicles data.');
//         return <div>Error loading vehicles data.</div>;
//     }

//     if (vehicleData.length === 0) {
//         return <div>No vehicles available</div>;
//     }

//     console.log('Vehicle Data:', vehicleData);

//     // Function to shuffle array
//     const shuffleArray = (array: VehicleDataTypes[]) => {
//         const copy = [...array]; // Create a copy of the array
//         for (let i = copy.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [copy[i], copy[j]] = [copy[j], copy[i]];
//         }
//         return copy;
//     };

//     // Shuffle the vehicle data and take the first 5 elements
//     const randomVehicles = shuffleArray(vehicleData).slice(0, 5);

//     return (
//         <div className="flex flex-wrap gap-3 justify-center mt-10">
//             {randomVehicles.map((vehicle: VehicleDataTypes) => (
//                 <div key={vehicle.vehicle_id} className="card bg-base-100 w-80 md:w-60 shadow-xl my-4 lg:my-0 h-fit">
//                     <figure className='h-40'>
//                         <img src={vehicle.vehicle_specifications.image_url} alt="image for the car" className='w-full h-full' />
//                     </figure>
//                     <div className="card-body flex flex-row justify-between gap-4">
//                         <div>
//                             <h2 className="">
//                                 {vehicle.vehicle_specifications.manufacturer} {vehicle.vehicle_specifications.model}
//                             </h2>
//                             <p>Price: Ksh.{vehicle.rental_rate}</p>
//                         </div>
//                     </div>
//                     <div className="card-actions justify-center mb-4">
//                         <Link to={`dashboard/vehicles/booking/${vehicle.vehicle_id}`}>
//                             <button className="btn bg-webcolor text-text-light hover:text-black border-none">View Details</button>
//                         </Link>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Card;
