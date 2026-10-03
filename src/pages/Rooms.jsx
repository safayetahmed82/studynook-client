import { useEffect, useState } from "react";
import useTitle from "../hooks/useTitle";
import RoomCard from "../components/RoomCard";

const amenityOptions = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const Rooms = () => {
  useTitle("StudyNook – Available Rooms");

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [sort, setSort] = useState("");

  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (selected.length > 0) params.set("amenities", selected.join(","));
    if (sort) params.set("sort", sort);

    fetch(`${import.meta.env.VITE_API_URL}/api/rooms?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setRooms([]);
        setLoading(false);
      });
  }, [search, selected, sort]);

  const handleAmenity = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((a) => a !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setSelected([]);
    setSort("");
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-brand focus:outline-none";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-ink">Available Rooms</h1>
      <p className="mt-2 text-gray-600">
        Pick a room and book it for the time you need.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-4">
        <aside className="h-fit space-y-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Search by name
            </label>
            <input
              type="text"
              placeholder="e.g. quiet"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Sort by hourly rate
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className={inputClass}
            >
              <option value="">Newest first</option>
              <option value="rateLow">Low to high</option>
              <option value="rateHigh">High to low</option>
            </select>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">Facilities</p>
            <div className="space-y-2">
              {amenityOptions.map((item) => (
                <label key={item} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selected.includes(item)}
                    onChange={() => handleAmenity(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Clear filters
          </button>
        </aside>

        <div className="lg:col-span-3">
          {loading ? (
            <p className="py-16 text-center text-gray-600">Loading rooms...</p>
          ) : rooms.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-xl font-bold text-ink">No rooms found</p>
              <p className="mt-2 text-gray-600">
                Try a different name, or clear some filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {rooms.map((room) => (
                <RoomCard key={room._id} room={room} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
