import Head from 'next/head';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';

export default function Layout({ children, title = 'Movie House' }) {
  const { darkMode } = useTheme();
  return (
   <div className={`app-container ${darkMode ? 'dark-theme' : 'light-theme'}`}>

    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Movie House - Browse and discover movies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-blue-800 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">Movie House</Link>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href="/" className="hover:text-blue-200">Home</Link>
                </li>
                <li>
                  <Link href="/movies" className="hover:text-blue-200">Movies</Link>
                </li>
                <li>
                  <Link href="/genres" className="hover:text-blue-200">Genres</Link>
                </li>
                <li>
                  <Link href="/directors" className="hover:text-blue-200">Directors</Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-blue-200">Help</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Movie House. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <Link href="/help/privacy" className="text-gray-300 hover:text-white mr-4">
                Privacy Policy
              </Link>
              <Link href="/help/contact" className="text-gray-300 hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </div>
  );
}