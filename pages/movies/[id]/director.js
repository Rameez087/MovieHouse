import Link from 'next/link';
import Layout from '../../../components/Layout';
import MovieCard from '../../../components/MovieCard';
import styles from '../../../styles/DirectorDetail.module.css';

export default function DirectorDetail({ director, movies, movieId }) {
  if (!director) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={`Movie House - ${director.name}`}>
      <div className={styles.container}>
        <div className={styles.directorInfo}>
          <h1>{director.name}</h1>
          <p className={styles.bio}>{director.bio}</p>
        </div>

        <div className={styles.moviesSection}>
          <h2>Movies Directed</h2>
          <div className={styles.movieGrid}>
            {movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        </div>

        <div className={styles.backLink}>
          <Link href={`/movies/${movieId}`}>← Back to Movie</Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const res = await fetch('http://localhost:3000/api/movies');
    const movies = await res.json();
    
    const paths = movies.map(movie => ({
      params: { id: movie._id.toString() }
    }));
    
    return { 
      paths, 
      fallback: true
    };
  } catch (error) {
    console.error('Error generating paths:', error);
    return {
      paths: [],
      fallback: true
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    // First get the movie to get the director ID
    const movieRes = await fetch(`http://localhost:3000/api/movies/${params.id}`);
    const movie = await movieRes.json();

    if (!movie || !movie.directorId) {
      return { notFound: true };
    }

    // Then get the director and their movies
    const directorRes = await fetch(`http://localhost:3000/api/directors/${movie.directorId._id}`);
    const director = await directorRes.json();

    return {
      props: {
        director,
        movies: director.movies || [],
        movieId: params.id
      },
      revalidate: 5
    };
  } catch (error) {
    console.error('Error fetching director data:', error);
    return {
      notFound: true
    };
  }
}