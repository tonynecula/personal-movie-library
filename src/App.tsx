import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes";
import * as BackendApi from "./network/backend-api";
import { Movie } from "./models/movie";
import "./App.css";
function App() {
  // const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const loggedInUser = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser") as string)
    : null;

  useEffect(() => {
    async function fetchMovies() {
      try {
        const movies = await BackendApi.fetchMovies();
        setMovies(movies);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <BrowserRouter>
      <Header loggedInUser={loggedInUser} />
      <Container>
        <AppRoutes loggedInUser={loggedInUser} movies={movies} />
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
