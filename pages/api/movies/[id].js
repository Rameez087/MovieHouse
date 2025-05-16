// pages/api/movies/[id].js
import { connectToDatabase } from '../../../utils/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET':
      try {
        const movie = await db.collection('movies').findOne({ _id: new ObjectId(id) });
        
        if (!movie) {
          return res.status(404).json({ message: 'Movie not found' });
        }

        // Get genre and director details
        const [genre, director] = await Promise.all([
          db.collection('genres').findOne({ _id: movie.genreId }),
          db.collection('directors').findOne({ _id: movie.directorId })
        ]);

        const movieWithDetails = {
          ...movie,
          genreId: { _id: genre._id, name: genre.name },
          directorId: { _id: director._id, name: director.name }
        };

        res.status(200).json(movieWithDetails);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching movie', error: error.message });
      }
      break;

    case 'PUT':
      try {
        const result = await db.collection('movies').updateOne(
          { _id: new ObjectId(id) },
          { $set: req.body }
        );
        
        if (result.matchedCount === 0) {
          return res.status(404).json({ message: 'Movie not found' });
        }
        
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ message: 'Error updating movie', error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const result = await db.collection('movies').deleteOne({ _id: new ObjectId(id) });
        
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Movie not found' });
        }
        
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ message: 'Error deleting movie', error: error.message });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}