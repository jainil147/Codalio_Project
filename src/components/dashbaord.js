import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";


export function Dashboard() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/signup"); // Redirect to signup if not logged in
    } else {
      setUserDetails(user);
    }
  }, []);


  const handleLogout = () => {
    // Remove token or session data from localStorage or cookies
    localStorage.removeItem('user');
    // Or if you're using cookies:

    navigate("/signup");
  };



  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-center text-2xl font-bold border-b border-gray-700">
          Dashboard
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2 p-4">
            <li>
              <a
                href="#"
                className="block p-2 rounded hover:bg-gray-700 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block p-2 rounded hover:bg-gray-700 transition"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block p-2 rounded hover:bg-gray-700 transition"
              >
                Settings
              </a>
            </li>
            <li>

              <button className="block p-2 rounded hover:bg-gray-700 transition" onClick={handleLogout}>Logout</button>

            </li>
          </ul>
        </nav>
        <footer className="p-4 text-center text-sm border-t border-gray-700">
        </footer>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Welcome to Dashboard</h1>
        {userDetails ? (
          <p className="text-lg text-gray-700">
            Welcome, <span className="font-semibold">{userDetails.name}</span>!
          </p>
        ) : (
          <p className="text-lg text-gray-700">User details not available.</p>
        )}
      </main>
    </div>
  );
}
