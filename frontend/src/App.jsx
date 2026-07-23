// =======================================================
// SECTION 1 : IMPORTS
// =======================================================

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";
import MyRegistrations from "./pages/MyRegistrations";
import Dashboard from "./pages/Dashboard";
import EditEvent from "./pages/EditEvent";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import CoordinatorDashboard from "./pages/CoordinatorDashboard";
import Participants from "./pages/Participants";
import Payment from "./pages/Payment";
import Ticket from "./pages/Ticket";
import ScanAttendance from "./pages/ScanAttendance";
import AdminDashboard from "./pages/AdminDashboard";

// =======================================================
// SECTION 2 : COMPONENT
// =======================================================

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/events/:id"
          element={<EventDetails />}
        />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/create-event"
  element={
    <RoleProtectedRoute
      allowedRoles={["coordinator", "admin"]}
    >
      <CreateEvent />
    </RoleProtectedRoute>
  }
/>
        
        <Route
  path="/edit-event/:id"
  element={
    <RoleProtectedRoute allowedRoles={["coordinator", "admin"]}>
      <EditEvent />
    </RoleProtectedRoute>
  }
/>

        <Route
          path="/my-registrations"
          element={
            <ProtectedRoute>
              <MyRegistrations />
            </ProtectedRoute>
          }
        />
        <Route
  path="/coordinator-dashboard"
  element={
    <RoleProtectedRoute
      allowedRoles={["coordinator","admin"]}
    >
      <CoordinatorDashboard />
    </RoleProtectedRoute>
  }
/>
    <Route
  path="/participants/:eventId"
  element={
    <RoleProtectedRoute allowedRoles={["coordinator", "admin"]}>
      <Participants />
    </RoleProtectedRoute>
  }
/>
<Route
  path="/payment"
  element={
    <ProtectedRoute>
      <Payment />
    </ProtectedRoute>
  }
/>
<Route
  path="/ticket"
  element={
    <ProtectedRoute>
      <Ticket />
    </ProtectedRoute>
  }
/>
<Route
  path="/scan-attendance"
  element={
    <RoleProtectedRoute allowedRoles={["coordinator", "admin"]}>
      <ScanAttendance />
    </RoleProtectedRoute>
  }
/>

<Route
  path="/admin-dashboard"
  element={
    <RoleProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboard />
    </RoleProtectedRoute>
  }
/>


      </Routes>



      {/* Toast Notifications */}

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

    </BrowserRouter>

  );

}

// =======================================================
// SECTION 3 : EXPORT
// =======================================================

export default App;