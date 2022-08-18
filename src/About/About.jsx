import React from "react";

export default function About() {
  return (
    <div className="about-container max-vw-100 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="about-content bg-black text-white-50 w-75 p-4 rounded rounded-3 shadow-lg">
        <h2 className="h1 text-center text-white mb-4">About</h2>
        <p>
          This is a movie database app built with React, React Router, and React
          Bootstrap. It is a single page application that allows users to search
          for movies, view movie details, and view people details. The app is
          protected with a JWT authentication token. The app is deployed on
          Heroku.
        </p>
        <p>
          The app is built with React, React Router, and React Bootstrap. It is
          a single page application that allows users to search for movies, view
          movie details, and view people details. The app is protected with a
          JWT authentication token. The app is deployed on Heroku.
        </p>
      </div>
    </div>
  );
}
