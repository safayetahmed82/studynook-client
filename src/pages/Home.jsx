import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import RoomCard from "../components/RoomCard";

const Home = () => {
  useTitle("StudyNook – Home");

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/rooms?limit=6`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <section className="bg-cyan-50 px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-ink sm:text-5xl">
          Find Your Perfect Study Room
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
          Browse and book quiet, private study rooms in your library. List your
          own room and earn.
        </p>
        <Link
          to="/rooms"
          className="mt-8 inline-block rounded-lg bg-brand px-8 py-3 font-semibold text-white hover:bg-brand-light"
        >
          Explore Rooms
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold text-ink">Available Study Rooms</h2>
        <p className="mt-2 text-gray-600">Our latest rooms, ready to book.</p>

        {loading ? (
          <p className="py-12 text-center text-gray-600">Loading rooms...</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;