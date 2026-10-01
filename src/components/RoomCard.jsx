import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <img
        src={room.image}
        alt={room.name}
        className="h-48 w-full object-cover"
      />

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-bold text-ink">{room.name}</h3>

        <p className="mt-2 text-sm text-gray-600">
          {room.description.slice(0, 100)}...
        </p>

        <p className="mt-3 text-sm text-gray-700">
          {room.floor} · Up to {room.capacity} people
        </p>

        <p className="mt-1 text-lg font-bold text-brand">
          ${room.hourlyRate}/hr
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {room.amenities.slice(0, 3).map((item) => (
            <span
              key={item}
              className="rounded-full bg-cyan-50 px-3 py-1 text-xs text-brand"
            >
              {item}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
              +{room.amenities.length - 3} more
            </span>
          )}
        </div>

        <Link
          to={`/rooms/${room._id}`}
          className="mt-auto rounded-lg bg-brand px-4 py-2 text-center font-semibold text-white hover:bg-brand-light"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;