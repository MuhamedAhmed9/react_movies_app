import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TvDetails() {
  let { id } = useParams(); //use params return object has id property that we passed in the url
  let [TvDetails, setTvDetails] = useState(null);

  async function getTvDetails(id) {
    let genres = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=ef80a5c8a9404e2d98a00922fdd6774f&language=en-US"
    );
    console.log(genres.data.genres);
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=ef80a5c8a9404e2d98a00922fdd6774f&language=en-US`
    );
    console.log(data);
    setTvDetails(data);
  }

  useEffect(() => {
    getTvDetails(id);
  }, []);

  return (
    <div className="container">
      <div className="row">
        {console.log(TvDetails)}
        {TvDetails ? (
          <>
            <div className="col-md-5">
              <img
                src={"https://image.tmdb.org/t/p/w500" + TvDetails.poster_path}
                alt=""
                className="w-100"
              />
            </div>
            <div className="col-md-7">
              <h2 className="my-5 fw-bold">{TvDetails.name}</h2>
              <p className="my-4">Overview : {TvDetails.overview}</p>
              <p className="my-4">Vote Average : {TvDetails.vote_average}</p>
              <p className="my-4">Vote Count : {TvDetails.vote_count}</p>
              <p className="my-4">
                Number of Seasons : {TvDetails.seasons.length}
              </p>
              <p className="my-4">Movie Status : {TvDetails.status}</p>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
