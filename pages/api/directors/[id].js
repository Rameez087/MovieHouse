// pages/api/directors/[id].js
import { getDirectorById } from '../../../utils/data';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    const director = getDirectorById(id);
    if (!director) {
      return res.status(404).json({ message: 'Director not found' });
    }
    res.status(200).json(director);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching director', error: error.message });
  }
}