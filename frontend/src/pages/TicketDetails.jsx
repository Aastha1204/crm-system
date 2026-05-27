import {

  useEffect,

  useState,

} from "react";

import {

  useParams,

} from "react-router-dom";

import toast from "react-hot-toast";

import API from "../api/ticketApi";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";


function TicketDetails() {

  const { id } = useParams();


  const [ticket, setTicket] = useState(null);


  // FETCH SINGLE TICKET

  const fetchTicket = async () => {

    try {

      const res = await API.get(

        `/tickets/${id}`

      );

      setTicket(res.data);

    } catch (error) {

      console.log(error);

    }

  };


  // UPDATE STATUS

  const updateStatus = async (status) => {

    try {

      await API.put(

        `/tickets/${id}`,

        { status }

      );


      toast.success(

        "Status Updated 😭🔥"

      );


      fetchTicket();

    } catch (error) {

      toast.error(

        "Update failed"

      );

    }

  };


  useEffect(() => {

    fetchTicket();

  }, []);


  if (!ticket) {

    return (

      <div className="text-white p-10">

        Loading...

      </div>

    );

  }


  return (

    <div className="flex bg-[#0f172a] min-h-screen text-white">

      <Sidebar />


      <div className="ml-64 p-8 w-full">

        <Navbar />


        <div className="bg-[#111827]/80 border border-gray-800 rounded-3xl p-10 mt-10 shadow-2xl">


          {/* TOP */}


          <div className="flex justify-between items-center">


            <h1 className="text-5xl font-bold">

              {ticket.subject}

            </h1>


            <span

              className={`px-6 py-3 rounded-full text-lg font-bold

              ${
                ticket.priority === "High"

                ?

                "bg-red-500"

                :

                "bg-yellow-500"

              }

              `}

            >

              {ticket.priority}

            </span>

          </div>


          {/* DESCRIPTION */}


          <p className="text-gray-400 mt-8 text-xl leading-relaxed">

            {ticket.description}

          </p>


          {/* INFO CARDS */}


          <div className="grid grid-cols-2 gap-6 mt-10">


            <div className="bg-[#0f172a] p-6 rounded-2xl border border-gray-800">

              <h2 className="text-gray-400">

                Customer Name

              </h2>


              <p className="text-2xl mt-2 font-bold">

                {ticket.customerName}

              </p>

            </div>


            <div className="bg-[#0f172a] p-6 rounded-2xl border border-gray-800">

              <h2 className="text-gray-400">

                Customer Email

              </h2>


              <p className="text-2xl mt-2 font-bold">

                {ticket.customerEmail}

              </p>

            </div>

          </div>


          {/* STATUS */}


          <div className="mt-12">


            <h2 className="text-3xl font-bold">

              Ticket Status

            </h2>


            <div className="flex gap-4 mt-6">


              <button

                onClick={() =>
                  updateStatus("Open")
                }

                className="bg-blue-500 px-6 py-3 rounded-2xl hover:scale-105 transition"

              >

                Open

              </button>


              <button

                onClick={() =>
                  updateStatus("In Progress")
                }

                className="bg-yellow-500 px-6 py-3 rounded-2xl hover:scale-105 transition"

              >

                In Progress

              </button>


              <button

                onClick={() =>
                  updateStatus("Closed")
                }

                className="bg-green-500 px-6 py-3 rounded-2xl hover:scale-105 transition"

              >

                Closed

              </button>

            </div>


            <div className="mt-8">


              <span className="bg-purple-500 px-6 py-3 rounded-full text-lg font-semibold">

                Current Status:
                {" "}

                {ticket.status}

              </span>

            </div>

          </div>


          {/* TIMESTAMP */}


          <div className="mt-12 text-gray-500">

            Created At:
            {" "}

            {

              new Date(

                ticket.createdAt

              ).toLocaleString()

            }

          </div>

        </div>

      </div>

    </div>

  );

}


export default TicketDetails;