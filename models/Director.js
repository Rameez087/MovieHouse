import mongoose from 'mongoose';

const DirectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this director'],
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  bio: {
    type: String,
    required: [true, 'Please provide a bio for this director']
  }
}, {
  timestamps: true
});

export default mongoose.models.Director || mongoose.model('Director', DirectorSchema); 