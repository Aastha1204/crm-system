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


              <div className="flex justify-between items-center">

                <p className="text-sm text-gray-500 mb-2">

  {ticket.ticketId}

</p>


                <h2 className="text-2xl font-bold">

                  {ticket.subject}

                </h2>


                <span

                  className={`px-4 py-2 rounded-full text-sm font-semibold

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


              <p className="text-gray-400 mt-4">

                {ticket.description}

              </p>


              <div className="flex justify-between items-center mt-6">


                <p className="text-gray-500">

                  {ticket.customerName}

                </p>


                <span className="bg-blue-500 px-4 py-2 rounded-full text-sm">

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