import React, { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import { Link } from "react-router-dom";

export default function People() {
  const [TrendingPeople, setTrendingPeople] = useState([]);
  let nums = new Array(30).fill(0).map((_, i) => i + 1);

  async function getTrending(pageNumber) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/person/week?api_key=ef80a5c8a9404e2d98a00922fdd6774f&page=${pageNumber}`
    );
    console.log(data.results);
    setTrendingPeople(data.results);
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
        {TrendingPeople
          ? TrendingPeople.map((person, i) => (
              <div key={i} className="col-md-2">
                <Link to={`/person_details/${person.id}`}>
                  <div className="movie-item">
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w500" + person.profile_path
                      }
                      alt=""
                      className="w-100"
                    />
                    <h4 className="text-center h6">{person.name}</h4>
                  </div>
                </Link>
              </div>
            ))
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
