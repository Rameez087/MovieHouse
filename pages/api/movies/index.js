// pages/api/movies/index.js
import { connectToDatabase } from '../../../utils/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET':
      try {
        const movies = await db.collection('movies').find({}).toArray();
        
        // Get genre and director details for each movie
        const moviesWithDetails = await Promise.all(movies.map(async (movie) => {
          const [genre, director] = await Promise.all([
            db.collection('genres').findOne({ _id: movie.genreId }),
            db.collection('directors').findOne({ _id: movie.directorId })
          ]);

          return {
            ...movie,
            genreId: { _id: genre._id, name: genre.name },
            directorId: { _id: director._id, name: director.name }
          };
        }));

        res.status(200).json(moviesWithDetails);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching movies', error: error.message });
      }
      break;

    case 'POST':
      try {
        const result = await db.collection('movies').insertOne(req.body);
        res.status(201).json(result);
      } catch (error) {
        res.status(400).json({ message: 'Error creating movie', error: error.message });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}