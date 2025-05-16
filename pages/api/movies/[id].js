// pages/api/movies/[id].js
import connectDB from '../../../utils/mongodb';
import Movie from '../../../models/Movie';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    await connectDB();
    const movie = await Movie.findById(id)
      .populate('genreId', 'name')
      .populate('directorId', 'name');
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movie', error: error.message });
  }
}