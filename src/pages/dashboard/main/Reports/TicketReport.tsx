import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { TicketAPI } from "../../../../features/Tickets/AllTickets";
import { usersAPI } from "../../../../features/users/usersAPI";
import { useState, useEffect } from 'react';

const TicketReport = () => {
  const page = undefined;
  const fetchDuration = 10000;
  const { data: tickets, isLoading: ticketsLoading, error: ticketsError } = TicketAPI.useGetTicketsQuery(page, {
    pollingInterval: fetchDuration, refetchOnMountOrArgChange: true
  });

  const { data: usersData, isLoading: usersLoading, error: usersError } = usersAPI. useFetchUsersQuery(page, {
    pollingInterval: fetchDuration, refetchOnMountOrArgChange: true
  });

  const [userTicketData, setUserTicketData] = useState<{ name: string, open: number, closed: number }[]>([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalOpen, setTotalOpen] = useState(0);
  const [totalClosed, setTotalClosed] = useState(0);

  useEffect(() => {
    if (tickets && usersData) {
      const userTicketMap: Record<number, { open: number; closed: number }> = {};

      tickets.forEach(ticket => {
        const { user_id, status } = ticket;
        if (!userTicketMap[user_id]) {
          userTicketMap[user_id] = { open: 0, closed: 0 };
        }
        if (status === 'Open') {
          userTicketMap[user_id].open += 1;
        } else if (status === 'Closed') {
          userTicketMap[user_id].closed += 1;
        }
      });

      const data = Object.entries(userTicketMap).map(([user_id, counts]) => {
        const user = usersData.find(u => u.user_id === Number(user_id));
        return {
          name: user ? user.full_name : 'Unknown User',
          open: counts.open,
          closed: counts.closed
        };
      });

      setUserTicketData(data);

      setTotalTickets(tickets.length);
      setTotalOpen(tickets.filter(ticket => ticket.status === 'Open').length);
      setTotalClosed(tickets.filter(ticket => ticket.status === 'Closed').length);
    }
  }, [tickets, usersData]);

  const pieData = userTicketData.flatMap(user => [
    { name: `${user.name} - Open`, value: user.open },
    { name: `${user.name} - Closed`, value: user.closed }
  ]);

  return (
    <div className='bg-slate-200 p-4'>
      <div className='card mx-auto bg-white w-full rounded-md mb-5 border-2 p-4'>
        <h2 className="text-center text-xl p-2 rounded-t-md text-webcolor font-bold">Ticket Report</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <div className="bg-slate-200 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold">Total Tickets</h3>
            <div className="text-4xl font-bold">{totalTickets}</div>
            <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center mt-2">{totalTickets}</div>
          </div>

          <div className="bg-slate-200 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold">Open Tickets</h3>
            <div className="text-4xl font-bold">{totalOpen}</div>
            <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center mt-2">{totalOpen}</div>
          </div>

          <div className="bg-slate-200 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold">Closed Tickets</h3>
            <div className="text-4xl font-bold">{totalClosed}</div>
            <div className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center mt-2">{totalClosed}</div>
          </div>
        </div>

        {ticketsLoading || usersLoading ? (
          <div>Loading...</div>
        ) : ticketsError || usersError ? (
          <div>Error loading data</div>
        ) : (
          <div className="flex justify-center">
            <PieChart width={window.innerWidth < 768 ? 300 : 800} height={window.innerWidth < 768 ? 300 : 400}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={window.innerWidth < 768 ? 100 : 150}
                fill="#8884d8"
                label
              >
                {pieData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#82ca9d' : '#8884d8'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketReport;
