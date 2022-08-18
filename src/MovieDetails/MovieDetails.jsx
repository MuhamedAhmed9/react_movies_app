import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MovieDetails() {
  let { id } = useParams(); //use params return object has id property that we passed in the url
  let [movieDetails, setMovieDetails] = useState(null);

  async function getMovieDetails(id) {
    let genres = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=ef80a5c8a9404e2d98a00922fdd6774f&language=en-US"
    );
    console.log(genres.data.genres);
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=ef80a5c8a9404e2d98a00922fdd6774f&language=en-US`
    );
    console.log(data);
    setMovieDetails(data);
  }

  useEffect(() => {
    getMovieDetails(id);
  }, []);

  return (
    <div className="container">
      <div className="row">
        {movieDetails ? (
          <>
            <div className="col-md-5">
              <img
                src={
                  "https://image.tmdb.org/t/p/w500" + movieDetails.poster_path
                }
                alt=""
                className="w-100"
              />
            </div>
            <div className="col-md-7">
              <h2 className="my-5 fw-bold">{movieDetails.title}</h2>
              <p className="my-4">Overview : {movieDetails.overview}</p>
              <p className="my-4">Release Date : {movieDetails.release_date}</p>
              <p className="my-4">Vote Average : {movieDetails.vote_average}</p>
              <p className="my-4">Vote Count : {movieDetails.vote_count}</p>
              <p className="my-4">Imdb Id : {movieDetails.imdb_id}</p>
              <p className="">
                imdb link :{" "}
                <a
                  className="text-warning"
                  href={`https://www.imdb.com/title/${movieDetails.imdb_id}/`}
                  target="_blank"
                >
                  {`https://www.imdb.com/title/${movieDetails.imdb_id}/`}
                </a>
              </p>
              <p className="my-4">Movie Status : {movieDetails.status}</p>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
