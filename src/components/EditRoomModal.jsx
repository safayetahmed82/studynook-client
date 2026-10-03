import { useState } from "react";
import toast from "react-hot-toast";

const amenityOptions = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const EditRoomModal = ({ room, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    name: room.name,
    description: room.description,
    image: room.image,
    floor: room.floor,
    capacity: room.capacity,
    hourlyRate: room.hourlyRate,
  });
  const [amenities, setAmenities] = useState(room.amenities);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAmenity = (item) => {
    if (amenities.includes(item)) {
      setAmenities(amenities.filter((a) => a !== item));
    } else {
      setAmenities([...amenities, item]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/rooms/${room._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ ...form, amenities }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        toast.success("Room updated successfully");
        onUpdated(data);
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
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-ink">Edit Room</h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Room Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Description</label>
            <textarea
              name="description"
              required
              rows="4"
              value={form.description}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Image URL</label>
            <input
              type="text"
              name="image"
              required
              value={form.image}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium">Floor</label>
              <input
                type="text"
                name="floor"
                required
                value={form.floor}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Capacity</label>
              <input
                type="number"
                name="capacity"
                required
                min="1"
                value={form.capacity}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Hourly Rate ($)
              </label>
              <input
                type="number"
                name="hourlyRate"
                required
                min="1"
                value={form.hourlyRate}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">Amenities</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {amenityOptions.map((item) => (
                <label key={item} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={amenities.includes(item)}
                    onChange={() => handleAmenity(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoomModal;