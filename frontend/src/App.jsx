import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/events" element={<Events />} />

        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/events/:id" element={<EventDetails />} />

        
      </Routes>

    </BrowserRouter>
  );
}

export default App;