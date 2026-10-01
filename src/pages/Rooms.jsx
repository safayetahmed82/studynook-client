import { useEffect, useState } from "react";
import useTitle from "../hooks/useTitle";
import RoomCard from "../components/RoomCard";

const Rooms = () => {
  useTitle("StudyNook – Available Rooms");

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/rooms`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="py-24 text-center text-gray-600">Loading rooms...</p>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-ink">Available Rooms</h1>
      <p className="mt-2 text-gray-600">
        Pick a room and book it for the time you need.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;


