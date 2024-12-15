import { format } from 'date-fns';
import { appointmentAPI } from "../../../../features/appointments/appointmentAPI"; // Adjust the path as needed

function AllAppointments() {
  const page = void 0;
  const fetchDuration = 100000;

  // Fetch appointments data
  const { data: appointments, isLoading: appointmentLoading, error: appointmentError } = appointmentAPI.useFetchAppointmentsQuery(undefined, {
    pollingInterval: fetchDuration, refetchOnMountOrArgChange: true
  });

  console.log(appointments);

  // Fetch users data (assuming you have a similar user API for client data)
  const { data: usersData, isLoading: usersLoading, error: usersError } = usersAPI.useGetUsersQuery(page, {
    pollingInterval: fetchDuration, refetchOnMountOrArgChange: true
  });

  // Fetch lawyers data (assuming you have a lawyer API)
  const { data: lawyersData, isLoading: lawyersLoading, error: lawyersError } = lawyersAPI.useGetLawyersQuery(page, {
    pollingInterval: fetchDuration, refetchOnMountOrArgChange: true
  });

  // Function to format ISO date string
  const formatDate = (isoDate: string | number | Date) => {
    return format(new Date(isoDate), 'MM/dd/yyyy HH:mm:ss');
  };

  // Function to get lawyer details by lawyer_id
  const getLawyerDetails = (lawyerId: number) => {
    if (lawyersData) {
      const lawyer = lawyersData.find((l: { lawyer_id: number; }) => l.lawyer_id === lawyerId);
      if (lawyer) {
        return `${lawyer.first_name} ${lawyer.last_name}`;
      }
    }
    return 'Unknown Lawyer';
  };

  // Function to get user full name by client_id
  const getUserFullName = (clientId: number) => {
    if (usersData) {
      const user = usersData.find(u => u.id === clientId);
      if (user) {
        return user.full_name;
      }
    }
    return 'Unknown Client';
  };

  return (
    <div className="overflow-x-auto bg-slate-200 min-h-screen">
      <h2 className="text-center text-xl p-2 rounded-t-md text-webcolor font-bold border-b-2 border-slate-500">All Appointments</h2>

      {(appointmentLoading || usersLoading || lawyersLoading) && <div>Loading...</div>}
      {(appointmentError || usersError || lawyersError) && <div>Error loading data</div>}
      {appointments && appointments.length === 0 && <div>No appointments</div>}
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Client ID</th>
            <th>Client Full Name</th>
            <th>Lawyer Details</th>
            <th>Appointment Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments && appointments.map((appointment:any) => (
            <tr key={appointment.appointment_id}>
              <td>{appointment.appointment_id}</td>
              <td>{appointment.client_id}</td>
              <td>{getUserFullName(appointment.client_id)}</td>
              <td>{getLawyerDetails(appointment.lawyer_id)}</td>
              <td>{formatDate(appointment.appointment_date)}</td>
              <td>{appointment.status}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Appointment ID</th>
            <th>Client ID</th>
            <th>Client Full Name</th>
            <th>Lawyer Details</th>
            <th>Appointment Date</th>
            <th>Status</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default AllAppointments;
