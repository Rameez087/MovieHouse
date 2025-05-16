// pages/api/directors/index.js
import { connectToDatabase } from '../../../utils/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET':
      try {
        console.log('Fetching all directors...');
        const directors = await db.collection('directors').find({}).toArray();
        console.log('Found directors:', directors.map(d => ({ id: d._id, name: d.name })));
        
        // Get movie counts for each director
        const directorsWithCounts = await Promise.all(
          directors.map(async (director) => {
            const movieCount = await db.collection('movies').countDocuments({ 
              directorId: new ObjectId(director._id) 
            });
            const directorObj = director;
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
        const result = await db.collection('directors').insertOne(req.body);
        res.status(201).json(result);
      } catch (error) {
        res.status(400).json({ message: 'Error creating director', error: error.message });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}