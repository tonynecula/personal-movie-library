import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import { Movie } from "../models/movie";
import { User } from "../models/user";
import Login from "../components/Login";
import MovieScreen from "../components/Movie";
import MyProfile from "../components/MyProfile";

interface AppRoutesProps {
  loggedInUser: User | null;
  movies: Movie[];
}

const AppRoutes: React.FC<AppRoutesProps> = ({ loggedInUser, movies }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home loggedInUser={loggedInUser} movies={movies} />}
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/my_profile"
        element={<MyProfile loggedInUser={loggedInUser} />}
      />
      <Route path="/movie/:movieid" element={<MovieScreen />} />
    </Routes>
  );
};

export default AppRoutes;
