import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import NotFound from "./pages/NotFound";
import RoomDetails from "./pages/RoomDetails";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
