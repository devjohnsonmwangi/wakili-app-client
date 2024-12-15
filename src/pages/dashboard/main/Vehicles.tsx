import { useState } from 'react';
import { Link } from 'react-router-dom';
import { vehiclesAPI } from "../../../features/events/events";
import { VehicleDataTypes } from '../../../features/events/events';
import Loader from '../../Loader';

function Vehicles() {
  const page = 1;
  const { data: vehicleData = [], isLoading, isError } = vehiclesAPI.useFetchCarSpecsQuery(page, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });

  const [filters, setFilters] = useState({
    fuelType: '',
    name: '',
    capacity: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleResetFilters = () => {
    setFilters({
      fuelType: '',
      name: '',
      capacity: '',
    });
  };

  const filteredVehicles = vehicleData.filter((vehicle: VehicleDataTypes) => {
    const { fuelType, name, capacity } = filters;
    const vehicleName = `${vehicle.vehicle_specifications.manufacturer} ${vehicle.vehicle_specifications.model}`.toLowerCase();
    const matchesFuelType = fuelType ? vehicle.vehicle_specifications.fuel_type.toLowerCase().includes(fuelType.toLowerCase()) : true;
    const matchesName = name ? vehicleName.includes(name.toLowerCase()) : true;
    const matchesCapacity = capacity ? vehicle.vehicle_specifications.engine_capacity.toLowerCase().includes(capacity.toLowerCase()) : true;
    return matchesFuelType && matchesName && matchesCapacity;
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    console.error('Error loading vehicles data.');
    return <div>Error loading vehicles data.</div>;
  }

  if (vehicleData.length === 0) {
    return <div>No vehicles available</div>;
  }

  return (
    <div className="overflow-x-auto text-base-content rounded-lg p-4  bg-slate-200 min-h-screen">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          name="fuelType"
          value={filters.fuelType}
          onChange={handleInputChange}
          placeholder="Filter by fuel type"
          className="input input-bordered w-full md:w-1/3"
        />
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleInputChange}
          placeholder="Filter by name"
          className="input input-bordered w-full md:w-1/3"
        />
        <input
          type="text"
          name="capacity"
          value={filters.capacity}
          onChange={handleInputChange}
          placeholder="Filter by engine capacity"
          className="input input-bordered w-full md:w-1/3"
        />
        <button onClick={handleResetFilters} className="btn bg-webcolor text-text-light hover:text-black border-none">
          Reset Filters
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 gap-4">
        {filteredVehicles.map((vehicle: VehicleDataTypes) => (
          <div key={vehicle.vehicle_id} className="card h-fit bg-zinc-50">
            <figure className='h-40'>
              <img src={vehicle.vehicle_specifications.image_url} alt="image for the car" className='w-full h-full object-cover' />
            </figure>
            <div className="card-body p-4">
              <div className="flex justify-between items-center">
                <h3 className="card-title text-xl font-semibold">{vehicle.vehicle_specifications.manufacturer} {vehicle.vehicle_specifications.model}</h3>
                <div className={`badge ${vehicle.availability ? 'badge-success' : 'badge-error'} text-sm py-1 px-2`}>
                  {vehicle.availability ? 'Available' : 'Unavailable'}
                </div>
              </div>
              <div className="text-base my-2">
                <p><strong>Fuel Type</strong>: {vehicle.vehicle_specifications.fuel_type}</p>
                <p><strong>Engine Capacity</strong>: {vehicle.vehicle_specifications.engine_capacity}</p>
                <p><strong>Color</strong>: {vehicle.vehicle_specifications.color}</p>
                <p><strong>Rental Rate</strong>: {vehicle.rental_rate}</p>
              </div>
              <div className="card-actions justify-center mt-4">
                <Link to={`booking/${vehicle.vehicle_id}`}>
                  <button className="btn bg-webcolor text-text-light hover:text-black border-none">View Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vehicles;
