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
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const token = user?.token;

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Fetch movies
  const fetchMovies = async () => {
    try {
      const res = await API.get("/movies");
      setMovies(res.data);
    } catch (err) {
      console.error(err);
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
      const res = await API.get(`/movies/search?q=${search}`);
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete movie
  const deleteMovie = async (id) => {
    if (!window.confirm("Delete this movie?")) return;

    try {
      await API.delete(`/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMovies();
    } catch (err) {
      alert("Only admin can delete movies");
    }
  };

  // Sort movies
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
        <Toolbar
          sx={{
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🎬 Movie App
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {user ? (
              <>
                <Typography sx={{ display: { xs: "none", sm: "block" } }}>
                  Hi, {user.email}
                </Typography>

                {user.role === "admin" && (
                  <Button
                    size="small"
                    color="secondary"
                    variant="contained"
                    onClick={() => navigate("/admin/add")}
                  >
                    Add Movie
                  </Button>
                )}

                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                size="small"
                variant="outlined"
                color="inherit"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* SEARCH + SORT */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box component="form" onSubmit={handleSearch} sx={{ flex: 1 }}>
          <TextField
            fullWidth
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        <FormControl sx={{ minWidth: { xs: "100%", sm: 200 } }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} label="Sort By" onChange={(e) => setSortBy(e.target.value)}>
            <MenuItem value="">None</MenuItem>
            <MenuItem value="name">Name (A–Z)</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="release">Release Date</MenuItem>
            <MenuItem value="duration">Duration</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* MOVIE GRID */}
      <Grid container spacing={2} sx={{ p: { xs: 2, md: 3 } }}>
        {sortedMovies.length === 0 && (
          <Typography sx={{ ml: 2 }}>No movies found</Typography>
        )}

        {sortedMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={movie._id}>
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
