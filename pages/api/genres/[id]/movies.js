// pages/api/genres/[id]/movies.js
import { getMoviesByGenre } from '../../../../utils/data';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    const movies = getMoviesByGenre(id);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies by genre', error: error.message });
  }
}