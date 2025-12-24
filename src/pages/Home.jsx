import React, { useEffect, useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard.jsx";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const token = user?.token;

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Fetch all movies
  const fetchMovies = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/movies");
      setMovies(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Search movies
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search.trim()) {
      fetchMovies();
      return;
    }

    try {
      const { data } = await axios.get(
        `http://localhost:5000/movies/search?q=${search}`
      );
      setMovies(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete movie (ADMIN)
  const deleteMovie = async (id) => {
    if (!window.confirm("Delete this movie?")) return;

    try {
      await axios.delete(`http://localhost:5000/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMovies();
    } catch (error) {
      alert("Only admin can delete movies");
    }
  };

  // SORT LOGIC
  const sortedMovies = [...movies].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.title.localeCompare(b.title);

      case "rating":
        return (b.rating || 0) - (a.rating || 0);

      case "release":
        return new Date(b.releaseDate) - new Date(a.releaseDate);

      case "duration":
        return (b.duration || 0) - (a.duration || 0);

      default:
        return 0;
    }
  });

  return (
    <>
      {/* HEADER */}
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">🎬 Movie App</Typography>

          <Box>
            {user ? (
              <>
                <Typography sx={{ mr: 2, display: "inline" }}>
                  Hi, {user.email}
                </Typography>

                {user.role === "admin" && (
                  <Button
                    color="secondary"
                    variant="contained"
                    sx={{ mr: 1 }}
                    onClick={() => navigate("/admin/add")}
                  >
                    Add Movie
                  </Button>
                )}

                <Button
                  color="error"
                  variant="contained"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* SEARCH + SORT */}
      <Box sx={{ p: 3, display: "flex", gap: 2 }}>
        <Box component="form" onSubmit={handleSearch} sx={{ flex: 1 }}>
          <TextField
            fullWidth
            placeholder="Search movies by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="name">Name (A–Z)</MenuItem>
            <MenuItem value="rating">Rating (High–Low)</MenuItem>
            <MenuItem value="release">Release Date (Newest)</MenuItem>
            <MenuItem value="duration">Duration (Longest)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* MOVIES GRID */}
      <Grid container spacing={2} sx={{ p: 3 }}>
        {sortedMovies.length === 0 && (
          <Typography sx={{ ml: 3 }}>No movies found</Typography>
        )}

        {sortedMovies.map((movie) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={movie._id}>
            <MovieCard
              movie={movie}
              user={user}
              onDelete={user?.role === "admin" ? deleteMovie : null}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
