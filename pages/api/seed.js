import connectDB from '../../utils/mongodb';
import Movie from '../../models/Movie';
import Genre from '../../models/Genre';
import Director from '../../models/Director';
import { getAllData } from '../../utils/data';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Test MongoDB connection
    console.log('Testing MongoDB connection...');
    const mongoose = await connectDB();
    const db = mongoose.connection.db;
    
    // Test data reading
    console.log('Reading data from JSON file...');
    let data;
    try {
      data = getAllData();
      console.log('Data structure:', {
        hasMovies: !!data.movies,
        hasGenres: !!data.genres,
        hasDirectors: !!data.directors,
        moviesCount: data.movies?.length,
        genresCount: data.genres?.length,
        directorsCount: data.directors?.length
      });
    } catch (error) {
      console.error('Error reading data:', error);
      throw new Error(`Failed to read data: ${error.message}`);
    }

    // Clear existing data
    console.log('Clearing existing data...');
    try {
      await Movie.deleteMany({});
      await Genre.deleteMany({});
      await Director.deleteMany({});
      console.log('Existing data cleared successfully');
    } catch (error) {
      console.error('Error clearing data:', error);
      throw new Error(`Failed to clear existing data: ${error.message}`);
    }

    // Transform directors
    console.log('Transforming directors data...');
    const transformedDirectors = data.directors.map(director => ({
      name: director.name,
      bio: director.biography
    }));
    console.log('Sample director:', transformedDirectors[0]);

    // Insert genres
    console.log('Inserting genres...');
    let genres;
    try {
      genres = await Genre.insertMany(data.genres);
      console.log('Genres inserted successfully:', genres.length);
      console.log('Sample genre:', genres[0]);
    } catch (error) {
      console.error('Error inserting genres:', error);
      throw new Error(`Failed to insert genres: ${error.message}`);
    }

    // Insert directors
    console.log('Inserting directors...');
    let directors;
    try {
      directors = await Director.insertMany(transformedDirectors);
      console.log('Directors inserted successfully:', directors.length);
      console.log('Sample director:', directors[0]);
    } catch (error) {
      console.error('Error inserting directors:', error);
      throw new Error(`Failed to insert directors: ${error.message}`);
    }

    // Create ID maps
    const genreMap = {};
    const directorMap = {};

    genres.forEach(genre => {
      genreMap[genre.name] = genre._id;
    });

    directors.forEach(director => {
      directorMap[director.name] = director._id;
    });

    // Transform movies
    console.log('Transforming movies data...');
    const movies = data.movies.map(movie => {
      const genre = data.genres.find(g => g.id === movie.genreId);
      const director = data.directors.find(d => d.id === movie.directorId);
      
      if (!genre || !director) {
        console.error('Missing reference:', { movie, genre, director });
        throw new Error(`Missing reference for movie ${movie.title}`);
      }

      return {
        title: movie.title,
        description: movie.description,
        releaseYear: movie.releaseYear,
        rating: movie.rating,
        genreId: genreMap[genre.name],
        directorId: directorMap[director.name]
      };
    });
    console.log('Sample movie:', movies[0]);

    // Insert movies
    console.log('Inserting movies...');
    let insertedMovies;
    try {
      insertedMovies = await Movie.insertMany(movies);
      console.log('Movies inserted successfully:', insertedMovies.length);
      console.log('Sample movie:', insertedMovies[0]);
    } catch (error) {
      console.error('Error inserting movies:', error);
      throw new Error(`Failed to insert movies: ${error.message}`);
    }

    // Verify data in database
    console.log('Verifying data in database...');
    const dbGenres = await Genre.find({});
    const dbDirectors = await Director.find({});
    const dbMovies = await Movie.find({});

    console.log('Database verification:', {
      genres: dbGenres.length,
      directors: dbDirectors.length,
      movies: dbMovies.length
    });

    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));

    res.status(200).json({ 
      message: 'Database seeded successfully',
      stats: {
        genres: genres.length,
        directors: directors.length,
        movies: insertedMovies.length
      },
      verification: {
        dbGenres: dbGenres.length,
        dbDirectors: dbDirectors.length,
        dbMovies: dbMovies.length,
        collections: collections.map(c => c.name)
      }
    });
  } catch (error) {
    console.error('Error in seed process:', error);
    res.status(500).json({ 
      message: 'Error seeding database', 
      error: error.message,
      stack: error.stack
    });
  }
} 