import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const MyListings = () => {
  useTitle("StudyNook – My Listings");

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/rooms/mine`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="py-24 text-center text-gray-600">Loading your rooms...</p>;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-ink">My Listings</h1>
      <p className="mt-2 text-gray-600">The rooms you have listed on StudyNook.</p>

      {rooms.length === 0 ? (
        <div className="mt-10 rounded-xl border border-gray-200 p-10 text-center">
          <p className="text-gray-600">You have not listed any rooms yet.</p>
          <Link
            to="/add-room"
            className="mt-4 inline-block rounded-lg bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-light"
          >
            Add Your First Room
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
            >
              <img
                src={room.image}
                alt={room.name}
                className="h-32 w-full rounded-lg object-cover sm:h-24 sm:w-36"
              />

              <div className="flex-1">
                <h2 className="text-lg font-bold text-ink">{room.name}</h2>
                <p className="text-sm text-gray-600">
                  {room.floor} · Up to {room.capacity} people · ${room.hourlyRate}/hr
                </p>
                <p className="text-sm text-gray-600">
                  Bookings so far: {room.bookingCount}
                </p>
              </div>

              <Link
                to={`/rooms/${room._id}`}
                className="rounded-lg bg-brand px-5 py-2 text-center text-sm font-semibold text-white hover:bg-brand-light"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;