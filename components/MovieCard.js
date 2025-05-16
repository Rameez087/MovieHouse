import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/MovieCard.module.css';

export default function MovieCard({ movie }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img 
          src={`/images/movie-${movie._id}.jpg`}
          alt={movie.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div className={styles.cardContent}>
        <h3>{movie.title}</h3>
        <p>{movie.releaseYear} • Rating: {movie.rating}/10</p>
        <Link href={`/movies/${movie._id}`}>
          View Details
        </Link>
      </div>
    </div>
  );
}