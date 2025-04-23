import Link from 'next/link';
import Layout from '../../../components/Layout';
import MovieCard from '../../../components/MovieCard';
import { getMovieById, getDirectorById, getMoviesByDirector } from '../../../utils/data';
import styles from '../../../styles/Director.module.css';

export default function MovieDirector({ movie, director, directedMovies }) {
  if (!movie || !director) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={`Movie House - ${director.name}`}>
      <div className={styles.backLink}>
        <Link href={`/movies/${movie.id}`}>
          <p>&larr; Back to {movie.title}</p>
        </Link>
      </div>
      
      <div className={styles.directorProfile}>
        <h1>{director.name}</h1>
        <div className={styles.biography}>
          <h2>Biography</h2>
          <p>{director.biography}</p>
        </div>
        
        <div className={styles.filmography}>
          <h2>Filmography</h2>
          <div className={styles.movieGrid}>
            {directedMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return { 
    paths: [], // No pre-rendered paths
    fallback: true // Generate on-demand
  };
}

export async function getStaticProps({ params }) {
  const movie = getMovieById(params.id);
  
  if (!movie) {
    return {
      notFound: true,
    };
  }
  
  const director = getDirectorById(movie.directorId);
  const directedMovies = getMoviesByDirector(director.id);
  
  return {
    props: {
      movie,
      director,
      directedMovies,
    },
    revalidate: 3600,
  };
}