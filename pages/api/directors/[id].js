import { getDirectorById, getMoviesByDirector } from '../../../utils/data';

export default function handler(req, res) {
  const { id } = req.query;
  
  if (req.method === 'GET') {
    try {
      const director = getDirectorById(Number(id));
      
      if (!director) {
        return res.status(404).json({ error: 'Director not found' });
      }
      
      const movies = getMoviesByDirector(director.id);
      
      res.status(200).json({ director, movies });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch director data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}