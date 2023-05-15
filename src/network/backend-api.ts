// import config, { Config } from "../config";
import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { Movie } from "../models/movie";
import { User } from "../models/user";
export interface MovieInput {
  title: string;
  director: string;
  yearReleased: number;
  actors: string[];
  genre: string;
  duration: number;
  language: string;
  poster: string;
  trailer: string;
  description: string;
}
export interface LoginCredentials {
  email: string;
  password: string;
}
export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${input}`, {
    ...init,
    credentials: "include",
  });
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    if (response.status === 401) {
      throw new UnauthorizedError(errorMessage);
    } else if (response.status === 409) {
      throw new ConflictError(errorMessage);
    } else {
      throw Error(
        "Request failed with status: " +
          response.status +
          " message: " +
          errorMessage
      );
    }
  }
}

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData("/users/me", { method: "GET" });
  return response.json();
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData("/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function logout() {
  await fetchData("/auth/logout", { method: "POST" });
}

export async function fetchMovies(): Promise<Movie[]> {
  const response = await fetchData("/movies/", { method: "GET" });
  const movies = await response.json();
  return movies.movies;
}
export async function fetchMovie(id: string): Promise<Movie> {
  const response = await fetchData(`/movies/${id}`, { method: "GET" });
  const movie = await response.json();
  return movie.movie;
}
export async function updateUserInfo(
  userId: string,
  updatedUser: Partial<User>
): Promise<User> {
  const response = await fetchData(`/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(updatedUser),
  });
  return response.json();
}

export async function deleteAccount(userId: string): Promise<void> {
  const response = await fetchData(`/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete user account.");
  }
}

export async function addMovie(movie: MovieInput): Promise<Movie> {
  const response = await fetchData("/movies/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });
  return response.json();
}

const API_BASE_URL = "http://localhost:8081/api/v1";
