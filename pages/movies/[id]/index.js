import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../../components/Layout';
import { getAllMovies, getMovieById, getGenreById, getDirectorById } from '../../../utils/data';
import styles from '../../../styles/MovieDetail.module.css';

export default function MovieDetail({ movie, genre, director }) {
  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={`Movie House - ${movie.title}`}>
      <div className={styles.movieDetail}>
        <div className={styles.posterContainer}>
          <Image 
            src={`/images/movie-${movie.id % 5 + 1}.jpg`}
            alt={movie.title}
            width={300}
            height={450}
            layout="responsive"
          />
        </div>
        
        <div className={styles.movieInfo}>
          <h1>{movie.title}</h1>
          <div className={styles.meta}>
            <span>{movie.releaseYear}</span>
            <span className={styles.rating}>Rating: {movie.rating}/10</span>
            <span className={styles.genre}>
              Genre: <Link href={`/genres/${genre.id}`}><p>{genre.name}</p></Link>
            </span>
          </div>
          
          <div className={styles.director}>
            <h3>Director:</h3>
            <Link href={`/movies/${movie.id}/director`}>
              <p className={styles.directorLink}>{director.name}</p>
            </Link>
          </div>
          
          <div className={styles.description}>
            <h3>Synopsis:</h3>
            <p>{movie.description}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const movies = getAllMovies();
  
  const paths = movies.map(movie => ({
    params: { id: movie.id.toString() }
  }));
  
  return { 
    paths, 
    fallback: true // Enable fallback for movies not in the paths
  };
}

export async function getStaticProps({ params }) {
  console.log(`movie id is: ${params.id}`)
  const movie = getMovieById(params.id);
  
  // If movie doesn't exist, return 404
  if (!movie) {
    return {
      notFound: true,
    };
  }
  
  const genre = getGenreById(movie.genreId);
  const director = getDirectorById(movie.directorId);
  
  return {
    props: {
      movie,
      genre,
      director,
    },
    revalidate: 5, // Revalidate every hour
  };
}