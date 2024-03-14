import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, TextField, Button, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Movie = ({ movie, onMovieDelete, onMovieEdit }) => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedMovie, setEditedMovie] = useState({
    myScore: movie.myScore,
    myReview: movie.myReview,
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
  };

  const handleDelete = async (event) => {
    event.stopPropagation();
    try {
      await axios.delete(`http://localhost:4000/api/movies/${movie.imdbID}`);
      onMovieDelete(movie.imdbID);
    } catch (error) {
      console.error('Failed to delete movie:', error);
      alert('Failed to delete the movie.');
    }
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const updatedFields = {
        myScore: editedMovie.myScore,
        myReview: editedMovie.myReview,
      };
      await axios.patch(`http://localhost:4000/api/movies/${movie.imdbID}`, updatedFields);
      alert('Movie updated successfully!');
      onMovieEdit(movie.imdbID, updatedFields); // Update local state
      handleClose(); // Close the dialog
    } catch (error) {
      console.error('Failed to update movie:', error);
      alert('Failed to update the movie.');
    }
  };

  const handleChange = (event) => {
    setEditedMovie({ ...editedMovie, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Card sx={{ minWidth: 275, position: 'relative', marginBottom: 2, cursor: 'pointer' }} onClick={handleClickOpen}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {movie.Title} ({movie.Year})
          </Typography>
          <Typography variant="body2">
          Rating: {movie.imdbRating}
        </Typography>
        <Typography variant="body2">
          Score: {movie.myScore}
        </Typography>
        <Typography variant="body2">
          Review: {movie.myReview}
        </Typography>
          <IconButton aria-label="delete" onClick={handleDelete} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <DeleteIcon />
          </IconButton>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} aria-labelledby="movie-dialog-title" fullWidth maxWidth="md">
        <DialogTitle id="movie-dialog-title">{movie.Title}</DialogTitle>
        <DialogContent>
          {editMode ? (
            <>
              <TextField
                margin="dense"
                name="myScore"
                label="Your Score"
                type="number"
                fullWidth
                variant="outlined"
                value={editedMovie.myScore}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="myReview"
                label="Your Review"
                type="text"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={editedMovie.myReview}
                onChange={handleChange}
              />
              <Button onClick={handleSave} color="primary">Save</Button>
            </>
          ) : (
            <>
              {/* Display all movie details */}
              <Grid container spacing={2}>
                {Object.entries(movie).map(([key, value]) => {
                  if (typeof value === 'string' || typeof value === 'number') {
                    return (
                      <Grid item xs={12} sm={6} key={key}>
                        <Typography variant="body2"><strong>{key}:</strong> {value}</Typography>
                      </Grid>
                    );
                  }
                  return null;
                })}
              </Grid>
              <Button startIcon={<EditIcon />} onClick={handleEdit} color="primary">Edit</Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Movie;
