import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminAddMovie = () => {
  const navigate = useNavigate();

  // ✅ Get user from localStorage (IMPORTANT FIX)
  const user = JSON.parse(localStorage.getItem("user"));

  const [movie, setMovie] = useState({
    title: "",
    description: "",
    rating: "",
    releaseDate: "",
    duration: "",
    poster: "",
  });

  // 🚫 Block non-admin access immediately
  if (!user || user.role !== "admin") {
    return (
      <Typography sx={{ mt: 5, textAlign: "center" }} color="error">
        Access Denied. Admins only.
      </Typography>
    );
  }

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/movies",
        {
          ...movie,
          rating: Number(movie.rating),
          duration: Number(movie.duration),
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // ✅ correct token
          },
        }
      );

      alert("Movie added successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Only admin can add movies");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      <Typography variant="h5" mb={2}>
        Add New Movie (Admin)
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          fullWidth
          required
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          label="Description"
          name="description"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          label="Rating"
          name="rating"
          type="number"
          inputProps={{ step: 0.1 }}
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          label="Release Year"
          name="releaseDate"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          label="Duration (minutes)"
          name="duration"
          type="number"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          label="Poster Image URL"
          name="poster"
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Add Movie
        </Button>
      </form>
    </Box>
  );
};

export default AdminAddMovie;
