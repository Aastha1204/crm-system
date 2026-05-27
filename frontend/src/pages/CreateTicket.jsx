import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import API from "../api/ticketApi";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";


function CreateTicket() {

  const navigate = useNavigate();


  const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({

    customerName: "",

    customerEmail: "",

    subject: "",

    description: "",

  });


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();


    // VALIDATION

    if (

      !formData.customerName ||

      !formData.customerEmail ||

      !formData.subject ||

      !formData.description

    ) {

      toast.error("Please fill all fields 😭");

      return;

    }


    try {

      setLoading(true);


      await API.post(

        "/tickets",

        formData
      );


      toast.success(

        "Ticket Created Successfully 🎉🔥"
      );


      // CLEAR FORM

      setFormData({

        customerName: "",

        customerEmail: "",

        subject: "",

        description: "",

      });


      setTimeout(() => {

        navigate("/");

      }, 1500);


    } catch (error) {

      console.log(error);

      toast.error(

        error?.response?.data?.message ||

        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="flex bg-[#0f172a] min-h-screen text-white">

      <Sidebar />


      <div className="ml-64 p-8 w-full">

        <Navbar />


        <motion.div

          initial={{ opacity: 0, y: 40 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.5 }}

          className="max-w-3xl mx-auto"

        >

          <form

            onSubmit={handleSubmit}

            className="bg-[#111827]/80 border border-gray-800 rounded-3xl p-10 mt-10 shadow-2xl"

          >

            <h1 className="text-5xl font-bold mb-10 text-center">

              Create New Ticket

            </h1>


            <div className="flex flex-col gap-6">

              <input

                type="text"

                name="customerName"

                placeholder="Customer Name"

                value={formData.customerName}

                onChange={handleChange}

                className="bg-[#0f172a] border border-gray-700 p-5 rounded-2xl outline-none focus:border-purple-500 transition"

              />


              <input

                type="email"

                name="customerEmail"

                placeholder="Customer Email"

                value={formData.customerEmail}

                onChange={handleChange}

                className="bg-[#0f172a] border border-gray-700 p-5 rounded-2xl outline-none focus:border-purple-500 transition"

              />


              <input

                type="text"

                name="subject"

                placeholder="Subject"

                value={formData.subject}

                onChange={handleChange}

                className="bg-[#0f172a] border border-gray-700 p-5 rounded-2xl outline-none focus:border-purple-500 transition"

              />


              <textarea

                name="description"

                rows="6"

                placeholder="Describe issue..."

                value={formData.description}

                onChange={handleChange}

                className="bg-[#0f172a] border border-gray-700 p-5 rounded-2xl outline-none focus:border-purple-500 transition"

              />


              <button

                type="submit"

                disabled={loading}

                className="bg-linear-to-r from-purple-500 to-pink-500 p-5 rounded-2xl text-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg"

              >

                {

                  loading

                  ?

                  "Creating Ticket..."

                  :

                  "Create Ticket"

                }

              </button>

            </div>

          </form>

        </motion.div>

      </div>

    </div>

  );

}


export default CreateTicket;