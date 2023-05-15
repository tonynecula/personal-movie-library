import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Movie as MovieType } from "../../models/movie";
import * as BackendApi from "../../network/backend-api";
import MovieDetails from "./movie-details";
import ScreeningDetails from "./screening-details";

const MovieScreen: React.FC = () => {
  const { movieid } = useParams<{ movieid: string }>();
  const [movie, setMovie] = useState<MovieType | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const fetchedMovie = await BackendApi.fetchMovie(movieid!);
        console.log(fetchedMovie);
        setMovie(fetchedMovie);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [movieid]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <MovieDetails movie={movie} />
      <ScreeningDetails movie={movie} />
    </Container>
  );
};

export default MovieScreen;

const Container = styled.div`
  min-height: calc(100vh - 160px);
  padding: 0 calc(3.5vw + 5px);
`;
