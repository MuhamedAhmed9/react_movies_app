import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import $ from "jquery";

export default function SearchMovie() {
  let { term } = useParams();
  const [Results, setResults] = useState([]);
  let nums = new Array(30).fill(0).map((_, i) => i + 1);

  async function getTrending(pageNumber) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=ef80a5c8a9404e2d98a00922fdd6774f&language=en-US&query=${term}&page=1&include_adult=true&page=${pageNumber}`
    );
    console.log(data.results);
    setResults(data.results);
  }

  useEffect(() => {
    getTrending(1);
  }, []);

  function linkClick(pageNumber, target) {
    getTrending(pageNumber);
    $(target)
      .parent()
      .addClass("activeLink")
      .siblings()
      .removeClass("activeLink");
  }

  return (
    <>
      <div className="row gy-3 justify-content-center">
        {Results
          ? Results.map((term, i) =>
              term.title && term.poster_path ? (
                <div key={i} className="col-md-2">
                  <Link to={`/movie_details/${term.id}`}>
                    <div className="movie-item">
                      <img
                        src={
                          "https://image.tmdb.org/t/p/w500" + term.poster_path
                        }
                        alt=""
                        className="w-100"
                      />
                      <h4 className="text-center h6">{term.title}</h4>
                    </div>
                  </Link>
                </div>
              ) : term.name && term.profile_path ? (
                <div key={i} className="col-md-2">
                  <Link to={`/person_details/${term.id}`}>
                    <div className="movie-item">
                      <img
                        src={
                          "https://image.tmdb.org/t/p/w500" + term.profile_path
                        }
                        alt=""
                        className="w-100"
                      />
                      <h4 className="text-center h6">{term.name}</h4>
                    </div>
                  </Link>
                </div>
              ) : term.name && term.poster_path ? (
                <div key={i} className="col-md-2">
                  <Link to={`/tvshow_details/${term.id}`}>
                    <div className="movie-item">
                      <img
                        src={
                          "https://image.tmdb.org/t/p/w500" + term.poster_path
                        }
                        alt=""
                        className="w-100"
                      />
                      <h4 className="text-center h6">{term.name}</h4>
                    </div>
                  </Link>
                </div>
              ) : null
            )
          : null}
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination d-flex justify-content-center">
          <li key={0} className="page-item activeLink">
            <a
              onClick={(e) => linkClick(e.target.innerText, e.target)}
              className="page-link bg-transparent"
            >
              {1}
            </a>
          </li>
          {nums.map((num, i) =>
            num !== 1 ? (
              <li key={i} className="page-item">
                <a
                  onClick={(e) => linkClick(e.target.innerText, e.target)}
                  className="page-link bg-transparent"
                >
                  {num}
                </a>
              </li>
            ) : null
          )}
        </ul>
      </nav>
    </>
  );
}
