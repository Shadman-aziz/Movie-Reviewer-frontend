import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Box } from '@mui/material';

const AddMovieForm = ({onMovieAdd}) => {
  const [movieData, setMovieData] = useState({
    id: '',
    myScore: '',
    myReview: '',
  });

  const handleChange = (event) => {
    setMovieData({
      ...movieData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/review/by-id', movieData);
      onMovieAdd(response.data); // Assuming the response data is the new movie object
      setMovieData({ id: '', myScore: '', myReview: '' }); // Reset form
    } catch (error) {
      console.error('Failed to add movie:', error);
      alert('Failed to add movie.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Movie ID"
            name="id"
            value={movieData.id}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Your Score"
            name="myScore"
            type="number"
            value={movieData.myScore}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        <TextField
        fullWidth
        label="Your Review"
        name="myReview"
        multiline
        rows={4}
        variant="outlined"
        value={movieData.myReview}
        onChange={handleChange}
        required
        />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box display="flex" justifyContent="center">
            <Button type="submit" variant="contained" color="primary">
             Add Movie
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddMovieForm;
