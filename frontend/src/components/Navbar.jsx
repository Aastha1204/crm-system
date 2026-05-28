import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");


  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };


  return (

    <div className="bg-[#111827]/80 backdrop-blur-xl border border-gray-800 p-6 rounded-3xl flex justify-between items-center shadow-2xl">

      <div>

        <h1 className="text-4xl font-bold text-white">

          CRM Dashboard

        </h1>

        <p className="text-gray-400 mt-1">

          Manage customer tickets efficiently

        </p>

      </div>


      {token && (

        <button

          onClick={handleLogout}

          className="bg-linear-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-2xl font-bold text-white hover:scale-105 transition"

        >

          Logout

        </button>

      )}

    </div>

  );

}

export default Navbar;