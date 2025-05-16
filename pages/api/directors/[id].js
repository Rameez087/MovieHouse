// pages/api/directors/[id].js
import { connectToDatabase } from '../../../utils/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET':
      try {
        const director = await db.collection('directors').findOne({ _id: new ObjectId(id) });
        
        if (!director) {
          return res.status(404).json({ message: 'Director not found' });
        }

        // Get all movies for this director with their genre details
        const movies = await db.collection('movies')
          .find({ directorId: new ObjectId(id) })
          .toArray();

        // Get genre details for each movie
        const moviesWithDetails = await Promise.all(movies.map(async (movie) => {
          const genre = await db.collection('genres').findOne({ _id: movie.genreId });
          return {
            ...movie,
            genreId: { _id: genre._id, name: genre.name }
          };
        }));

        const directorWithMovies = {
          ...director,
          movies: moviesWithDetails,
          movieCount: moviesWithDetails.length
        };

        res.status(200).json(directorWithMovies);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching director', error: error.message });
      }
      break;

    case 'PUT':
      try {
        const result = await db.collection('directors').updateOne(
          { _id: new ObjectId(id) },
          { $set: req.body }
        );
        
        if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'Director not found' });
        }
        
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ message: 'Error updating director', error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const result = await db.collection('directors').deleteOne({ _id: new ObjectId(id) });
        
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Director not found' });
        }
        
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ message: 'Error deleting director', error: error.message });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}