import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import MovieCard from '../../components/MovieCard';
import styles from '../../styles/DirectorDetail.module.css';

export default function DirectorDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  const [director, setDirector] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    
    const fetchDirectorData = async () => {
      try {
        const response = await fetch(`/api/directors/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch director data');
        }
        const data = await response.json();
        setDirector(data.director);
        setMovies(data.movies);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDirectorData();
  }, [id]);

  if (loading) return (
    <Layout title="Movie House - Director">
      <div className={styles.loading}>Loading director information...</div>
    </Layout>
  );

  if (error) return (
    <Layout title="Movie House - Director">
      <div className={styles.error}>Error: {error}</div>
    </Layout>
  );

  if (!director) return (
    <Layout title="Movie House - Director Not Found">
      <div className={styles.notFound}>Director not found</div>
    </Layout>
  );

  return (
    <Layout title={`Movie House - ${director.name}`}>
      <div className={styles.directorProfile}>
        <h1 className={styles.name}>{director.name}</h1>
        
        <div className={styles.biography}>
          <h2>Biography</h2>
          <p>{director.biography}</p>
        </div>
        
        <div className={styles.filmography}>
          <h2>Filmography</h2>
          {movies.length > 0 ? (
            <div className={styles.movieGrid}>
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <p className={styles.noMovies}>No movies found for this director.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}