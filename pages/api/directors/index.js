// pages/api/directors/index.js
import { getAllDirectors, getAllMovies } from '../../../utils/data';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const directors = getAllDirectors();
    const movies = getAllMovies();
    
    // Add movie count to each director
    const directorsWithMovieCount = directors.map(director => ({
      ...director,
      movieCount: movies.filter(movie => movie.directorId === director.id).length
    }));

    res.status(200).json(directorsWithMovieCount);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching directors', error: error.message });
  }
}