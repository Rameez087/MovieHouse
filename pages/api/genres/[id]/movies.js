// pages/api/genres/[id]/movies.js
import { movies } from '../../../../data/mockData';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const genreId = parseInt(id);
    
    // Filter movies by genre ID
    const filteredMovies = movies.filter(movie => 
      movie.genreIds.includes(genreId)
    );
    
    if (filteredMovies.length > 0) {
      res.status(200).json(filteredMovies);
    } else {
      res.status(200).json([]);
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}