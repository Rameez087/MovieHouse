// pages/api/directors/[id].js
import connectDB from '../../../utils/mongodb';
import Director from '../../../models/Director';
import Movie from '../../../models/Movie';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;
  console.log('Fetching director with ID:', id);

  try {
    await connectDB();
    
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('Invalid director ID format:', id);
      return res.status(400).json({ message: 'Invalid director ID format' });
    }
    
    const director = await Director.findById(id);
    console.log('Found director:', director);
    
    if (!director) {
      console.log('Director not found for ID:', id);
      return res.status(404).json({ message: 'Director not found' });
    }

    const movies = await Movie.find({ directorId: new mongoose.Types.ObjectId(id) })
      .populate('genreId', 'name')
      .populate('directorId', 'name');
    console.log('Found movies:', movies.length);

    res.status(200).json({
      ...director.toObject(),
      movies
    });
  } catch (error) {
    console.error('Error in director API:', error);
    res.status(500).json({ message: 'Error fetching director', error: error.message });
  }
}