// pages/api/movies/index.js
import connectDB from '../../../utils/mongodb';
import Movie from '../../../models/Movie';

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const movies = await Movie.find({})
          .populate('genreId', 'name')
          .populate('directorId', 'name');
        res.status(200).json(movies);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching movies', error: error.message });
      }
      break;

    case 'POST':
      try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
      } catch (error) {
        res.status(400).json({ message: 'Error creating movie', error: error.message });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}