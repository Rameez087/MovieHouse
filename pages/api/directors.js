import { getAllDirectors, getMoviesByDirector } from '../../utils/data';

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const directors = getAllDirectors();
      
      // Add movie count for each director
      const directorsWithMovieCount = directors.map(director => {
        const movies = getMoviesByDirector(director.id);
        return {
          ...director,
          movieCount: movies.length
        };
      });
      
      res.status(200).json(directorsWithMovieCount);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch directors' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}