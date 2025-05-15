// pages/api/genres/index.js
import { getGenres } from '../../../utils/data';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const genres = getGenres();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching genres', error: error.message });
  }
}