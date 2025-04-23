import { useState } from 'react';
import Layout from '../../components/Layout';
import MovieCard from '../../components/MovieCard';
import { getAllMovies, getAllGenres } from '../../utils/data';
import styles from '../../styles/Movies.module.css';

export default function Movies({ movies, genres }) {
  const [selectedGenre, setSelectedGenre] = useState('all');
  
  const filteredMovies = selectedGenre === 'all' 
    ? movies
    : movies.filter(movie => movie.genreId === parseInt(selectedGenre));

  return (
    <Layout title="Movie House - All Movies">
      <h1 className={styles.title}>All Movies</h1>
      
      <div className={styles.filterContainer}>
        <label htmlFor="genreFilter" className={styles.filterLabel}>
          Filter by Genre:
        </label>
        <select 
          id="genreFilter"
          className={styles.selectFilter}
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="all">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.movieGrid}>
        {filteredMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const movies = getAllMovies();
  const genres = getAllGenres();
  
  return {
    props: {
      movies,
      genres,
    },
    revalidate: 5, // Revalidate every hour
  };
}