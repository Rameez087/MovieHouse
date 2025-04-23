import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import MovieCard from '../components/MovieCard';
import { getTrendingMovies } from '../utils/data';
import styles from '../styles/Home.module.css';

export default function Home({ trendingMovies }) {
  const router = useRouter();

  return (
    <Layout title="Movie House - Home">
      <div className={styles.hero}>
        <h1>Welcome to Movie House</h1>
        <p>Your ultimate movie browsing experience</p>
      </div>

      <section className={styles.section}>
        <h2>Trending Movies</h2>
        <div className={styles.movieGrid}>
          {trendingMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className={styles.browseSection}>
        <h2>Explore Our Collection</h2>
        <button 
          className={styles.browseButton}
          onClick={() => router.push('/genres')}
        >
          Browse Genres
        </button>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const trendingMovies = getTrendingMovies();
  
  return {
    props: {
      trendingMovies,
    },
    // Revalidate every hour
    revalidate: 3600,
  };
}