import { User } from "../../models/user";
import { Movie } from "../../models/movie";
import styled from "styled-components";
import SliderComponent from "./Slider";
import MoviesList from "./MoviesList";

interface HomeProps {
  loggedInUser: User | null;
  movies: Movie[];
}

const HomePage: React.FC<HomeProps> = ({ loggedInUser, movies }) => {
  return (
    <Container>
      <SliderComponent movies={movies} />
      <MoviesList movies={movies} />
    </Container>
  );
};

export default HomePage;

const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  overflow-x: hidden;

  &:before {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
`;
