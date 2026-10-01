import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const RoomDetails = () => {
  useTitle("StudyNook – Room Details");

  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/rooms/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRoom(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="py-24 text-center text-gray-600">Loading room...</p>;
  }

  if (!room || !room.name) {
    return <p className="py-24 text-center text-gray-600">Room not found.</p>;
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-2 ">
      <img
        src={room.image}
        alt={room.name}
        className="h-80 w-full rounded-xl object-cover lg:h-96"
      />

      <div>
        <h1 className="text-3xl font-bold text-ink">{room.name}</h1>
        <p className="mt-4 text-gray-600">{room.description}</p>

        <div className="mt-6 space-y-2 text-gray-700">
          <p>Floor: {room.floor}</p>
          <p>Capacity: Up to {room.capacity} people</p>
          <p>Bookings so far: {room.bookingCount}</p>
        </div>

        <p className="mt-4 text-2xl font-bold text-brand">
          ${room.hourlyRate}/hr
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {room.amenities.map((item) => (
            <span
              key={item}
              className="rounded-full bg-cyan-50 px-3 py-1 text-sm text-brand"
            >
              {item}
            </span>
          ))}
        </div>

        <button className="mt-8 rounded-lg bg-brand px-8 py-3 font-semibold text-white hover:bg-brand-light">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default RoomDetails;
