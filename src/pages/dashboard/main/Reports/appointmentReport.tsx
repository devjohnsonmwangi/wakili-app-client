import { useEffect, useState } from 'react';
import { appointmentAPI, AppointmentDataTypes } from '../../../../features/appointment/appointmentapi';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF4D4D', '#8A2BE2', '#5F9EA0'];

interface ChartData {
    name: string;
    value: number;
}

const AppointmentStatusReport = () => {
    const { data: appointmentsData = [], isLoading: appointmentsLoading } = appointmentAPI.useFetchAppointmentsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const [statusData, setStatusData] = useState<ChartData[]>([]);
    const [chartWidth, setChartWidth] = useState<number>(window.innerWidth < 768 ? 300 : 500);
    const [chartHeight, setChartHeight] = useState<number>(window.innerWidth < 768 ? 250 : 300);

    // Handle responsive chart resizing
    useEffect(() => {
        const handleResize = () => {
            setChartWidth(window.innerWidth < 768 ? 300 : 500);
            setChartHeight(window.innerWidth < 768 ? 250 : 300);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial dimensions

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Process appointment statuses and calculate counts for the pie chart
    useEffect(() => {
        if (!appointmentsLoading && appointmentsData.length > 0) {
            const statusCounts: Record<string, number> = {};

            appointmentsData.forEach((appointment: AppointmentDataTypes) => {
                statusCounts[appointment.status] = (statusCounts[appointment.status] || 0) + 1;
            });

            const formattedStatusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));
            setStatusData(formattedStatusData);
        }
    }, [appointmentsLoading, appointmentsData]);

    if (appointmentsLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='bg-slate-200 p-4'>
            <div className='card mx-auto bg-white w-full rounded-md mb-5 border-2 p-4'>
                <h2 className="text-center text-xl mb-4 text-webcolor font-bold">Appointment Status Report</h2>
                <div className='flex justify-center'>
                    <div className='w-full md:w-1/2'>
                        <h3 className="text-center text-lg mb-2">Appointment Status Distribution</h3>
                        <PieChart width={chartWidth} height={chartHeight}>
                            <Pie
                                data={statusData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius="80%"
                                fill="#8884d8"
                                label
                            >
                                {statusData.map((_entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <RechartsTooltip />
                        </PieChart>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppointmentStatusReport;
