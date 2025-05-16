// pages/api/genres/[id]/movies.js
import connectDB from '../../../../utils/mongodb';
import Movie from '../../../../models/Movie';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    await connectDB();
    const movies = await Movie.find({ genreId: id })
      .populate('genreId', 'name')
      .populate('directorId', 'name');
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies by genre', error: error.message });
  }
}