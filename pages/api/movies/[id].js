// pages/api/movies/[id].js
import { movies } from '../../../data/mockData';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    const movie = movies.find(m => m.id === parseInt(id));
    
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: `Movie with ID ${id} not found` });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}