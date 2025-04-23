import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../styles/404.module.css';

export default function Custom404() {
  return (
    <Layout title="Movie House - Page Not Found">
      <div className={styles.notFoundContainer}>
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you're looking for does not exist.</p>
        <p>It might have been moved or deleted.</p>
        
        <Link href="/">
          <p className={styles.homeButton}>Go Home</p>
        </Link>
      </div>
    </Layout>
  );
}