import Link from 'next/link';
import Layout from '../components/Layout';
import MovieCard from '../components/MovieCard';
import styles from '../styles/Home.module.css';

export default function Home({ trendingMovies }) {
  return (
    <Layout title="Movie House - Home">
      <div className={styles.container}>
        <h1>Welcome to Movie House</h1>
        <h2>Trending Movies</h2>
        <div className={styles.movieGrid}>
          {trendingMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('http://localhost:3000/api/movies');
    const movies = await res.json();
    
    // Sort by rating and get top 4
    const trendingMovies = movies
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);

    return {
      props: {
        trendingMovies
      },
      revalidate: 5
    };
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return {
      props: {
        trendingMovies: []
      }
    };
  }
}