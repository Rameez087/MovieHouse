import { connectToDatabase } from '../../../utils/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET':
      try {
        const genres = await db.collection('genres').find({}).toArray();
        res.status(200).json(genres);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching genres', error: error.message });
      }
      break;

    case 'POST':
      try {
        const result = await db.collection('genres').insertOne(req.body);
        res.status(201).json(result);
      } catch (error) {
        res.status(400).json({ message: 'Error creating genre', error: error.message });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}