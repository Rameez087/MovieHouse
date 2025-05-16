import Link from 'next/link';
import Layout from '../../../components/Layout';
import MovieCard from '../../../components/MovieCard';
import styles from '../../../styles/GenreDetail.module.css';

export default function GenreDetail({ genre, movies }) {
  if (!genre) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={`Movie House - ${genre.name} Movies`}>
      <div className={styles.container}>
        <h1>{genre.name} Movies</h1>
        
        <div className={styles.movieGrid}>
          {movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>

        <div className={styles.backLink}>
          <Link href="/genres">← Back to Genres</Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const res = await fetch('http://localhost:3000/api/genres');
    const genres = await res.json();
    
    const paths = genres.map(genre => ({
      params: { id: genre._id.toString() }
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
    const [genreRes, moviesRes] = await Promise.all([
      fetch(`http://localhost:3000/api/genres/${params.id}`),
      fetch(`http://localhost:3000/api/genres/${params.id}/movies`)
    ]);

    const genre = await genreRes.json();
    const movies = await moviesRes.json();

    return {
      props: {
        genre,
        movies
      },
      revalidate: 5
    };
  } catch (error) {
    console.error('Error fetching genre data:', error);
    return {
      notFound: true
    };
  }
}