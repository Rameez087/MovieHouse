import Link from 'next/link';
import Layout from '../../components/Layout';
import styles from '../../styles/Genres.module.css';

export default function Genres({ genres }) {
  return (
    <Layout title="Movie House - Genres">
      <div className={styles.container}>
        <h1>Movie Genres</h1>
        <div className={styles.genreGrid}>
          {genres.map(genre => (
            <Link href={`/genres/${genre._id}`} key={genre._id}>
              <div className={styles.genreCard}>
                <h2>{genre.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch('http://localhost:3000/api/genres');
    const genres = await res.json();

    return {
      props: {
        genres
      },
      revalidate: 5
    };
  } catch (error) {
    console.error('Error fetching genres:', error);
    return {
      props: {
        genres: []
      }
    };
  }
}