{StudyNook} – Library Study Room Booking

{Live site:} https://studynook-client-orpin.vercel.app

StudyNook is a full-stack web application where students and library users can list study rooms they control, and any registered user can browse, search, filter and book those rooms for a specific date and time slot. The platform prevents double-booking automatically, lets owners manage their own listings, and gives every user a dashboard for their bookings.

{Features}
--Secure authentication: register and log in with email and password, or continue with Google. Sessions use a JWT stored in an HTTP-only cookie, and users stay logged in when they reload any private page.

--Smart booking with conflict detection: pick a date and an hourly slot, see the total cost update live, and get blocked automatically if the room is already booked for an overlapping time.

--Room management for owners: add a room with photo, floor, capacity, hourly rate and amenities, then edit or delete it from the room page. Ownership is checked on the server, so only the owner can change a listing.

--Search, filter and sort: search rooms by name, filter by facilities such as Wi-Fi or Projector, and sort by hourly rate from a sidebar on the All Rooms page.

--Personal booking dashboard: see every booking with a confirmed or cancelled badge, and cancel a future booking after a confirmation step.

--Responsive design: works on mobile, tablet and desktop, with a hamburger menu on small screens, equal-size room cards and a loading spinner while data loads.

--Friendly feedback: toast notifications for every success and error, a custom 404 page, and a page title that changes on every route.

{Tech Stack}

@--Client: React, Vite, React Router, Tailwind CSS, React Hot Toast, Google OAuth

@--Server: Node.js, Express, MongoDB, Mongoose, JSON Web Tokens, bcrypt

{Pages}

[Route Access Description]

/ Public Hero banner, latest 6 rooms, how it works, why choose StudyNook
/rooms Public All rooms with sidebar search, facilities filter and rate sorting
/rooms/:id Public Room details, booking, and owner-only edit and delete
/login, /register Public Email and password or Google sign-in
/add-room Private Create a new room listing
/my-listings Private Rooms you have listed
/my-bookings Private Your bookings, with cancel option

{Run Locally}

--Clone the repository and install the packages:

//bash//

git clone https://github.com/safayetahmed82/studynook-client.git
cd studynook-client
npm install

--Create a .env file in the project root:

VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id

--Start the app:

bash
npm run dev

The app opens at http://localhost:5173. It needs the StudyNook server running as well.

Repositories
Client: https://github.com/safayetahmed82/studynook-client
Server: https://github.com/safayetahmed82/studynook-server
