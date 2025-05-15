// pages/api/directors/index.js
import { getDirectors } from '../../../utils/data';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const directors = getDirectors();
    res.status(200).json(directors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching directors', error: error.message });
  }
}