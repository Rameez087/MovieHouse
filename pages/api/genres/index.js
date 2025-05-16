// pages/api/genres/index.js
import connectDB from '../../../utils/mongodb';
import Genre from '../../../models/Genre';

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const genres = await Genre.find({});
        res.status(200).json(genres);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching genres', error: error.message });
      }
      break;

    case 'POST':
      try {
        const genre = await Genre.create(req.body);
        res.status(201).json(genre);
      } catch (error) {
        res.status(400).json({ message: 'Error creating genre', error: error.message });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}