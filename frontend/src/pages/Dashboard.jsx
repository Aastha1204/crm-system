import {

  useEffect,

  useState,

} from "react";

import {

  BarChart,

  Bar,

  XAxis,

  YAxis,

  Tooltip,

  ResponsiveContainer,

} from "recharts";

import API from "../api/ticketApi";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";


function Dashboard() {

  const [stats, setStats] = useState({

    totalTickets: 0,

    openTickets: 0,

    closedTickets: 0,

    highPriority: 0,

  });


  const fetchStats = async () => {

    try {

      const res = await API.get(

        "/tickets/stats/dashboard"
      );

      setStats(res.data);

    } catch (error) {

      console.log(error);

    }

  };


  useEffect(() => {

    fetchStats();

  }, []);


  const chartData = [

    {

      name: "Total",

      value: stats.totalTickets,

    },

    {

      name: "Open",

      value: stats.openTickets,

    },

    {

      name: "Closed",

      value: stats.closedTickets,

    },

    {

      name: "High Priority",

      value: stats.highPriority,

    },

  ];


  return (

    <div className="flex bg-[#0f172a] min-h-screen text-white">

      <Sidebar />


      <div className="ml-64 p-8 w-full">

        <Navbar />


        {/* STATS */}


        <div className="grid grid-cols-4 gap-6 mt-10">


          <div className="bg-[#111827] p-8 rounded-3xl border border-gray-800">

            <h2 className="text-gray-400">

              Total Tickets

            </h2>

            <h1 className="text-5xl font-bold mt-4">

              {stats.totalTickets}

            </h1>

          </div>


          <div className="bg-[#111827] p-8 rounded-3xl border border-gray-800">

            <h2 className="text-gray-400">

              Open Tickets

            </h2>

            <h1 className="text-5xl font-bold mt-4">

              {stats.openTickets}

            </h1>

          </div>


          <div className="bg-[#111827] p-8 rounded-3xl border border-gray-800">

            <h2 className="text-gray-400">

              Closed Tickets

            </h2>

            <h1 className="text-5xl font-bold mt-4">

              {stats.closedTickets}

            </h1>

          </div>


          <div className="bg-[#111827] p-8 rounded-3xl border border-gray-800">

            <h2 className="text-gray-400">

              High Priority

            </h2>

            <h1 className="text-5xl font-bold mt-4">

              {stats.highPriority}

            </h1>

          </div>

        </div>


        {/* CHART */}


        <div className="bg-[#111827] p-8 rounded-3xl border border-gray-800 mt-10 h-[400px]">


          <h1 className="text-3xl font-bold mb-10">

            CRM Analytics

          </h1>


          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart data={chartData}>

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="value" fill="#a855f7" />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );

}


export default Dashboard;