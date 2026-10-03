import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import { useAuth } from "../context/AuthContext";
import ConfirmModal from "../components/ConfirmModal";
import EditRoomModal from "../components/EditRoomModal";

const RoomDetails = () => {
  useTitle("StudyNook – Room Details");

  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/rooms/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRoom(data);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/rooms/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      const data = await res.json();

      if (res.ok) {
        toast.success("Room deleted successfully");
        navigate("/my-listings");
      } else {
        toast.error(data.message);
        setShowDelete(false);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setShowDelete(false);
    }
  };

  if (loading) {
    return <p className="py-24 text-center text-gray-600">Loading room...</p>;
  }

  if (!room || !room.name) {
    return <p className="py-24 text-center text-gray-600">Room not found.</p>;
  }

  const isOwner = user && room.owner === user._id;

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-2">
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

        <div className="mt-8 flex flex-wrap gap-3">
          {user ? (
            <button className="rounded-lg bg-brand px-8 py-3 font-semibold text-white hover:bg-brand-light">
              Book Now
            </button>
          ) : (
            <Link
              to="/login"
              state={{ from: { pathname: `/rooms/${id}` } }}
              className="rounded-lg bg-brand px-8 py-3 font-semibold text-white hover:bg-brand-light"
            >
              Login to Book
            </Link>
          )}

          {isOwner && (
            <>
              <button
                onClick={() => setShowEdit(true)}
                className="rounded-lg border border-brand px-6 py-3 font-semibold text-brand hover:bg-cyan-50"
              >
                Edit
              </button>
              <button
                onClick={() => setShowDelete(true)}
                className="rounded-lg border border-red-600 px-6 py-3 font-semibold text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {showDelete && (
        <ConfirmModal
          title="Delete this room?"
          message="This will permanently remove the room. This cannot be undone."
          confirmText="Yes, delete"
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
      {showEdit && (
        <EditRoomModal
          room={room}
          onClose={() => setShowEdit(false)}
          onUpdated={(updated) => {
            setRoom(updated);
            setShowEdit(false);
          }}
        />
      )}
    </div>
  );
};

export default RoomDetails;
