import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Drawer from "./aside/Drawer";
import { useSelector } from 'react-redux';
import { RootState } from "../../app/store";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user || !user.user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex lg:flex-row overflow-hidden  mt-16">
        <aside className="lg:flex flex-col flex-shrink-0 w-0 lg:w-64 border-r border-gray-200">
          <Drawer />
        </aside>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
