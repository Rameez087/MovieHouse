import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/MovieCard.module.css';

export default function MovieCard({ movie }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <Image 
          src={`/images/movie-${movie.id % 5 + 1}.jpg`} 
          alt={movie.title}
          width={300}
          height={450}
          layout="responsive"
        />
      </div>
      <div className={styles.cardContent}>
        <h3>{movie.title}</h3>
        <p>{movie.releaseYear} • Rating: {movie.rating}/10</p>
        <Link href={`/movies/${movie.id}`}>
          View Details
        </Link>
      </div>
    </div>
  );
}