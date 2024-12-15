import { usersAPI } from '../../../../features/users/usersAPI';
import { useEffect, useState } from 'react';

const CardsReport = () => {
  const { data: usersData, isLoading: usersLoading, error: usersError } = usersAPI. useFetchUsersQuery();
  
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalLawyers, setTotalLawyers] = useState(0);
  const [totalClerks, setTotalClerks] = useState(0);
  const [totalManagers, setTotalManagers] = useState(0);
  const [totalClients,setTotalClients]=useState(0);
  const [totalSupporters,setTotalSupporters]=useState(0);


  useEffect(() => {
    if (usersData) {
      const usersCount = usersData.length;
      const customersCount = usersData.filter(user => user.role === 'user').length;
      const adminsCount = usersData.filter(user => user.role === 'admin').length;
      const lawyerCount = usersData.filter(user => user.role === 'lawyer').length;
      const clerksCount = usersData.filter(user => user.role === 'clerk').length;
      const managersCount = usersData.filter(user => user.role === 'manager').length;
      const clientsCount = usersData.filter(user => user.role === 'client').length;
      const supportersCount = usersData.filter(user => user.role === 'support').length;

      // Animation for counting numbers
      const duration = 1000;
      const steps = 30;
      const usersStep = usersCount / steps;
      const customersStep = customersCount / steps;
      const adminsStep = adminsCount / steps;
      const lawyerStep = lawyerCount / steps;
      const clerksStep = clerksCount / steps;
      const managersStep = managersCount / steps;
      const clientStep = clientsCount / steps;
      const supportersStep = supportersCount / steps;

      let currentUsers = 0;
      let currentCustomers = 0;
      let currentAdmins = 0;
      let currentLawyers = 0;
      let currentClerks = 0;
      let currentManagers = 0;
      let currentClients = 0;
      let currentSupporters = 0;


      const interval = setInterval(() => {
        currentUsers = Math.min(currentUsers + usersStep, usersCount);
        currentCustomers = Math.min(currentCustomers + customersStep, customersCount);
        currentAdmins = Math.min(currentAdmins + adminsStep, adminsCount);
        currentLawyers = Math.min(currentLawyers + lawyerStep, lawyerCount);
        currentClerks = Math.min(currentClerks + clerksStep, clerksCount);
        currentManagers = Math.min(currentManagers + managersStep, managersCount);
        currentClients = Math.min(currentClients + clientStep, clientsCount);
        currentSupporters = Math.min(currentSupporters + supportersStep, supportersCount);

        setTotalUsers(Math.floor(currentUsers));
        setTotalCustomers(Math.floor(currentCustomers));
        setTotalAdmins(Math.floor(currentAdmins));
        setTotalLawyers(Math.floor(currentLawyers));
        setTotalClerks(Math.floor(currentClerks));
        setTotalManagers(Math.floor(currentManagers));
        setTotalClients(Math.floor(currentClients));
        setTotalSupporters(Math.floor(currentSupporters));

        if (currentUsers >= usersCount
           && currentCustomers >= customersCount
           && currentAdmins >= adminsCount 
           && currentLawyers >= lawyerCount
            && currentClerks >= clerksCount 
            && currentManagers >= managersCount
             && currentClients >= clientsCount
              && currentSupporters >= supportersCount) {
          clearInterval(interval);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }
  }, [usersData]);

  if (usersLoading) {
    return <div>Loading...</div>;
  }

  if (usersError) {
    return <div>Error loading users</div>;
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold">Total Users</h3>
        <div className="text-4xl font-bold animate-pulse">{totalUsers}</div>
        <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mt-2">{totalUsers}</div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold">Total Customers</h3>
        <div className="text-4xl font-bold animate-pulse">{totalCustomers}</div>
        <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center mt-2">{totalCustomers}</div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold">Total Admins</h3>
        <div className="text-4xl font-bold animate-pulse">{totalAdmins}</div>
        <div className="w-16 h-16 rounded-full bg-purple-500 text-white flex items-center justify-center mt-2">{totalAdmins}</div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold">Total Lawyers</h3>
        <div className="text-4xl font-bold animate-pulse">{totalLawyers}</div>
        <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center mt-2">{totalLawyers}</div>

      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold">Total Clerks</h3>
        <div className="text-4xl font-bold animate-pulse">{totalClerks}</div>
        <div className="w-16 h-16 rounded-full bg-yellow-500 text-white flex items-center justify-center mt-2">{totalClerks}</div>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold">Total Managers</h3>
        <div className="text-4xl font-bold animate-pulse">{totalManagers}</div>
        <div className="w-16 h-16 rounded-full bg-indigo-500 text-white flex items-center justify-center mt-2">{totalManagers}</div>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold">Total Clients</h3>
        <div className="text-4xl font-bold animate-pulse">{totalClients}</div>
        <div className="w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center mt-2">{totalClients}</div>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold">Total Supporters</h3>
        <div className="text-4xl font-bold animate-pulse">{totalSupporters}</div>
        <div className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center mt-2">{totalSupporters}</div>
    </div>
    </div>
  );
}

export default CardsReport;
