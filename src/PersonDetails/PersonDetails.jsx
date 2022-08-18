import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PersonDetails() {
  let { id } = useParams(); //use params return object has id property that we passed in the url
  let [TvDetails, setTvDetails] = useState(null);

  async function getTvDetails(id) {
    let genres = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=ef80a5c8a9404e2d98a00922fdd6774f&language=en-US"
    );
    console.log(genres.data.genres);
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/person/${id}?api_key=ef80a5c8a9404e2d98a00922fdd6774f&language=en-US`
    );
    // console.log(data);
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
                src={"https://image.tmdb.org/t/p/w500" + TvDetails.profile_path}
                alt=""
                className="w-100"
              />
            </div>
            <div className="col-md-7">
              <h2 className="my-5 fw-bold">{TvDetails.name}</h2>
              <p className="my-4">Overview : {TvDetails.biography}</p>
              <p className="my-4">Birthday : {TvDetails.birthday}</p>
              <p className="my-4">
                place of birth : {TvDetails.place_of_birth}
              </p>
              <p>
                Imdb Link :{" "}
                <a
                  href={`https://www.imdb.com/name/${TvDetails.imdb_id}/`}
                  target="_blank"
                  className="text-warning"
                >{`https://www.imdb.com/name/${TvDetails.imdb_id}/`}</a>
              </p>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
