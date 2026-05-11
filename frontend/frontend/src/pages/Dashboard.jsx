import { useContext, useEffect, useState } from "react";

import API from "../api/axios";

import { AuthContext } from "../context/AuthContext";

function Dashboard() {

  const { user, logout } = useContext(AuthContext);

  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    todoTasks: 0,
  });


  useEffect(() => {

    const fetchStats = async () => {

      try {

        const { data } = await API.get("/dashboard");

        setStats(data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();

  }, []);


  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome, {user?.name}
          </p>
        </div>

        <button
  onClick={() => {
    logout();
    window.location.href = "/";
  }}
  className="bg-red-500 text-white px-4 py-2 rounded"
>
  Logout
</button>

      </div>


      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold">
            Total Projects
          </h2>

          <p className="text-4xl mt-4 font-bold">
            {stats.totalProjects}
          </p>
        </div>


        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold">
            Total Tasks
          </h2>

          <p className="text-4xl mt-4 font-bold">
            {stats.totalTasks}
          </p>
        </div>


        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold">
            Completed Tasks
          </h2>

          <p className="text-4xl mt-4 font-bold">
            {stats.completedTasks}
          </p>
        </div>


        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold">
            Todo Tasks
          </h2>

          <p className="text-4xl mt-4 font-bold">
            {stats.todoTasks}
          </p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;