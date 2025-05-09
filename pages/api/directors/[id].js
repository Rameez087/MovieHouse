// pages/api/directors/[id].js
import { directors, movies } from '../../../data/mockData';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const directorId = parseInt(id);
    
    // Find the director
    const director = directors.find(d => d.id === directorId);
    
    if (director) {
      // Find all movies by this director
      const directorMovies = movies.filter(movie => movie.directorId === directorId);
      
      // Return director info with their movies
      res.status(200).json({
        ...director,
        movies: directorMovies
      });
    } else {
      res.status(404).json({ message: `Director with ID ${id} not found` });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}