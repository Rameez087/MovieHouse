// pages/api/directors/index.js
import { directors } from '../../../data/mockData';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(directors);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}