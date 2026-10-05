import { useState } from "react";
import toast from "react-hot-toast";

const startHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const allEndHours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

const label = (hour) => (hour < 10 ? "0" + hour : hour) + ":00";

const BookingModal = ({ room, onClose, onBooked }) => {
  const today = new Date().toISOString().slice(0, 10);

  const [date, setDate] = useState(today);
  const [startHour, setStartHour] = useState(9);
  const [endHour, setEndHour] = useState(10);
  const [note, setNote] = useState("");

  const endOptions = allEndHours.filter((hour) => hour > startHour);
  const totalCost = (endHour - startHour) * room.hourlyRate;

  const handleStartChange = (e) => {
    const newStart = Number(e.target.value);
    setStartHour(newStart);
    if (endHour <= newStart) {
      setEndHour(newStart + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          roomId: room._id,
          date,
          startHour,
          endHour,
          note,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Room booked successfully!");
        onBooked();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-ink">Book {room.name}</h2>
        <p className="mt-1 text-sm text-gray-600">
          ${room.hourlyRate} per hour
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Date</label>
            <input
              type="date"
              required
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Start Time
              </label>
              <select
                value={startHour}
                onChange={handleStartChange}
                className={inputClass}
              >
                {startHours.map((hour) => (
                  <option key={hour} value={hour}>
                    {label(hour)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">End Time</label>
              <select
                value={endHour}
                onChange={(e) => setEndHour(Number(e.target.value))}
                className={inputClass}
              >
                {endOptions.map((hour) => (
                  <option key={hour} value={hour}>
                    {label(hour)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Special Note (optional)
            </label>
            <textarea
              rows="2"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg bg-cyan-50 px-4 py-3">
            <span className="font-medium text-ink">Total Cost</span>
            <span className="text-xl font-bold text-brand">${totalCost}</span>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 font-medium hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-brand px-5 py-2 font-semibold text-white hover:bg-brand-light"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
