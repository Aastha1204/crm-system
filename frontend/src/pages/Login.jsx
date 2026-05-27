import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../api/ticketApi";


function Login() {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({

    email: "",

    password: "",

  });


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(

        "/auth/login",

        formData
      );


      localStorage.setItem(

        "token",

        res.data.token
      );


      toast.success("Login Successful 😭🔥");

      navigate("/dashboard");

    } catch (error) {

      toast.error("Invalid Credentials");

    }

  };


  return (

    <div className="min-h-screen bg-[#0f172a] flex justify-center items-center">

      <form

        onSubmit={handleSubmit}

        className="bg-[#111827] border border-gray-800 p-10 rounded-3xl w-[400px] shadow-2xl"

      >

        <h1 className="text-4xl text-white font-bold mb-8 text-center">

          CRM Login

        </h1>


        <div className="flex flex-col gap-6">

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="bg-[#0f172a] border border-gray-700 p-5 rounded-2xl text-white outline-none"
          />


          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="bg-[#0f172a] border border-gray-700 p-5 rounded-2xl text-white outline-none"
          />


          <button
            type="submit"
            className="bg-linear-to-r from-purple-500 to-pink-500 p-5 rounded-2xl text-white font-bold hover:scale-105 transition"
          >

            Login

          </button>

        </div>

      </form>

    </div>

  );

}

export default Login;