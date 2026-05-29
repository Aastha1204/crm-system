import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import AUTH_API from "../api/authApi";


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

      const res = await AUTH_API.post(

        "/login",

        formData

      );
      console.log(res.data);


      localStorage.setItem(

        "token",

        res.data.token

      );


      toast.success("Login Successful 😭🔥");


      window.location.href = "/dashboard";


    } catch (error) {

      console.log(error);

      alert(
    JSON.stringify(error?.response?.data) ||
    error.message
  );

  toast.error("Login Failed");
}

  };


  return (

    <div className="bg-[#0f172a] min-h-screen flex justify-center items-center">

      <form

        onSubmit={handleSubmit}

        className="bg-[#111827] p-12 rounded-3xl w-[500px] border border-gray-800"

      >

        <h1 className="text-white text-6xl font-bold text-center mb-10">

          CRM Login

        </h1>


        <input

          type="email"

          name="email"

          placeholder="Email"

          onChange={handleChange}

          className="w-full p-5 rounded-2xl bg-[#1e293b] text-white outline-none mb-8"

        />


        <input

          type="password"

          name="password"

          placeholder="Password"

          onChange={handleChange}

          className="w-full p-5 rounded-2xl bg-[#0f172a] text-white outline-none mb-8 border border-gray-700"

        />


        <button

          className="w-full bg-linear-to-r from-purple-500 to-pink-500 text-white p-5 rounded-2xl font-bold text-2xl hover:scale-105 transition"

        >

          Login

        </button>

      </form>

    </div>

  );

}

export default Login;