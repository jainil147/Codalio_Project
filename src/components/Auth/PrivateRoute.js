import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate token check or an API call to verify the user
    setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust timeout as needed
  }, []);

  if (loading) {
      return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
          <div className="animate-spin h-12 w-12 border-t-4 border-blue-500 border-opacity-75 rounded-full"></div>
        </div>
      );
  }

  return user ? <Element /> : <Navigate to="/signup" />;
};

export default PrivateRoute;
