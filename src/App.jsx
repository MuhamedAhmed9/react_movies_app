import "./App.css";
import Navbar from "./Navbar/Navbar";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Movies from "./Movies/Movies";
import Register from "./Register/Register";
import People from "./People/People";
import Notfound from "./Notfound/Notfound";
import Tvshow from "./Tvshow/Tvshow";
import Networks from "./Networks/Networks";
import About from "./About/About";
import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import MovieDetails from "./MovieDetails/MovieDetails";
import TvDetails from "./TvDetails/TvDetails";
import PersonDetails from "./PersonDetails/PersonDetails";
import SearchMovie from "./SearchMovie/SearchMovie";

function App() {
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();

  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken");
    if (encodedToken !== null) {
      let decodedToken = jwtDecode(encodedToken);
      setUserData(decodedToken);
      console.log(decodedToken);
    }
  }

  useEffect(() => {
    saveUserData();
  }, []);

  function logOut() {
    setUserData(null);
    localStorage.removeItem("userToken");
    navigate("/login");
  }

  function ProtectedRoute(props) {
    if (localStorage.getItem("userToken") === null) {
      return <Navigate to="/login" />;
    } else {
      return props.children;
    }
  }

  function RegisterationProtection(props) {
    if (localStorage.getItem("userToken") === null) {
      return props.children;
    } else {
      return <Navigate to="/home" />;
    }
  }

  return (
    <>
      <Navbar logOut={logOut} userData={userData} />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movie_details"
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            }
          >
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <MovieDetails />
                </ProtectedRoute>
              }
            ></Route>{" "}
            {/*nested routing for id as variable*/}
          </Route>
          <Route
            path="/person_details"
            element={
              <ProtectedRoute>
                <PersonDetails />
              </ProtectedRoute>
            }
          >
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <PersonDetails />
                </ProtectedRoute>
              }
            ></Route>{" "}
            {/*nested routing for id as variable*/}
          </Route>
          <Route
            path="/tvshow_details"
            element={
              <ProtectedRoute>
                <TvDetails />
              </ProtectedRoute>
            }
          >
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <TvDetails />
                </ProtectedRoute>
              }
            ></Route>{" "}
            {/*nested routing for id as variable*/}
          </Route>
          <Route
            path="/people"
            element={
              <ProtectedRoute>
                <People />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tvshow"
            element={
              <ProtectedRoute>
                <Tvshow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/networks"
            element={
              <ProtectedRoute>
                <Networks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/people"
            element={
              <ProtectedRoute>
                <People />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <RegisterationProtection>
                <Login saveUserData={saveUserData} />
              </RegisterationProtection>
            }
          />
          <Route
            path="/register"
            element={
              <RegisterationProtection>
                <Register />
              </RegisterationProtection>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchMovie />
              </ProtectedRoute>
            }
          >
            <Route
              path=":term"
              element={
                <ProtectedRoute>
                  <SearchMovie />
                </ProtectedRoute>
              }
            ></Route>{" "}
          </Route>
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
