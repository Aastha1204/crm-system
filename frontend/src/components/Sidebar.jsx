import {
  LayoutDashboard,
  PlusCircle,
  Ticket,
} from "lucide-react";

import { Link } from "react-router-dom";


function Sidebar() {

  return (

    <div className="w-64 h-screen bg-black border-r border-gray-800 text-white p-6 fixed">

      <h1 className="text-5xl font-bold mb-14 leading-tight">

        CRM

        <span className="text-purple-500">
          {" "}System
        </span>

      </h1>


      <div className="flex flex-col gap-8 text-lg">

        <Link
          to="/dashboard"
          className="flex items-center gap-3 hover:text-purple-400 transition"
        >

          <LayoutDashboard size={24} />

          Dashboard

        </Link>


        <Link
          to="/create-ticket"
          className="flex items-center gap-3 hover:text-purple-400 transition"
        >

          <PlusCircle size={24} />

          Create Ticket

        </Link>


        <Link
          to="/"
          className="flex items-center gap-3 hover:text-purple-400 transition"
        >

          <Ticket size={24} />

          All Tickets

        </Link>

      </div>

    </div>

  );

}

export default Sidebar;