import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import styles from '../../styles/Directors.module.css';

export default function Directors() {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const response = await fetch('/api/directors');
        if (!response.ok) {
          throw new Error('Failed to fetch directors');
        }
        const data = await response.json();
        console.log('Fetched directors:', data);
        setDirectors(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching directors:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDirectors();
  }, []);

  if (loading) return (
    <Layout title="Movie House - Directors">
      <div className={styles.loading}>Loading directors...</div>
    </Layout>
  );

  if (error) return (
    <Layout title="Movie House - Directors">
      <div className={styles.error}>Error: {error}</div>
    </Layout>
  );

  return (
    <Layout title="Movie House - Directors">
      <h1 className={styles.title}>Directors</h1>
      
      <div className={styles.directorsGrid}>
        {directors.map(director => {
          console.log('Rendering director:', director);
          const directorId = director._id?.toString();
          console.log('Director ID for link:', directorId);
          
          return (
            <div key={directorId} className={styles.directorCard}>
              <h2>{director.name}</h2>
              <p className={styles.bio}>{director.bio}</p>
              <div className={styles.movieCount}>
                <span>Movies in database: {director.movieCount || 0}</span>
              </div>
              <Link href={`/directors/${directorId}`}>
                <p className={styles.viewMoviesButton}>View Movies</p>
              </Link>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}