import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../../components/Layout';
import styles from '../../../styles/MovieDetail.module.css';

export default function MovieDetail({ movie }) {
  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={`Movie House - ${movie.title}`}>
      <div className={styles.movieDetail}>
        <div className={styles.posterContainer}>
          <img 
            src={`/images/movie-${movie._id}.jpg`}
            alt={movie.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        
        <div className={styles.movieInfo}>
          <h1>{movie.title}</h1>
          <div className={styles.meta}>
            <span>{movie.releaseYear}</span>
            <span className={styles.rating}>Rating: {movie.rating}/10</span>
            <span className={styles.genre}>
              Genre: <Link href={`/genres/${movie.genreId._id}`}><p>{movie.genreId.name}</p></Link>
            </span>
          </div>
          
          <div className={styles.director}>
            <h3>Director:</h3>
            <Link href={`/movies/${movie._id}/director`}>
              <p className={styles.directorLink}>{movie.directorId.name}</p>
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
  const res = await fetch('http://localhost:3000/api/movies');
  const movies = await res.json();
  
  const paths = movies.map(movie => ({
    params: { id: movie._id.toString() }
  }));
  
  return { 
    paths, 
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`http://localhost:3000/api/movies/${params.id}`);
    const movie = await res.json();
    
    return {
      props: {
        movie
      },
      revalidate: 5
    };
  } catch (error) {
    console.error('Error fetching movie:', error);
    return {
      notFound: true
    };
  }
}