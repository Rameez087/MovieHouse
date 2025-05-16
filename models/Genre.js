import mongoose from 'mongoose';

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this genre'],
    unique: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  }
}, {
  timestamps: true
});

export default mongoose.models.Genre || mongoose.model('Genre', GenreSchema); 