import Link from 'next/link';
import Layout from '../../../components/Layout';
import MovieCard from '../../../components/MovieCard';
import styles from '../../../styles/DirectorDetail.module.css';

export default function DirectorDetail({ director, movies }) {
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
          <Link href="/directors">← Back to Directors</Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  console.log('Director detail page params:', params);
  
  if (!params?.id) {
    console.log('No director ID provided');
    return { notFound: true };
  }

  try {
    console.log('Fetching director with ID:', params.id);
    const res = await fetch(`http://localhost:3000/api/directors/${params.id}`);
    
    if (!res.ok) {
      console.log('Director not found, status:', res.status);
      return { notFound: true };
    }
    
    const director = await res.json();
    console.log('Fetched director:', director);

    return {
      props: {
        director,
        movies: director.movies || []
      }
    };
  } catch (error) {
    console.error('Error fetching director data:', error);
    return {
      notFound: true
    };
  }
} 