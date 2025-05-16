import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import MovieCard from '../../components/MovieCard';
import styles from '../../styles/Movies.module.css';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, genresRes] = await Promise.all([
          fetch('/api/movies'),
          fetch('/api/genres')
        ]);

        if (!moviesRes.ok || !genresRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [moviesData, genresData] = await Promise.all([
          moviesRes.json(),
          genresRes.json()
        ]);

        setMovies(moviesData);
        setGenres(genresData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredMovies = selectedGenre === 'all' 
    ? movies 
    : movies.filter(movie => movie.genreId._id === selectedGenre);

  if (loading) return (
    <Layout title="Movie House - Movies">
      <div className={styles.loading}>Loading movies...</div>
    </Layout>
  );

  if (error) return (
    <Layout title="Movie House - Movies">
      <div className={styles.error}>Error: {error}</div>
    </Layout>
  );

  return (
    <Layout title="Movie House - Movies">
      <div className={styles.container}>
        <div className={styles.filterSection}>
          <h2>Filter by Genre</h2>
          <select 
            className={styles.genreSelect}
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="all">All Genres</option>
            {genres.map(genre => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.moviesGrid}>
          {filteredMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const [moviesRes, genresRes] = await Promise.all([
      fetch('http://localhost:3000/api/movies'),
      fetch('http://localhost:3000/api/genres')
    ]);

    const movies = await moviesRes.json();
    const genres = await genresRes.json();

    return {
      props: {
        movies,
        genres
      },
      revalidate: 5
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        movies: [],
        genres: []
      }
    };
  }
}