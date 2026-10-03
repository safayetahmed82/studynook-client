import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import ConfirmModal from "../components/ConfirmModal";

const label = (hour) => (hour < 10 ? "0" + hour : hour) + ":00";

const MyBookings = () => {
  useTitle("StudyNook – My Bookings");

  const today = new Date().toISOString().slice(0, 10);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/bookings/mine`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      });
  }, []);

  const handleCancel = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings/${cancelId}/cancel`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      const data = await res.json();

      if (res.ok) {
        toast.success("Booking cancelled");
        setBookings(
          bookings.map((b) =>
            b._id === cancelId ? { ...b, status: "cancelled" } : b
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
    setCancelId(null);
  };

  if (loading) {
    return <p className="py-24 text-center text-gray-600">Loading your bookings...</p>;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-ink">My Bookings</h1>
      <p className="mt-2 text-gray-600">All the rooms you have booked.</p>

      {bookings.length === 0 ? (
        <div className="mt-10 rounded-xl border border-gray-200 p-10 text-center">
          <p className="text-gray-600">You have no bookings yet.</p>
          <Link
            to="/rooms"
            className="mt-4 inline-block rounded-lg bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-light"
          >
            Browse Rooms
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
            >
              <img
                src={booking.room ? booking.room.image : ""}
                alt={booking.room ? booking.room.name : "Deleted room"}
                className="h-32 w-full rounded-lg bg-gray-100 object-cover sm:h-24 sm:w-36"
              />

              <div className="flex-1">
                <h2 className="text-lg font-bold text-ink">
                  {booking.room ? booking.room.name : "This room was deleted"}
                </h2>
                <p className="text-sm text-gray-600">
                  {booking.date} · {label(booking.startHour)} to{" "}
                  {label(booking.endHour)}
                </p>
                <p className="text-sm text-gray-600">
                  Total: ${booking.totalCost}
                </p>
                {booking.note && (
                  <p className="text-sm text-gray-500">Note: {booking.note}</p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {booking.status === "confirmed" ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    confirmed
                  </span>
                ) : (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                    cancelled
                  </span>
                )}

                {booking.status === "confirmed" && booking.date >= today && (
                  <button
                    onClick={() => setCancelId(booking._id)}
                    className="rounded-lg border border-red-600 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {cancelId && (
        <ConfirmModal
          title="Cancel this booking?"
          message="The time slot will become available for other people."
          confirmText="Yes, cancel it"
          onConfirm={handleCancel}
          onCancel={() => setCancelId(null)}
        />
      )}
    </div>
  );
};

export default MyBookings;