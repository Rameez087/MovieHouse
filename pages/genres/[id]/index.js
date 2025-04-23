import Layout from '../../../components/Layout';
import MovieCard from '../../../components/MovieCard';
import { getGenreById, getMoviesByGenre } from '../../../utils/data';
import styles from '../../../styles/GenreDetail.module.css';

export default function GenreDetail({ genre, movies }) {
  if (!genre) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={`Movie House - ${genre.name} Movies`}>
      <h1 className={styles.title}>{genre.name} Movies</h1>
      
      <div className={styles.movieGrid}>
        {movies.length > 0 ? (
          movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p className={styles.noMovies}>No movies found in this genre.</p>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const genre = getGenreById(params.id);
  
  if (!genre) {
    return {
      notFound: true,
    };
  }
  
  const movies = getMoviesByGenre(genre.id);
  
  return {
    props: {
      genre,
      movies,
    },
  };
}