import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import API from "../api/ticketApi";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";


function Home() {

  const [tickets, setTickets] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");


  // FETCH TICKETS

  const fetchTickets = async () => {

    try {

      const res = await API.get(
        `/tickets?search=${search}&status=${status}`
      );

      setTickets(res.data);

    } catch (error) {

      console.log(error);

    }

  };


  useEffect(() => {

    fetchTickets();

  }, [search, status]);


  return (

    <div className="flex bg-[#0f172a] min-h-screen text-white">

      <Sidebar />


      <div className="ml-64 w-full p-8">

        <Navbar />


        {/* SEARCH + FILTER */}

        <div className="flex gap-4 mt-8">

          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="bg-[#111827] border border-gray-700 p-4 rounded-2xl w-full outline-none"
          />


          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="bg-[#111827] border border-gray-700 p-4 rounded-2xl outline-none"
          >

            <option value="">
              All
            </option>

            <option value="Open">
              Open
            </option>

            <option value="Closed">
              Closed
            </option>

            <option value="In Progress">
              In Progress
            </option>

          </select>

        </div>


        {/* TICKETS */}

        <div className="grid grid-cols-3 gap-6 mt-10">

          {tickets.map((ticket) => (

            <Link
              to={`/ticket/${ticket._id}`}
              key={ticket._id}
              className="bg-[#111827]/80 border border-gray-800 rounded-3xl p-6 shadow-2xl hover:scale-105 transition block"
            >

              {/* TOP SECTION */}

              <div className="flex justify-between items-start gap-4">

                <div>

                  <p className="text-sm text-gray-500 mb-2">

                    {ticket.ticketId || "TKT-000"}

                  </p>

                  <h2 className="text-2xl font-bold leading-tight">

                    {ticket.subject}

                  </h2>

                </div>


                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap

                  ${
                    ticket.priority === "High"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }
                  `}
                >

                  {ticket.priority}

                </span>

              </div>


              {/* DESCRIPTION */}

              <p className="text-gray-400 mt-4 leading-relaxed">

                {ticket.description}

              </p>


              {/* FOOTER */}

              <div className="flex justify-between items-center mt-6">

                <p className="text-gray-500">

                  {ticket.customerName}

                </p>


                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold

                  ${
                    ticket.status === "Closed"
                      ? "bg-green-500"
                      : ticket.status === "In Progress"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }
                  `}
                >

                  {ticket.status}

                </span>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Home;