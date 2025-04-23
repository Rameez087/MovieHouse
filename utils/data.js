import fs from 'fs';
import path from 'path';

// Path to JSON file
const dataFilePath = path.join(process.cwd(), 'movies.json');

// Function to get all data
export function getAllData() {
  const jsonData = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(jsonData);
}

// Get all movies
export function getAllMovies() {
  const data = getAllData();
  return data.movies;
}

// Get a single movie by ID
export function getMovieById(id) {
  const movies = getAllMovies();
  return movies.find(movie => movie.id === Number(id));
}

// Get trending movies (for example, highest rated)
export function getTrendingMovies() {
  const movies = getAllMovies();
  return movies.sort((a, b) => b.rating - a.rating).slice(0, 4);
}

// Get all genres
export function getAllGenres() {
  const data = getAllData();
  return data.genres;
}

// Get genre by ID
export function getGenreById(id) {
  const genres = getAllGenres();
  return genres.find(genre => genre.id === Number(id));
}

// Get movies by genre ID
export function getMoviesByGenre(genreId) {
  const movies = getAllMovies();
  return movies.filter(movie => movie.genreId === Number(genreId));
}

// Get all directors
export function getAllDirectors() {
  const data = getAllData();
  return data.directors;
}

// Get director by ID
export function getDirectorById(id) {
  const directors = getAllDirectors();
  return directors.find(director => director.id === Number(id));
}

// Get movies by director ID
export function getMoviesByDirector(directorId) {
  const movies = getAllMovies();
  return movies.filter(movie => movie.directorId === Number(directorId));
}