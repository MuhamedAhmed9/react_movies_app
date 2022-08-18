import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [TrendingMovies, setTrendingMovies] = useState([]);
  const [TrendingTvs, setTrendingTvs] = useState([]);
  const [TrendingPeople, setTrendingPeople] = useState([]);
  async function getTrending(mediaType, callback) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=ef80a5c8a9404e2d98a00922fdd6774f&page=1`
    );
    callback(data.results);
  }

  useEffect(() => {
    getTrending("movie", setTrendingMovies);
    getTrending("tv", setTrendingTvs);
    getTrending("person", setTrendingPeople);
  }, []);

  return (
    <>
      <div className="row gy-3">
        <div className="col-md-4 d-flex align-items-center">
          <div className="section-heading">
            <hr className="w-25" />
            <h2 className="h3 w-75">Trending Movies Watching Now</h2>
            <p className="text-muted">most watched movies these days</p>
            <hr />
          </div>
        </div>
        {TrendingMovies.slice(0, 10).map((movie, i) => (
          <div key={i} className="col-md-2">
            <Link to={`/movie_details/${movie.id}`}>
              <div className="movie-item">
                <img
                  src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                  alt=""
                  className="w-100"
                />
                <h4 className="text-center h6">{movie.title}</h4>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="row gy-3">
        <div className="col-md-4 d-flex align-items-center">
          <div className="section-heading">
            <hr className="w-25" />
            <h2 className="h3 w-75">Trending Tv Shows Watching Now</h2>
            <p className="text-muted">most watched tv shows these days</p>
            <hr />
          </div>
        </div>
        {TrendingTvs.slice(0, 10).map((movie, i) => (
          <div key={i} className="col-md-2">
            <Link to={`/tvshow_details/${movie.id}`}>
              <div className="movie-item">
                <img
                  src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                  alt=""
                  className="w-100"
                />
                <h4 className="text-center h6">{movie.name}</h4>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="row gy-3">
        <div className="col-md-4 d-flex align-items-center">
          <div className="section-heading">
            <hr className="w-25" />
            <h2 className="h3 w-75">Trending actors to Watch Now</h2>
            <p className="text-muted">most watched actors shows these days</p>
            <hr />
          </div>
        </div>
        {TrendingPeople.slice(0, 10).map((movie, i) => (
          <div key={i} className="col-md-2">
            <Link to={`/person_details/${movie.id}`}>
              <div className="movie-item">
                <img
                  src={"https://image.tmdb.org/t/p/w500" + movie.profile_path}
                  alt=""
                  className="w-100"
                />
                <h4 className="text-center h6">{movie.name}</h4>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
