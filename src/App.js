import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, Box } from '@mui/material'; // Import Typography and Box
import Movie from './Movie';
import AddMovieForm from './AddMovieForm';
import AddMovieByTitleForm from './AddMovieByTitleForm';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [showFormByTitle, setShowFormByTitle] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/movies');
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const onMovieDelete = (imdbID) => {
    setMovies(movies.filter(movie => movie.imdbID !== imdbID));
  };

  const onMovieEdit = (imdbID, updatedFields) => {
    setMovies(movies.map(movie => {
      if (movie.imdbID === imdbID) {
        return { ...movie, ...updatedFields };
      }
      return movie;
    }));
  };

  const onMovieAdd = (newMovie) => {
    setMovies((prevMovies) => {
      // Check if the movie already exists based on imdbID
      const exists = prevMovies.some(movie => movie.imdbID === newMovie.imdbID);
      if (!exists) {
        // If the movie does not exist, add it to the list
        return [...prevMovies, newMovie];
      }
      alert('Movie already exists.');
      return prevMovies; // Return the original list without changes
    });
  };

  return (
    <div style={{ flexGrow: 1, padding: 20 }}>
      <Box display="flex" flexDirection="column" alignItems="center" marginBottom={4}>
        <Typography variant="h2" align="center" gutterBottom>
          Movie Reviewer
        </Typography>
        <Box display="flex" justifyContent="center" marginBottom={2}>
          <Typography variant="button" onClick={() => setShowFormByTitle(!showFormByTitle)} style={{ cursor: 'pointer', padding: '8px', backgroundColor: '#1976d2', color: 'white', borderRadius: '4px' }}>
            {showFormByTitle ? "Switch to Add by ID" : "Switch to Add by Title"}
          </Typography>
        </Box>
        {showFormByTitle ? <AddMovieByTitleForm onMovieAdd={onMovieAdd} /> : <AddMovieForm onMovieAdd={onMovieAdd} />}
      </Box>
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
            <Movie movie={movie} onMovieDelete={onMovieDelete} onMovieEdit={onMovieEdit} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default App;
