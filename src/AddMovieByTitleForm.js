import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Box} from '@mui/material';

const AddMovieByTitleForm = ({onMovieAdd}) => {
  const [movieData, setMovieData] = useState({
    year: '',
    type: 'movie',
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
        const response = await axios.post('http://localhost:4000/api/review/by-title', movieData);
      onMovieAdd(response.data); // Assuming the response data is the new movie object
      setMovieData({ title: '', year: '', myScore: '', myReview: '' }); // Reset form
    } catch (error) {
      console.error('Failed to add movie by title:', error);
      alert('Failed to add movie by title.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={movieData.title}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Year"
            name="year"
            value={movieData.year}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12}>
        <TextField
        fullWidth
        label="Your Review"
        name="myReview"
        multiline
        rows={4} // Adjust this number as needed
        variant="outlined"
        value={movieData.myReview}
        onChange={handleChange}
        required
        />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
           <Button type="submit" variant="contained" color="primary">
           Add Movie by Title
           </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddMovieByTitleForm;
