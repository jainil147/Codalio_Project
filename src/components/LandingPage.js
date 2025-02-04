import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <h1
        className="text-4xl font-bold"
        style={{
          background: "linear-gradient(58deg, rgba(243,172,18,1) 20%, rgba(241,196,15,1) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Welcome to Our Platform
      </h1>
      <p className="text-lg mt-4 max-w-xl">
        The best solution for managing your business efficiently. Sign up now to get started!
      </p>
      <a 
        href="/signup" 
        className="mt-6 px-6 py-3 rounded-lg font-semibold text-white bg-yellow-600 hover:bg-yellow-700 transition"
      >
        Sign Up Here
      </a>
    </div>
  );
};

export default LandingPage;
