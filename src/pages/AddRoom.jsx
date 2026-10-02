import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";

const amenityOptions = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const AddRoom = () => {
  useTitle("StudyNook – Add Room");

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    floor: "",
    capacity: "",
    hourlyRate: "",
  });
  const [amenities, setAmenities] = useState([]);

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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/rooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...form, amenities }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Room added successfully");
        navigate("/my-listings");
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
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-ink">Add a Study Room</h1>
        <p className="mt-2 text-gray-600">
          Fill in the details of the room you want to list.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                placeholder="Floor 3"
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

          <button
            type="submit"
            className="w-full rounded-lg bg-brand px-4 py-3 font-semibold text-white hover:bg-brand-light"
          >
            Add Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;