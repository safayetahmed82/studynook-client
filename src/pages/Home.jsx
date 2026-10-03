import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import RoomCard from "../components/RoomCard";
import Spinner from "../components/Spinner";

const Home = () => {
  useTitle("StudyNook – Home");

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/rooms?limit=6`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-12/14 mx-auto ">
      <section className=" bg-cyan-50 px-4 py-20 text-center ">
        <h1 className="text-4xl font-bold text-ink sm:text-5xl">
          Find Your Perfect Study Room
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
          Browse and book quiet, private study rooms in your library. List your
          own room and earn.
        </p>
        <Link
          to="/rooms"
          className="mt-8 inline-block rounded-lg bg-brand px-8 py-3 font-semibold text-white hover:bg-brand-light"
        >
          Explore Rooms
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold text-ink">Available Study Rooms</h2>
        <p className="mt-2 text-gray-600">Our latest rooms, ready to book.</p>

        {loading ? (
          <Spinner />
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        )}
      </section>
      <section className="bg-gray-100 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold text-ink">
            How It Works
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Booking a study room takes only a minute.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
              <p className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand text-xl font-bold text-white">
                1
              </p>
              <h3 className="mt-4 text-lg font-bold text-ink">Find a room</h3>
              <p className="mt-2 text-sm text-gray-600">
                Search the library rooms and pick one that fits your group and
                budget.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
              <p className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand text-xl font-bold text-white">
                2
              </p>
              <h3 className="mt-4 text-lg font-bold text-ink">Choose a time</h3>
              <p className="mt-2 text-sm text-gray-600">
                Select the date and the hours you need, and see the total cost
                straight away.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
              <p className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand text-xl font-bold text-white">
                3
              </p>
              <h3 className="mt-4 text-lg font-bold text-ink">
                Start studying
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Confirm your booking and arrive at your quiet room on time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold text-ink">
          Why Choose StudyNook
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Made for students who need a calm place to focus.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-brand">No double bookings</h3>
            <p className="mt-2 text-sm text-gray-600">
              Every room is checked for time clashes, so your slot is always
              yours.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-brand">
              Earn from your room
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Control a private room? List it, set your hourly rate and manage
              it yourself.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-brand">Simple and secure</h3>
            <p className="mt-2 text-sm text-gray-600">
              Manage all your bookings from one dashboard, with a safe and
              private login.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
