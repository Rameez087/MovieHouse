import connectDB from '../../../../utils/mongodb';
import Genre from '../../../../models/Genre';

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const genre = await Genre.findById(id);
        
        if (!genre) {
          return res.status(404).json({ message: 'Genre not found' });
        }

        res.status(200).json(genre);
      } catch (error) {
        console.error('Error fetching genre:', error);
        res.status(500).json({ message: 'Error fetching genre', error: error.message });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
} 