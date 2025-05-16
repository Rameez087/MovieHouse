// pages/api/directors/index.js
import connectDB from '../../../utils/mongodb';
import Director from '../../../models/Director';
import Movie from '../../../models/Movie';

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        console.log('Fetching all directors...');
        const directors = await Director.find({});
        console.log('Found directors:', directors.map(d => ({ id: d._id, name: d.name })));
        
        // Get movie counts for each director
        const directorsWithCounts = await Promise.all(
          directors.map(async (director) => {
            const movieCount = await Movie.countDocuments({ directorId: director._id });
            const directorObj = director.toObject();
            console.log('Director with count:', { id: directorObj._id, name: directorObj.name, movieCount });
            return {
              ...directorObj,
              movieCount
            };
          })
        );

        console.log('Returning directors with counts:', directorsWithCounts.length);
        res.status(200).json(directorsWithCounts);
      } catch (error) {
        console.error('Error fetching directors:', error);
        res.status(500).json({ message: 'Error fetching directors', error: error.message });
      }
      break;

    case 'POST':
      try {
        const director = await Director.create(req.body);
        res.status(201).json(director);
      } catch (error) {
        res.status(400).json({ message: 'Error creating director', error: error.message });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}