import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this movie'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this movie']
  },
  releaseYear: {
    type: Number,
    required: [true, 'Please provide a release year']
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: [0, 'Rating must be at least 0'],
    max: [10, 'Rating cannot be more than 10']
  },
  genreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
    required: [true, 'Please provide a genre']
  },
  directorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Director',
    required: [true, 'Please provide a director']
  }
}, {
  timestamps: true
});

export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema); 