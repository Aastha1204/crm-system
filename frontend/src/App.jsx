import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";


function App() {

  const token = localStorage.getItem("token");


  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN PAGE */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* HOME PAGE */}

        <Route
          path="/"
          element={
            token ? (
              <Home />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route

  path="/register"

  element={<Register />}

/>


        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            token ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />


        {/* CREATE TICKET */}

        <Route
          path="/create-ticket"
          element={
            token ? (
              <CreateTicket />
            ) : (
              <Navigate to="/login" />
            )
          }
        />


        {/* TICKET DETAILS */}

        <Route
          path="/ticket/:id"
          element={
            token ? (
              <TicketDetails />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;