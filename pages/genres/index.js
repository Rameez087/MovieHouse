import Link from 'next/link';
import Layout from '../../components/Layout';
import { getAllGenres } from '../../utils/data';
import styles from '../../styles/Genres.module.css';

export default function Genres({ genres }) {
  return (
    <Layout title="Movie House - Genres">
      <h1 className={styles.title}>Browse Movies by Genre</h1>
      
      <div className={styles.genreGrid}>
        {genres.map(genre => (
          <Link href={`/genres/${genre.id}`} key={genre.id}>
            <p className={styles.genreCard}>
              <h2>{genre.name}</h2>
              <span className={styles.arrow}>→</span>
            </p>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const genres = getAllGenres();
  
  return {
    props: {
      genres,
    },
  };
}